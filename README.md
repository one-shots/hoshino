# Hoshino

Hoshino means "stars" in Japanese.

Project architecture:
- The backend is in NodeJS. It is not as feature-rich as the Rails ecosystem, but it's good for a minimalist API.
- Each commit is squash merged from [Pull Requests](https://github.com/one-shots/hoshino/pulls), please see each PR for unsquashed changes.
- For UI components, I just used Bootstrap

Potential improvements:
- The API is RESTful, but GraphQL can be helpful especially for reducing client requests and to make the frontend development experience more intuitive
- Use TypeScript to reduce errors/bugs as the project grows in size
- Use Sass or an alternative for CSS

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

## Deploy

TODO