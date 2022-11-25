Create a User Module.
Run this command to create a User Module:

nest generate module user

npx sequelize-cli migration:generate --name create-user

npx sequelize-cli db:migrate
