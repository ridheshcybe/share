import { Router } from "express";

const users = [];
const router = Router();

router.get("/get-users", (req, res) => {
  res.json(users);
});

export default router;
