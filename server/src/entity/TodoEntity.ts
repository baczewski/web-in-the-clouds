import { Entity, Column, Unique, ManyToOne } from "typeorm"
import { AbstractBaseEntity } from "./AbstractBaseEntity";
import { UserEntity } from "./UserEntity";

@Entity({ name: "TODO" })
export class TodoEntity extends AbstractBaseEntity {

    @ManyToOne(() => UserEntity)
    user!: UserEntity

    @Column({ nullable: false })
    title!: string

    @Column({ nullable: false, type: "varchar", length: 4096 })
    description!: string

    @Column({ nullable: false })
    dueDate!: Date

}
