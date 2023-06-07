# Generated by Django 4.0.3 on 2023-06-06 15:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Gerencias',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100)),
                ('codigo', models.CharField(max_length=15)),
                ('is_active', models.BooleanField(default='true')),
            ],
        ),
        migrations.CreateModel(
            name='Accounts',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cedula', models.CharField(max_length=13, unique=True)),
                ('nombre', models.CharField(max_length=100)),
                ('codempleado', models.CharField(max_length=100)),
                ('telefo', models.CharField(max_length=15)),
                ('emails', models.EmailField(max_length=100, unique=True)),
                ('compro', models.BooleanField(default=0)),
                ('is_active', models.BooleanField(default=1)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('gerencia', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='inicio.gerencias')),
            ],
        ),
    ]
