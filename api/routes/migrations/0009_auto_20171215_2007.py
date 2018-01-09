# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-15 20:07
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('routes', '0008_routeavailability_updated'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='is_origin',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='routeavailability',
            name='route',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='availability', to='routes.Route'),
        ),
    ]
