# Hoshino

Hoshino means "stars" in Japanese.

Project architecture:
- The backend is in NodeJS. It is not as feature-rich as the Rails ecosystem, but it's a good option for a (dare I say) _minimalist_ implementation
- Each commit is squash merged from [Pull Requests](https://github.com/one-shots/hoshino/pulls), please see each PR for unsquashed changes.
- For UI components, I just used Bootstrap
- For "real time", I just used HTTP polling as a basic solution, but I don't know if you were specifically looking for WebSocket (if so, I'm happy to do that)

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
- Use TypeScript, which I find reduces bugs and encourages better conventions
- The API is currently RESTful, but GraphQL can be helpful especially for reducing client requests and to make the frontend development experience more intuitive

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
npm start
```

Run vanilla/jQuery frontend:
- Use a local file server like Python's SimpleHTTPServer or [serve](https://www.npmjs.com/package/serve) 
- Have your IDE serve the files in _frontend/*_


Run React 

```shell script
cd frontend-react/
yarn start
``` 

## Deploy

```shell script
cd frontend-react/
yarn build
```