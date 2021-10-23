# Generated by Django 3.1.8 on 2021-10-23 12:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ChatUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=25)),
                ('last_name', models.CharField(max_length=25)),
                ('email', models.EmailField(max_length=254)),
            ],
        ),
        migrations.CreateModel(
            name='Conversation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('deleted', models.BooleanField()),
                ('participant_1', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='participant_1', to='chat.chatuser')),
                ('participant_2', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='participant_2', to='chat.chatuser')),
            ],
        ),
        migrations.CreateModel(
            name='ChatMessage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('seen', models.BooleanField(default=False)),
                ('channel', models.CharField(choices=[('Local', 'Local'), ('Gmail', 'Gmail'), ('Facebook', 'Facebook'), ('Instagram', 'Instagram')], default='Local', max_length=10)),
                ('deleted', models.BooleanField()),
                ('conversation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chat.conversation')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='sender', to='chat.chatuser')),
            ],
        ),
    ]
