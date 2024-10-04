import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { IdCard } from "./entity/IdCard"
import { Article } from "./entity/manyToMany/Article"
import { Tag } from "./entity/manyToMany/Tag"
import { Home } from "./entity/manyToOne/Home"
import { Children } from "./entity/manyToOne/Children"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "caoqian",
    database: "typeorm_test",
    synchronize: true,
    logging: true,
    entities: [User,IdCard,Article,Tag,Home,Children],
    migrations: [],
    subscribers: [],
    poolSize:10,
    connectorPackage:'mysql2',
    extra:{
        authPlugin: 'sha256_password'
    }
})
