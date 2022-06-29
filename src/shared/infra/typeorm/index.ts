import User from "@modules/users/infra/typeorm/entities/User";
import { DataSource } from "typeorm";

const PostgresDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "piupiu_postgres",
  entities: [
    User
  ],
  migrations: [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
});

PostgresDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  export default PostgresDataSource;