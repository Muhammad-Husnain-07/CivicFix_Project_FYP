# Generated by Django 5.1.3 on 2024-11-17 21:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('civicfixDb', '0011_alter_customuser_password'),
    ]

    operations = [
        migrations.RenameField(
            model_name='complaint',
            old_name='user',
            new_name='user_id',
        ),
    ]
