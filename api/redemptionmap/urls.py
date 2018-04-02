from django.conf.urls import url
from django.contrib import admin
from django.views.generic import RedirectView
from routes import views

urlpatterns = [
    url(r'^api/availability/', views.AvailableRoutes.as_view()),
    url(r'^api/locations/cities/', views.LocationsCities.as_view()),
    url(r'^$', views.Home.as_view(), name='home'),
    url(r'', views.RedirectToApp.as_view()),
]
