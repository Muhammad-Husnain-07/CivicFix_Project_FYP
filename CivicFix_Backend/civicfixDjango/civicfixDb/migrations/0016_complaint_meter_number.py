# Generated by Django 5.1.3 on 2024-11-28 20:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('civicfixDb', '0015_alter_complaint_complaint_details'),
    ]

    operations = [
        migrations.AddField(
            model_name='complaint',
            name='meter_number',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
    ]
