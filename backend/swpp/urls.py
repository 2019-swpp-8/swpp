from django.urls import path
from swpp import views

urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('user/<int:pk>/', views.UserDetails.as_view()),
    path('user/current/', views.UserCurrent.as_view()),
    path('profiles/', views.ProfileList.as_view()),
    path('profile/<int:pk>/', views.ProfileDetails.as_view()),
    path('requests/', views.RequestList.as_view()),
    path('request/<int:pk>/', views.RequestDetails.as_view()),
    path('tutors/', views.TutorList.as_view()),
    path('tutor/<int:pk>/', views.TutorDetails.as_view()),
    path('timeslist/', views.TimesList.as_view()),
    path('times/<int:pk>/', views.TimesDetails.as_view()),
    path('lectures/', views.LectureList.as_view()),
    path('notification/<int:pk>/', views.NotificationDetails.as_view())
]
