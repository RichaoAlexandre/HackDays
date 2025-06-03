#!/bin/bash
start_frontend() {
    cd apps/frontend
    npm install
    echo "Starting frontend..."
    nohup npm run dev > frontend.log 2>&1 &
    echo "Frontend started."
    cd ../..
}

start_backend() {
    echo "Starting backend..."
    python3 apps/backend/manage.py makemigrations
    python3 apps/backend/manage.py migrate
    nohup python3 apps/backend/manage.py runserver > backend.log 2>&1 &
    echo "Backend started."
}

start() {
    echo "Starting the application..."
    start_frontend
    # activate_virtualenv
    start_backend
    echo "Application started successfully."
}

activate_virtualenv() {
    conda init
    conda activate hackdays
}

main () {
    if [ "$1" == "start" ]; then
        start
    else
        echo "Usage: $0 start"
        exit 1
    fi
}
main "$@"
