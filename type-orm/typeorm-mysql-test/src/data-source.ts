import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { TEST_A } from "./entity/Test_A"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "caoqian",
    database: "practice",
    synchronize: true,
    logging: true,
    entities: [User,TEST_A],
    migrations: [],
    subscribers: [],
    connectorPackage:'mysql2',
    extra:{
        authPlugin: 'sha256_password'
    }
})
