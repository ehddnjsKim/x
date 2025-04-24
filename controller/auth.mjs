import express from "express";
import * as authRepository from "../data/auth.mjs";

export async function signup(req, res, next) {
  try {
    console.log(" 회원가입 요청 데이터:", req.body);

    const { userid, password, name, email } = req.body;

    if (!userid || !password || !name || !email) {
      return res.status(400).json({ message: "모든 필드를 입력해야 합니다." });
    }

    const user = await authRepository.createUser(userid, password, name, email);

    if (!user) {
      return res
        .status(500)
        .json({ message: "회원가입 중 오류가 발생했습니다." });
    }

    res.status(201).json({ message: "회원가입 완료!", user });
  } catch (error) {
    console.error(" 회원가입 중 오류 발생:", error);
    next(error); // 오류를 Express 오류 핸들러로 전달
  }
}

export async function login(req, res, next) {
  try {
    console.log(" 로그인 요청 데이터:", req.body);

    const { userid, password } = req.body;

    if (!userid || !password) {
      return res
        .status(400)
        .json({ message: "아이디와 비밀번호를 입력하세요." });
    }

    const user = await authRepository.login(userid, password);

    if (!user) {
      return res
        .status(404)
        .json({ message: "아이디 또는 비밀번호를 확인하세요." });
    }

    req.session.user = user;

    res.status(200).json({
      message: `${userid}님 로그인 완료!`,
      user: req.session.user,
    });
  } catch (error) {
    console.error(" 로그인 중 오류 발생:", error);
    next(error);
  }
}
