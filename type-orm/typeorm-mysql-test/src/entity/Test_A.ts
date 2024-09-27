import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({
    name:'TEST_A'
})
export class TEST_A {

    @PrimaryGeneratedColumn({
        comment:'自增主键id'
    })
    id: number

    @Column({
        unique:true,
        comment:'属性a',
        type:'varchar',
        length:15,
        width:5,
        default:'a element'
    })
    aaa: string

    @Column({
        comment:'属性b',
        type:'text',
        nullable:true
    })
    bbb: string

    @Column({
        comment:'属性c',
        type:'double',
        nullable:true
    })
    ccc: number

}
