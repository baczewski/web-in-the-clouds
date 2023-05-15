import { Entity, Column, Unique } from "typeorm"
import { AbstractBaseEntity } from "./AbstractBaseEntity";

@Entity({ name: "USER" })
@Unique(["email"])
export class UserEntity extends AbstractBaseEntity {

    @Column({ nullable: false })
    email!: string

    @Column({ nullable: false })
    firstName!: string

    @Column({ nullable: false })
    lastName!: string

    @Column({ nullable: false })
    password!: string

}
