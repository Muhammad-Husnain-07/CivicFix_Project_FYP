# Generated by Django 5.1.3 on 2024-11-16 19:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('civicfixDb', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phone',
            field=models.CharField(max_length=11, unique=True),
        ),
    ]
