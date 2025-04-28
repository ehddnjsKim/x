import express from "express";
import * as authController from "../controller/auth.mjs";
import { body } from "express-validator";
import { validate } from "../middleware/validator.mjs";

const router = express.Router();

const validateLogin = [
  body("userid")
    .trim()
    .isLength({ min: 4 })
    .withMessage("최소 4자이상 입력")
    .matches(/^[a-zA-Z0-9]*$/)
    .withMessage("특수문자는 사용불가"),
  body("password").trim().isLength({ min: 8 }).withMessage("최소 8자이상 입력"),
  validate,
];

const validateSignup = [
  ...validateLogin,
  body("name").trim().notEmpty().withMessage("name을 입력"),
  body("email").trim().isEmail().withMessage("이메일 형식 확인"),
  validate,
];

// 회원가입
// POST
// http://127.0.0.1:8080/auth/signup
router.post("/signup", validateSignup, authController.signup);

// 로그인
// POST
// http://127.0.0.1:8080/auth/login
router.post("/login", validateLogin, authController.login);

// 로그인 유지 (현재 로그인한 사용자 정보 반환)
router.get("/me", (req, res) => {
  if (req.session.user) {
    res.status(200).json({ user: req.session.user });
  } else {
    res.status(401).json({ message: "로그인이 필요합니다." });
  }
});

export default router;
