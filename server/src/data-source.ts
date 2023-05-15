import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserEntity } from "./entity/UserEntity"
import { TodoEntity } from "./entity/TodoEntity";
import { NoteEntity } from "./entity/NoteEntity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123789",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [UserEntity, TodoEntity, NoteEntity],
    migrations: [],
    subscribers: [],
})
