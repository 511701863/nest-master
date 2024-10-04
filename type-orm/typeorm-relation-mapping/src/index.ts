import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { IdCard } from './entity/IdCard';
import { Article } from "./entity/manyToMany/Article";
import { Tag } from "./entity/manyToMany/Tag";
import { Children } from "./entity/manyToOne/Children";
import { Home } from "./entity/manyToOne/Home";

//一对一
// AppDataSource.initialize().then(async () => {
//     // const user = new User()
//     // user.id = 1
//     // user.age = 20
//     // user.firstName = 'LLL1111xx'
//     // user.lastName = 'JJJ1111xx'

//     // const idCard = new IdCard()
//     // idCard.id = 1
//     // idCard.cardNumber = '1111111'
//     // idCard.user = user
//     // // 设置了cascade user会自动生成
//     // await AppDataSource.manager.save(IdCard,idCard)

//     //被关联
//     const resUser = await AppDataSource.manager.find(User,{
//         relations:{
//             idCard:true
//         }
//     })
//     console.log(resUser[0]);

 
//     //关联 维持外键列的 Entity 添加 @JoinColumn 装饰器。
//     const resIdByQueryBuild = await AppDataSource.manager.createQueryBuilder(IdCard,'ic')
//     .leftJoinAndSelect('ic.user','u')
//     .getMany()

//     console.log(resIdByQueryBuild);
    

// }).catch(error => console.log(error))

//一对多
AppDataSource.initialize().then(async () => {
    const entityManager = AppDataSource.manager;
    // const children = new Children()
    // children.name = '小米'
    // children.id = 6
    // const children2 = new Children()
    // children2.name = '小红'
    // children2.id = 7
    // const children3 = new Children()
    // children3.name = '小卡卡'
    // children3.id = 8
    // const home = new Home()
    // home.title = '一家2'
    // home.id = 5
    // home.children = [children,children2,children3]
    
    // await entityManager.save(home)
    // const c = await entityManager.find(Children,{
    //     relations:{
    //         'home':true
    //     }
    // })
    // console.log(c);
    const h = await entityManager.find(Home,{
        relations:{
            'children':true
        }
    })
    console.log(h);
    await entityManager.delete(Home,[h[0].id])
    
    // const article = await entityManager.find(Article, {
    //     relations: {
    //         tags: true
    //     }
    // });
    // const article = await entityManager
    // .createQueryBuilder(Article, "a")
    // .leftJoinAndSelect("a.tags", "t")
    // .getMany()
    // const article = await entityManager
    // .findOne(Article,{
    //     where:{
    //         id:2
    //     },
    //     relations:{
    //         tags:true
    //     }
    // })
    // article.tags = article.tags.filter(item => item.id === 1)

}).catch(error => console.log(error))

// //多对多
// AppDataSource.initialize().then(async () => {
//     const entityManager = AppDataSource.manager;

//     // const article = await entityManager.find(Article, {
//     //     relations: {
//     //         tags: true
//     //     }
//     // });
//     // const article = await entityManager
//     // .createQueryBuilder(Article, "a")
//     // .leftJoinAndSelect("a.tags", "t")
//     // .getMany()
//     const article = await entityManager
//     .findOne(Article,{
//         where:{
//             id:2
//         },
//         relations:{
//             tags:true
//         }
//     })
//     article.tags = article.tags.filter(item => item.id === 1)
//     await entityManager.save(article)


//     console.log(article);
    

// }).catch(error => console.log(error))