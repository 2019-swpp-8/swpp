from django.test import TestCase
from rest_framework.test import APITestCase

class BackendTests(APITestCase):
    def test_sanity(self):
        self.assertTrue(True)
