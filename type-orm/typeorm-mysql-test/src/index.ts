import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { TEST_A } from "./entity/Test_A"
import { In, LessThanOrEqual, MoreThanOrEqual } from "typeorm"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    // user.id = 3
    // user.firstName = "Timber3"
    // user.lastName = "Saw3"
    // user.age = 23
    const operation = AppDataSource.manager.getRepository(User)
    await operation.save([
        { id: 1, firstName: 'name1', lastName: 'end1', age: 29 },
        { id: 2, firstName: 'name2', lastName: 'end2', age: 28 },
        { id: 3, firstName: 'name3', lastName: 'end3', age: 27 },
        { id: 4, firstName: 'name4', lastName: 'end4', age: 27 },
        { id: 5, firstName: 'name5', lastName: 'end5', age: 27 },
    ])
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await operation.find({
        select: {
            id: true,
            age:true
        },
        where:{
            //小于等于
            age:LessThanOrEqual(27)
        },
        order:{
            id:'DESC'
        }
    })
    const usersFindCount = await operation.findAndCountBy({ age: 27 })
    const usersOne = await operation.findOne({
        select: {
            id: true
        },
        where:{
            age:27
        },
    })
    // await AppDataSource.manager.delete(User, user)
    // await AppDataSource.manager.delete(User, [2,3]) // [{id:2},{id:3}]
    console.log("Loaded users: ", users)

    //query查询
    const querySql = await AppDataSource.manager.query('select count(*) nums from user where age >= ?',[27])
    console.log("sql query users: ", querySql)

    //build查询
    const queryBuildSql = await AppDataSource.manager.createQueryBuilder().select('count(user.age)','count')
    .addSelect('user.age','age')
    .from(User,'user')
    .where('age > :age')
    .setParameters({age:26})
    .groupBy('user.age')
    .having('count(user.age) > :nums',{nums:2})
    const res = await queryBuildSql.getRawMany()
    console.log("sql queryBuildSql users: ", res)

    const testA = await AppDataSource.manager.find(TEST_A)
    console.log("Loaded TEST_A: ", testA)


}).catch(error => console.log(error))
