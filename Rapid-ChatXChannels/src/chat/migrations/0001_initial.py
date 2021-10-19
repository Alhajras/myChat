# Generated by Django 3.1.8 on 2021-10-19 20:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ChatMessage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('seen', models.BooleanField(default=False)),
                ('channel', models.CharField(choices=[('Local', 'Local'), ('Gmail', 'Gmail'), ('Facebook', 'Facebook'), ('Instagram', 'Instagram')], default='Local', max_length=10)),
            ],
        ),
    ]
