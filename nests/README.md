Create a User Module.
Run this command to create a User Module:

nest generate module user

npx sequelize-cli migration:generate --name create-user


1. Re-config your database in .env file
2. npx sequelize-cli db:create
3. npx sequelize-cli db:migrate
