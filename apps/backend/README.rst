
## Quickstart

```bash

# LAUNCH FROM DOCKER
docker compose up --build

# MANUAL LAUNCH

NAME_ENV=venv

# create and activate virtual environnement
python3 -m venv $NAME_ENV
source $NAME_ENV/bin/activate

# install requirements
pip install -r requirements.txt

# initialize database
./manage.py migrate

# init redis (for ubuntu, there is a link to Redis doc below):
sudo apt-get install lsb-release curl gpg
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo apt-get update
sudo apt-get install redis
sudo systemctl start redis-server


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
