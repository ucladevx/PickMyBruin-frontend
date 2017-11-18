all: build

build:
	npm run build

dev:
	WEBPACK=1 NODE_ENV=development npm run build-dev

build_image:
	docker build -t pickmybruin/frontend .

run: build_image
	docker run --rm -p 8080:80 pickmybruin/frontend

gen: build
	mkdir -p public
	mkdir -p public/build
	cp -r pages/* public
	cp lib/build/main.css public/build
	cp lib/build/main.js public/build
