import { DataSource, Migration } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "K3l5p!",
  database: "vlstore",
  synchronize: true,
  logging: false,
  entities: ["src/models/*.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: ["src/subscribers/*ts"],
});
