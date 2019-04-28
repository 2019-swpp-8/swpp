from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from swpp.apps import SwppConfig
from datetime import datetime, timezone, timedelta

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
