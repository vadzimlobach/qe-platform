import { Router } from "express";
import { users } from "../data/users";

export const testRouter = Router();

testRouter.get("/users", (req, res) => {
  return res.status(200).json({ users });
});

testRouter.post("/createUser", (req, res) => {
  const { username, password, role } = req.body as {
    username?: string;
    password?: string;
    role: "standard" | "locked";
  };

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  if (users.findIndex((user) => user.username === username) !== -1) {
    return res.status(409).json({ error: `${username} user already exists` });
  }

  const newUserId = users.length + 1;
  users.push({ id: newUserId, username, password, role });
  return res.status(200).json({ user: users[users.length - 1] });
});
