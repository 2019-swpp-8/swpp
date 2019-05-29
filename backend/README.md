# SWPP 8조 Backend
## Quick Start
```bash
virtualenv env
source env/bin/activate
pip install -r requirements.txt
./manage.py makemigrations
./manage.py migrate
./manage.py runserver
```

## Testing
```bash
coverage run --source=swpp manage.py test
coverage report -m
```
