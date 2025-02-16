import { Dialect, Options, Sequelize } from 'sequelize';
// import MockDatabase from "./sequelize.mock.config"

class Database {
  private static instance: Sequelize;

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!Database.instance) {
        // if (!process.env.node_environment) {
        //     Database.instance = MockDatabase.getInstance();
        // } 
        // else {
            const option: Options = {
                host: process.env.DB_HOST!,
                dialect: process.env.DB_DIALECT! as Dialect || "postgres",
                logging: false,
            }
            Database.instance = new Sequelize(
                process.env.DB_NAME!,
                process.env.DB_USER!,
                process.env.DB_PASS!,
                option
            );
        // }
    }
    return Database.instance;
  }
}

export default Database.getInstance();
