# Generated by Django 5.1.5 on 2025-03-05 12:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('civicfixDb', '0033_alter_proofofresolution_proof_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='complaint',
            name='latitude',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='complaint',
            name='longitude',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
