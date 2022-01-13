# Hoshino

Hoshino means "stars" in Japanese.

[Live demo](https://hoshino.dragonwatcher.com)

Project architecture:
- The backend is in NodeJS. It is not as feature-rich as the Rails ecosystem, but it's a good option for a (dare I say) _minimalist_ implementation
- For a cleaner commit history, each big change is squash merged from a [Pull Request](https://github.com/one-shots/hoshino/pulls?q=)
- For UI components, we're using good old Bootstrap
- For convenience, a `delete reviews` button appears if there are many reviews
- For the "real time" requirement, I used HTTP polling as a crude solution and don't know if you were specifically looking for WebSocket? If so, I'd be happy to do that

If this were a real project that grows, future improvements may include:
- Adopt conventions for names, semantics, folder structure, error handling, input validation, unit tests, etc.
- Improve security, add users and auth
- Improve UI: pagination, more CRUD components, responsive layout
- Improve vanilla/jquery frontend:
    - Use SASS/SCSS
    - Use a tool like Grunt/Gulp/etc to build the static files, better browser compatibility
- Improve React frontend:
    - Explore state management e.g. Redux, MobX, ..
    - Explore nested styling in each component, e.g. `styled-components`
- Use TypeScript, which should reduce bugs and encourage cleaner code as the project grows
- The API is currently RESTful, but GraphQL can be helpful in some ways, such as reducing client requests and making the frontend dev experience more intuitive

## Local Development

### Setup locally
Install Postgres locally and create db:

```shell script
psql -U postgres -c 'CREATE DATABASE hoshino;'
```

Create _backend/.env_ with:

```shell script
# Env vars
DATABASE_URL=postgresql://localhost:5432/hoshino?sslmode=disable
``` 

Setup db:

```shell script
cd backend
npm install
npm run migrate
npm run seed
```

### Run locally

Run server:

```shell script
cd backend
npm i
npm start
```

Run vanilla/jQuery frontend:
- Use local server like Python's SimpleHTTPServer
- Or the [serve](https://www.npmjs.com/package/serve) package and run `serve -p 3000 frontend/`

Run React frontend
```shell script
cd frontend-react/
yarn install
yarn start
``` 

## Deploy

Deploy backend to Heroku/etc as Node app, or build it in Docker and deploy into AWS/etc.:

```shell script
cd backend/
npm run docker:build
```

Build frontend files, which can be served on Netlify/etc.: 

```shell script
cd frontend-react/
yarn build
```
