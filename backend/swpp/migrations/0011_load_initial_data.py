from django.db import migrations
from django.core.management import call_command

fixture = 'initial_data'

def load_fixture(apps, schema_editor):
    unload_fixture(apps, schema_editor)
    call_command('loaddata', fixture, app_label='swpp')

def unload_fixture(apps, schema_editor):
   lecture = apps.get_model('swpp', 'lecture')
   lecture.objects.all().delete()

class Migration(migrations.Migration):

    dependencies = [
        ('swpp', '0010_profile_name'),
    ]

    operations = [
        migrations.RunPython(load_fixture, reverse_code = unload_fixture)
    ]
