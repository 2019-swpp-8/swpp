from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase, APITransactionTestCase
from swpp.apps import SwppConfig
from datetime import datetime, timezone, timedelta
from rest_framework import serializers, status
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
        data = {'major': '', 'contact': '010-1111-1111', 'name': 'test'}
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

        url = '/profile/{0}/'.format(user.id)
        data = {'major': 'cse', 'contact': '010-1234-5678'}

        response = self.client.put(url, data)
        self.assertTrue(response.status_code >= 400)

        self.client.force_login(user)

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

    def test_prof_contact_permission(self):
        user1 = self.create_user('user1', 'user1')
        user2 = self.create_user('user2', 'user2')
        url = '/profiles/'
        url1 = '/profile/{0}/'.format(user1.id)
        url2 = '/profile/{0}/'.format(user2.id)
        self.client.get('/users/')

        self.client.force_login(user1)

        prof_list1 = self.client.get(url).data
        prof1 = self.client.get(url1).data
        prof2 = self.client.get(url2).data

        self.assertEqual(prof1['contact'], "010-0000-0000")
        self.assertEqual(prof2['contact'], "")
        self.assertEqual(prof_list1[0]['contact'], "010-0000-0000")
        self.assertEqual(prof_list1[1]['contact'], "")


    # added 05/05, from tutor_put_request branch

    def test_tutor_put(self):
        user = self.create_user('iidd', 'ppww')
        #login = self.client.login(username = 'iidd', password = 'ppww')
        #self.assertTrue(login)

        tutorid = "/tutor/{0}/".format(user.id)
        data = {'bio': 'hi', 'exp': 'A'}

        response = self.client.put(tutorid, data)
        self.assertTrue(status.is_client_error(response.status_code))

        self.client.force_login(user)

        users = self.client.get("/users/").data
        profiles = self.client.get("/profiles/").data

        prev = self.client.get(tutorid).data
        self.client.put(tutorid, data)
        curr = self.client.get(tutorid).data
        self.assertEqual(prev['bio'], "")
        self.assertEqual(curr['bio'], "hi")
        self.assertEqual(prev['exp'], "")
        self.assertEqual(curr['exp'], "A")

    # added 05/17, from tutor_search_filter branch
    # added 05/30, from search_tutor_with_lecture branch

    def test_tutor_filter(self):
        user = self.create_user('iidd', 'ppww')
        data = {'bio': 'my bio', 'exp': 'MY EXP'}
        prof = {'major': 'my major'}

        other_user = self.create_user('idother', 'pwother')
        other_data = {'bio': 'YOUR BIO', 'exp': 'your exp'}
        other_prof = {'major': 'your major'}

        korean_user = self.create_user('idkorean', 'pwkorean')
        korean_data = {'bio': '자기소개', 'exp': '경력'}
        korean_prof = {'major': '전공'}

        users = self.client.get("/users/").data
        profiles = self.client.get("/profiles/").data

        self.client.force_login(user)
        self.client.put("/tutor/{0}/".format(user.id), data)
        self.client.put("/profile/{0}/".format(user.id), prof)
        self.client.force_login(other_user)
        self.client.put("/tutor/{0}/".format(other_user.id), other_data)
        self.client.put("/profile/{0}/".format(other_user.id), other_prof)
        self.client.force_login(korean_user)
        self.client.put("/tutor/{0}/".format(korean_user.id), korean_data)
        self.client.put("/profile/{0}/".format(korean_user.id), korean_prof)

        tutors = self.client.get("/tutors/").data
        self.assertEqual(len(tutors), 3)

        tutors = self.client.get("/tutors/?bio=bi&exp=ex").data
        self.assertEqual(len(tutors), 2)

        tutors = self.client.get("/tutors/", {'bio': '소개', 'exp': '경'}).data
        self.assertEqual(len(tutors), 1)
        self.assertEqual(tutors[0]['profile']['user'], korean_user.id)

        tutors = self.client.get("/tutors/", {'bio': 'ur b'}).data
        self.assertEqual(len(tutors), 1)
        self.assertEqual(tutors[0]['profile']['user'], other_user.id)

        tutors = self.client.get("/tutors/?major=major").data
        self.assertEqual(len(tutors), 2)

        tutors = self.client.get("/tutors/", {'major': '전'}).data
        self.assertEqual(len(tutors), 1)
        self.assertEqual(tutors[0]['profile']['user'], korean_user.id)

        # check for times
        times1 = {'mon': 0x3DC0, #0b0011110111000000
                  'tue': 0xD4F0, #0b1101010011110000
                  'wed': 0x0,
                  'thu': 0x0,
                  'fri': 0x0,
                  'sat': 0x0,
                  'sun': 0x0} # total 7.5hr


        times2 = {'mon': 0x0,
                  'tue': 0x99D0, #0b1001100111010000
                  'wed': 0xFC7C, #0b1111110001111100
                  'thu': 0x0,
                  'fri': 0x0,
                  'sat': 0x0,
                  'sun': 0x0} # total 9hr

        times3 = {'mon': 0xFFFF, #0b1111111111111111
                  'tue': 0xFFFF, #0b1111111111111111
                  'wed': 0xFFFF, #0b1111111111111111
                  'thu': 0xFFFF, #0b1111111111111111
                  'fri': 0x0,
                  'sat': 0x0,
                  'sun': 0x0,
                  'total': 15}

        self.client.force_login(user)
        self.client.put("/times/{0}/".format(user.profile.tutor.times.id), times1)

        self.client.force_login(other_user)
        self.client.put("/times/{0}/".format(other_user.profile.tutor.times.id), times2)

        tutors = self.client.get("/tutors/", times3).data
        self.assertEqual(len(tutors), 2)

        times3['total'] = 18
        tutors = self.client.get("/tutors/", times3).data
        self.assertEqual(len(tutors), 1)
        self.assertEqual(tutors[0]['profile']['user'], other_user.id)

        times3['total'] = 12
        times3['minInterval'] = 3
        tutors = self.client.get("/tutors/", times3).data
        self.assertEqual(len(tutors), 1)
        self.assertEqual(tutors[0]['profile']['user'], other_user.id)

        times3['total'] = 15
        tutors = self.client.get("/tutors/", times3).data
        self.assertEqual(len(tutors), 0)

        times3['wed'] = 0
        times3['total'] = 6
        times3['minInterval'] = 2
        tutors = self.client.get("/tutors/", times3).data
        self.assertEqual(len(tutors), 1)
        self.assertEqual(tutors[0]['profile']['user'], user.id)

        times3['mon'] = 0xF3E0 #0b1111001111100000
        times3['total'] = 7
        times3['minInterval'] = 3
        tutors = self.client.get("/tutors/", times3).data
        self.assertEqual(len(tutors), 1)
        self.assertEqual(tutors[0]['profile']['user'], user.id)

        times3['total'] = 8
        tutors = self.client.get("/tutors/", times3).data
        self.assertEqual(len(tutors), 0)

        # check for lectures
        self.client.force_login(user)
        self.client.put("/tutor/{0}/".format(user.id), {'lectures': [2, 4, 6]})
        self.client.force_login(other_user)
        self.client.put("/tutor/{0}/".format(other_user.id), {'lectures': [1, 2, 3, 4]})
        self.client.force_login(korean_user)
        self.client.put("/tutor/{0}/".format(korean_user.id), {'lectures': [4, 5]})
        tutors = self.client.get("/tutors/?lecture=4").data
        self.assertEqual(len(tutors), 3)
        tutors = self.client.get("/tutors/?lecture=2").data
        self.assertEqual(len(tutors), 2)
        tutors = self.client.get("/tutors/?lecture=1").data
        self.assertEqual(len(tutors), 1)
        tutors = self.client.get("/tutors/?lecture=7").data
        self.assertEqual(len(tutors), 0)

        tutors = self.client.get("/tutors/?lecTitle=글쓰기").data
        self.assertEqual(len(tutors), 3)
        tutors = self.client.get("/tutors/?lecProf=허윤").data
        self.assertEqual(len(tutors), 2)


    def test_lectures_database(self):
        lectures = self.client.get("/lectures/").data
        self.assertEqual(len(lectures), 30214)

        lecture = {'title': '궰쇆뮶'}
        lectures = self.client.get("/lectures/", lecture).data
        self.assertEqual(len(lectures), 0)

        lecture = {'prof': '문병로'}
        lectures = self.client.get("/lectures/", lecture).data
        self.assertEqual(len(lectures), 5)

        lecture['title'] = '알고'
        lectures = self.client.get("/lectures/", lecture).data
        self.assertEqual(len(lectures), 3)
        del lecture['prof']

        lecture['title'] = '대학 글쓰기 1'
        lectures = self.client.get("/lectures/", lecture).data
        self.assertEqual(len(lectures), 35)

        lecture['prof'] = '나민애'
        lectures = self.client.get("/lectures/", lecture).data
        self.assertEqual(len(lectures), 1)

        lecture['prof'] = '문병로'
        lectures = self.client.get("/lectures/", lecture).data
        self.assertEqual(len(lectures), 0)

    def test_request(self):
        user1 = self.create_user('id1', 'pw2')
        user2 = self.create_user('id3', 'pw4')
        self.client.get("/users/").data
        self.client.get("/profiles/").data
        self.client.get("/tutors/").data

        self.client.force_login(user2)
        request = {'tutor': user1.id, 'tutee': user2.id, 'lecture': 1, 'detail': "a", 'payment': "b",
            'mon': 1, 'tue': 2, 'wed': 1, 'thu': 2, 'fri': 1, 'sat': 2, 'sun': 0}
        self.assertTrue(self.client.post("/requests/", request).status_code >= 400)

        times = {'mon': 7,
                 'tue': 7,
                 'wed': 7,
                 'thu': 7,
                 'fri': 7,
                 'sat': 7,
                 'sun': 7}
        times_id = user1.profile.tutor.times.id
        tutoringTimes_id = user1.profile.tutor.tutoringTimes.id

        self.client.put("/times/{0}/".format(times_id), times)
        self.client.post("/requests/", request)

        request = {'tutor': user1.id, 'tutee': user2.id, 'lecture': 1, 'detail': "a", 'payment': "b",
            'mon': 4, 'tue': 0, 'wed': 2, 'thu': 1, 'fri': 0, 'sat': 0, 'sun': 7}
        self.client.post("/requests/", request)
        self.client.delete("/request/2/")

        requests = self.client.get("/requests/").data
        self.assertEqual(len(requests), 1)

        request['sun'] = 8
        self.assertTrue(self.client.post("/requests/", request).status_code >= 400)
        request['sun'] = 0
        request['tutee'] = 1
        self.assertTrue(self.client.post("/requests/", request).status_code >= 400)

        self.assertEqual(requests[0]['times']['mon'], 1)
        self.assertEqual(requests[0]['times']['sat'], 2)

        request = self.client.get("/request/1/").data
        self.assertEqual(request['status'], 0)

        prof = self.client.get('/profile/{0}/'.format(user1.id)).data
        self.assertEqual(prof['contact'], "")

        self.client.force_login(user1)
        request = self.client.put("/request/1/", {'status': 1}).data
        self.assertEqual(request['status'], 1)
        request = self.client.get('/times/{0}/'.format(times_id)).data
        self.assertEqual(request['mon'], 6)
        self.assertEqual(request['sun'], 7)
        request = self.client.get('/times/{0}/'.format(tutoringTimes_id)).data
        self.assertEqual(request['sat'], 2)
        self.assertEqual(request['sun'], 0)
        times['mon'] = 15
        times['tutor'] = user1.id
        self.assertTrue(self.client.put('/times/{0}/'.format(times_id), times).status_code >= 400)

        prof = self.client.get('/profile/{0}/'.format(user1.id)).data
        self.assertEqual(prof['contact'], "010-0000-0000")
        self.client.force_login(user1)
        prof = self.client.get('/profile/{0}/'.format(user2.id)).data
        self.assertEqual(prof['contact'], "010-0000-0000")
        self.assertEqual(len(prof['notifications']), 2)
        self.assertFalse(prof['notifications'][0]['read'])
        notification = self.client.get('/notification/{0}/'.format(prof['notifications'][0]['id'])).data
        self.assertTrue(notification['read'])
        self.assertTrue(self.client.get('/notification/9999/').status_code == 404)

        request = self.client.put("/request/1/", {'status': 2}).data
        self.assertEqual(request['status'], 2)
        request = self.client.get('/times/{0}/'.format(times_id)).data
        self.assertEqual(request['tue'], 7)
        request = self.client.get('/times/{0}/'.format(tutoringTimes_id)).data
        self.assertEqual(request['wed'], 0)
        self.assertEqual(request['sun'], 0)
        self.client.put('/times/{0}/'.format(times_id), times)
        request = self.client.get('/times/{0}/'.format(times_id)).data
        self.assertEqual(request['mon'], 15)

        prof = self.client.get('/profile/{0}/'.format(user2.id)).data
        self.assertEqual(prof['contact'], "")

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

    def test_user_current(self):
        un = 'test'
        pw = '@Q$8thj0fd9'

        me = self.client.get('/user/current/')
        self.assertTrue(status.is_client_error(me.status_code))

        self.register_s('test', 'test@snu.ac.kr', pw)
        self.client.login(username=un, password=pw)

        me = self.client.get('/user/current/')
        self.assertTrue(status.is_success(me.status_code))
        self.assertEqual(me.data['username'], un)
