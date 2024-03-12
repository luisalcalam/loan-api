
# Loan API

API Rest

[Nest](https://github.com/nestjs/nest)



## Environment Variables, see .env.template file

`PORT`

`DB_PASSWORD`

`DB_NAME`

`DB_HOST`

`DB_PORT`

`DB_USERNAME`

`JWT_SECRET`

`JWT_EXPIRATION_TIME`

`SECRET_REFRESH_JWT`

`REFRESH_JWT_EXPIRATION_TIME`

This variables are used in development [Variables](https://docs.google.com/document/d/1xOtI94GdO-5lD0XVCpTrcNFla5xHv8B2lLGjON-fspg/edit?usp=sharing)


## Instructions to run locally

1. Clone project
2. Run ```npm install```
3. Clone file ```.env.template``` and rename to ```.env``` 
4. Set the desired values
5. Execute the following command to init the database
```
docker-compose up -d
```

6. Execute: ```nom run seed`` to generate seed data

6. In case to need create a migration execute : ```migration:generate src/database/migrations/{migrationName}```
6. Init in develop mode: ```npm run start:dev```

## Documentation


## Demo


## Authors

- [@luisalcalam](https://github.com/luisalcalam)

