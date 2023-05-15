import "reflect-metadata"
import { AppDataSource } from "./data-source"
import { UserEntity } from "./entity/UserEntity"
import { NoteEntity } from "./entity/NoteEntity";

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new UserEntity()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.email = "test@test.test"
    user.password = "hashedPass"
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(UserEntity)
    console.log("Loaded users: ", users)

    console.log("Inserting a new note into the database...")
    const note = new NoteEntity()
    note.user = user;
    note.title = "Test note"
    note.description = "Test content :)"
    await AppDataSource.manager.save(note);
    console.log("Saved a new note with id: " + note.id)

    console.log("Loading notes from the database...")
    const notes = await AppDataSource.manager.find(NoteEntity)
    console.log("Loaded notes: ", notes)

}).catch(error => console.log(error))
