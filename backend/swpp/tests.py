from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from swpp.apps import SwppConfig
from datetime import datetime, timezone, timedelta
from rest_framework import serializers
from swpp.serializers import *

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
        self.client.login(username = 'profPutTestID', password = 'profPutTestPW')
        url = '/profile/{0}/'.format(user.id)
        data = {'major': 'cse', 'contact': '010-1234-5678'}

#        print(url)
#        print("\n\n\n")
#        print(self.client.get("/users/").data)
#        print(self.client.get("/profiles/").data)
#        print("\n\n\n")

        self.client.get("/users/")

        before = self.client.get(url).data

        self.client.force_authenticate(user=user)
        self.client.put(url, data)

        after = self.client.get(url).data

        print("\n\n\n")
        print(before)
        print(after)
        print("\n\n\n")

        self.assertEqual(before["major"], "")
        self.assertEqual(before["contact"], "")
        self.assertEqual(after["major"], "cse")
        self.assertEqual(after["contact"], "010-1234-5678")

