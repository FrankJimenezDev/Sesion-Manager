import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Loginsesion extends BaseEntity {

    @PrimaryColumn()
    id: string = uuidv4() 

    @Column()
    email!: string

    @Column({ default : true})
    status!: boolean

    @Column()
    loginAt: Date = new Date()
}