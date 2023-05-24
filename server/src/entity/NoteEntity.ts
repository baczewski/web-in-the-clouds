import { Column, Entity, ManyToOne } from "typeorm";
import { AbstractBaseEntity } from "./AbstractBaseEntity";
import { UserEntity } from "./UserEntity";

@Entity({ name : "NOTE" })
export class NoteEntity extends AbstractBaseEntity {

    @ManyToOne(() => UserEntity)
    user!: UserEntity

    @Column({ nullable: false })
    title!: string

    @Column({ nullable: false, type: "varchar", length: 4096 })
    description!: string

}