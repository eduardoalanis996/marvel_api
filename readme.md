# MARVEL API

MARVEL API is a typescript backend project with hexagonal architecture.

## Installation

Use the package manager NPM to install all packages.

```bash
npm install
```

## Configuration

Inside the project there is an .env file with all the environment variables to be able to run it locally.

### Example file

```js
PORT=80
MARVEL_API_URL="http://gateway.marvel.com/v1/public/"
MARVEL_API_PUBLIC_KEY="xxxxxx"
MARVEL_API_PRIVATE_KEY="xxxxxxxxxxxxx"
MARVEL_CHARACTERS="Iron Man|Captain America"
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=qwerty
PG_DATABASE=xxxx
PG_SSL=false
```

## Usage 

The project can run locally if set all enviroment variables and run the following commands.

```bash
npm run build
npm run sync
npm run test
npm run dev
```
- The first command build the typescript project.
- The second command migrate all data to database using the marvel api.
- The third command run all test into the project.
- the last command up the server api.

Also the project can run as docker image, is very important view the database enviroments in the **docker-compose.yml** file and set the same values on **.env** file.

The command for build and run the containers is following.

```bash
docker-compose up --build

```
## Available Requests

```bash
http://localhost/colaborators/captainamerica GET
http://localhost/characters/captainamerica GET
http://localhost/colaborators/ironman GET
http://localhost/characters/ironman GET

```
