import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Children } from "./Children";

@Entity()
export class Home {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
        comment: '家园名称'
    })
    title: string;

    @OneToMany(() => Children,(children)=>children.home,{
        cascade:true,
    })
    children:Children[]
}