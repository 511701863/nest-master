import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Home } from "./Home";

@Entity()
export class Children {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    name: string;

    @ManyToOne(() => Home,{
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
    })
    home: Home
}