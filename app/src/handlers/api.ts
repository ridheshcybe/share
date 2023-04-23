import { Router } from "express";

const users = [
  {
    name: "Hannah",
  },
];
const router = Router();

router.get("/get-users", (req, res) => {
  res.json(users);
});

export default router;
