import express from "express";
import * as authController from "../controller/auth.mjs";

const router = express.Router();

// 회원가입
// POST - http://127.0.0.1:8080/auth/signup
router.post("/signup", authController.signup);

// 로그인
// POST - http://127.0.0.1:8080/auth/login
router.post("/login", authController.login);

// ✅ 로그인 유지 (현재 로그인한 사용자 정보 반환)
router.get("/me", (req, res) => {
  if (req.session.user) {
    res.status(200).json({ user: req.session.user });
  } else {
    res.status(401).json({ message: "로그인이 필요합니다." });
  }
});

export default router;
