import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "caoqian",
    database: "typeorm_test",
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [],
    poolSize:10,
    connectorPackage:'mysql2',
    extra:{
        authPlugin: 'sha256_password'
    }
})
