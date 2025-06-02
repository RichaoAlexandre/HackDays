
## Quickstart

```bash
NAME_ENV=venv

# create and activate virtual environnement
python3 -m venv $NAME_ENV
source $NAME_ENV/bin/activate

# install requirements
pip install -r requirements.txt

# initialize database
./manage.py migrate

# launch server
./manage.py runserver
```


## Docs:

Redis installation:
https://redis.io/docs/latest/operate/oss_and_stack/install/archive/install-redis/

django-ninja: 
https://django-ninja.dev/

django-channels:
https://channels.readthedocs.io/en/latest/introduction.html
