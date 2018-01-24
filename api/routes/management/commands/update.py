from django.core.management.base import BaseCommand

from routes import api

class Command(BaseCommand):
    args = ''
    help = 'Update all availability'

    def handle(self, *args, **options):
        api.update_availability()
