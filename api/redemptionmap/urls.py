from django.conf.urls import url
from django.contrib import admin
from routes import views

urlpatterns = [
    url(r'^$', views.Home.as_view()),
    url(r'^api/availability/', views.AvailableRoutes.as_view()),
    url(r'^api/locations/cities/', views.LocationsCities.as_view()),
]
