from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase, APITransactionTestCase
from swpp.apps import SwppConfig
from datetime import datetime, timezone, timedelta
from rest_framework import serializers
from swpp.serializers import *
from django.core import mail
from django.utils.encoding import smart_text
import re

class LowLevelTests(APITestCase):
    def create_user(self, username, password):
        return self.User.objects.create_user(username, password)

    def setUp(self):
        self.User = get_user_model()

    def test_sanity(self):
        self.assertTrue(True)

    def test_app_name(self):
        self.assertEqual(SwppConfig.name, 'swpp')

    def test_user_profile_relation(self):
        user = self.create_user('t', '1')
        self.assertTrue(hasattr(user, 'profile'))
        self.assertTrue(hasattr(user.profile, 'user'))
        self.assertEqual(user, user.profile.user)

    def test_profile_joined_time(self):
        from_time = datetime.now(timezone.utc) - timedelta(seconds = 1)
        user = self.create_user('t', '1')
        to_time = datetime.now(timezone.utc) + timedelta(seconds = 1)
        self.assertTrue(user.profile.joined >= from_time)
        self.assertTrue(user.profile.joined <= to_time)

    def test_user_profile_tutor_relation(self):
        user = self.create_user('t', '1')
        self.assertTrue(hasattr(user, 'profile'))
        self.assertTrue(hasattr(user.profile, 'user'))
        self.assertEqual(user, user.profile.user)
        self.assertTrue(hasattr(user.profile, 'tutor'))
        self.assertTrue(hasattr(user.profile.tutor, 'profile'))
        self.assertEqual(user.profile, user.profile.tutor.profile)

    # added 05/01, from modelInit branch

    def test_valid_profile(self):
        user = self.create_user('s', '2')
        data = {'major': '', 'contact': '010-1111-1111'}
        serializer = ProfileSerializer(user.profile, data = data, partial = True)
        self.assertFalse(serializer.is_valid())

        data['major'] = 'bio'
        serializer = ProfileSerializer(user.profile, data = data, partial = True)
        self.assertTrue(serializer.is_valid())
        serializer.save()

        data['contact'] = '010-11111-1111'
        serializer = ProfileSerializer(user.profile, data = data, partial = True)
        self.assertFalse(serializer.is_valid())

    def test_valid_times(self):
        user = self.create_user('q', '3')
        self.assertEqual(user.profile.tutor.times.mon, 0)

        data = {'mon': 1 << 48, 'tue': (1 << 48) - 1, 'wed': 1 << 47,
                'thu': 1, 'fri': 0, 'sat': -1, 'sun': -(1 << 48) + 1}
        serializer = TimesSerializer(data = data)
        self.assertFalse(serializer.is_valid())

        data['mon'] = 1
        serializer = TimesSerializer(data = data)
        self.assertFalse(serializer.is_valid())

        data['sat'] = 3
        serializer = TimesSerializer(data = data)
        self.assertFalse(serializer.is_valid())

        data['sun'] = 72698241236
        serializer = TimesSerializer(data = data)
        self.assertTrue(serializer.is_valid())
        serializer.save()
        self.assertEqual(serializer.data['sat'], 3)

    def test_prof_put(self):
        user = self.create_user('profPutTestID', 'profPutTestPW')
        self.client.force_login(user)
        url = '/profile/{0}/'.format(user.id)
        data = {'major': 'cse', 'contact': '010-1234-5678'}

        self.client.get("/users/")

        before = self.client.get(url).data

#        self.client.force_authenticate(user=user)
        self.client.put(url, data)

        after = self.client.get(url).data

        self.assertEqual(before["major"], "")
        self.assertEqual(before["contact"], "010-0000-0000")
        self.assertEqual(after["major"], "cse")
        self.assertEqual(after["contact"], "010-1234-5678")

        response = self.client.put(url, {'contact':'0'})
        self.assertTrue(response.status_code >= 400)


    # added 05/05, from tutor_put_request branch

    def test_tutor_put(self):
        user = self.create_user('iidd', 'ppww')
        #login = self.client.login(username = 'iidd', password = 'ppww')
        #self.assertTrue(login)
        login = self.client.force_login(user)

        data = {'bio': 'hi', 'exp': 'A'}
        users = self.client.get("/users/").data
        profiles = self.client.get("/profiles/").data

        tutorid = "/tutor/{0}/".format(user.id)
        prev = self.client.get(tutorid).data
        self.client.put(tutorid, data)
        curr = self.client.get(tutorid).data
        self.assertEqual(prev['bio'], "")
        self.assertEqual(curr['bio'], "hi")
        self.assertEqual(prev['exp'], "")
        self.assertEqual(curr['exp'], "A")

class HighLevelTests(APITransactionTestCase):
    def setUp(self):
        self.User = get_user_model()
        self.verify_url_matcher = re.compile(r'(\/auth\/activate\/[0-9a-f]+\/)')

    def register(self, username, email, passwd):
        return self.client.post('/auth/register/', {
            'username': username,
            'email': email,
            'password1': passwd,
            'password2': passwd
        })

    def verify_email(self, email):
        resp = None
        for msg in mail.outbox:
            if len(msg.to) == 1 and msg.to[0] == email:
                url = self.verify_url_matcher.search(msg.body)
                self.assertIsNot(url, None)
                resp = self.client.get(url.group())
        return resp

    # Naming scheme: foo_s: expect success, foo_f: expect failure
    def register_s(self, username, email, passwd):
        resp = self.register(username, email, passwd)
        self.assertEqual(resp.status_code, 302)
        self.assertEqual(resp.url, '/auth/register/complete/')
        ver = self.verify_email(email)
        self.assertIsNot(ver, None)
        self.assertEqual(ver.status_code, 302)
        self.assertEqual(ver.url, '/auth/activate/complete/')

    def register_f(self, username, email, passwd):
        failed = False
        resp = self.register(username, email, passwd)
        if resp.status_code != 302:
            failed = True
        ver = self.verify_email(email)
        if ver is None or ver.status_code != 302:
            failed = True
        # 여기까지 왔다면 망한거!
        self.assertTrue(failed)

    def test_registration(self):
        # 이메일이 snu가 아님
        self.register_f('testuser0', 'bad.email@gmail.com', '9328h9ih!sdf')

        # OK
        self.register_s('testuser0', 'f9h8jf9ew@snu.ac.kr', 'A!98uk_48ohD')

        # 이메일 중복
        self.register_f('dup_email', 'f9h8jf9ew@snu.ac.kr', 'v09#oijsad#S')

        # 유저네임 중복
        self.register_f('testuser0', 'dupl.name@snu.ac.kr', '0iDSAF2^49oj')

        # OK
        self.register_s('testuser1', 'od898d09k@snu.ac.kr', '(oir!eLI+Esd')

        # 패스워드 약함
        self.register_f('testuser2', 'fsd8j3292@snu.ac.kr', 'password')
