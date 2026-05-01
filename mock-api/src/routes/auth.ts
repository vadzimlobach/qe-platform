import { Router } from "express";
import { users } from "../data/users";
import { addToken } from "../auth/tokens";

export const authRouter = Router();

authRouter.post("/login", (req, res) => {
  const { username, password } = req.body as {
    username?: string;
    password?: string;
  };

  if (!username || !password) {
    return res.status(400).json({
      error: "Username and password are required",
    });
  }

  const user = users.find(
    (currentUser) =>
      currentUser.username === username && currentUser.password === password,
  );

  if (!user) {
    return res.status(401).json({
      error: "Invalid username or password",
    });
  }

  if (user.role === "locked") {
    return res.status(403).json({
      error: "User is locked out",
    });
  }

  const token = crypto.randomUUID();
  addToken(token);

  return res.status(200).json({
    token: token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
  });
});
