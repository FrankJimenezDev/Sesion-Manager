import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Loginsesion extends BaseEntity {

    @PrimaryColumn()
    id: string = uuidv4() 

    @Column()
    userId!: string

    @Column()
    email!: string

    @Column({ default : true})
    status!: boolean

    @CreateDateColumn()
    loginAt: Date = new Date()

    @Column({ nullable: true })
    logoutAt?: Date
}