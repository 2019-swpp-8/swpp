from django.urls import path
from swpp import views

urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('user/<int:pk>/', views.UserDetails.as_view()),
    path('user/current/', views.UserCurrent.as_view()),
    path('profiles/', views.ProfileList.as_view()),
    path('profile/<int:pk>/', views.ProfileDetails.as_view()),
    path('tutors/', views.TutorList.as_view()),
    path('tutor/<int:pk>/', views.TutorDetails.as_view())
]
