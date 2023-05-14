import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "./user";
import { randomUUID } from "crypto";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json())

const users: User[] = [];


app.post("/register", (req: Request, res: Response) => {
  const { username, password, email, name } = req.body;

  if (!username || !password || !email || !name) {
    return res.status(400).json({ message: "Invalid body" });
  }

  const isValidUser = users
                        .filter(user => user.email === email || user.username === username)
                        .length === 0;

  if (!isValidUser) {
    return res.status(409).json({ message: "Email or username already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS) ?? 10);

  users.push({ id: randomUUID(), username, password: hashedPassword, name, email });

  return res.status(201).send();
});

app.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Invalid body" });
  }

  const currentUser = users.find(user => user.username === username);

  if (!currentUser) {
    return res.status(400).json({ message: "Not valid username" });
  }

  const isPasswordValid = bcrypt.compareSync(password, currentUser.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const tokenBody = {
    user_id: currentUser.id,
    username: currentUser.username,
    email: currentUser.email,
    name: currentUser.name,
  }

  const token = jwt.sign(tokenBody,
    process.env.JWT_TOKEN ?? randomUUID(),
    {
      expiresIn: "8h",
    }
  );


  res.status(200).json({ jwt: token });
});

app.get("/users",  (req: Request, res: Response) => {
  return res.status(200).json({ users });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});