import { DataSource, Migration } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "K3l5p!",
  database: "vlstore",
  synchronize: false, // Como as tabelas foram criadas manualmente com SQL, impedi o TypeORM de criá-las
  logging: false,
  entities: ["src/models/*.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: ["src/subscribers/*ts"],
});
