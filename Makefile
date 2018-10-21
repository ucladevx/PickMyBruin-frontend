all: build

build:
	npm run build

dev:
	WEBPACK=1 NODE_ENV=development npm run build-dev

build_image:
	docker build -t bquest/frontend .

run: build_image
	docker run --rm -p 8080:80 bquest/frontend

gen: build
	mkdir -p public
	mkdir -p public/build
	cp -r pages/* public
	cp lib/build/main.css public/build
	cp lib/build/main.js public/build

backup_db:
	docker exec -t `docker ps -q --filter status=running --filter ancestor=postgres:10.1-alpine` pg_dumpall -c -U postgres > pickmybruin_dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql


deploy: backup_db
	docker-compose build
	-docker-compose down
	docker-compose up -d 


