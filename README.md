# Hoshino

Hoshino means "stars" in Japanese.

Project architecture:
- The backend is in NodeJS. It is not as feature-rich as the Rails ecosystem, but it's a good option for a (dare I say) _minimalist_ implementation
- Each commit is squash merged from [Pull Requests](https://github.com/one-shots/hoshino/pulls), please see each PR for unsquashed changes.
- For UI components, I just used Bootstrap

If this were a real project that grows, future improvements may include:
- Adopt conventions for names, semantics, error handling, unit tests, etc
- Improve security, add users and auth
- Improve UI: pagination, CRUD components for reviews and products
- Improve vanilla/jquery frontend:
    - Use SASS/SCSS where possible
    - Use a tool like Grunt/Gulp/etc to build the static files, better browser compatibility
- Improve React frontend:
    - Explore state management e.g. Redux, MobX, ..
- Use TypeScript, which I find reduces bugs and encourages better conventions
- The API is currently RESTful, but GraphQL can be helpful especially for reducing client requests and to make the frontend development experience more intuitive

## Local Development

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

Run server:

```shell script
npm start
```

Server vanilla/jQuery frontend:
- Use a local file server like Python's SimpleHTTPServer or [serve](https://www.npmjs.com/package/serve) 
- Have your IDE serve the files in _frontend/*_

## Deploy

TODO