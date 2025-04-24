import express from "express";
import * as authRepository from "../data/auth.mjs";

export async function signup(req, res, next) {
  const { userid, password, name, email } = req.body;
  const users = await authRepository.createUser(userid, password, name, email);
  if (users) {
    res.status(201).json(users);
  }
}

export async function login(req, res, next) {
  const { userid, password } = req.body;
  const user = await authRepository.login(userid, password);

  if (user) {
    // ✅ 로그인 성공 시 세션에 사용자 정보 저장
    req.session.user = { userid: user.userid, name: user.name };

    res.status(200).json({
      message: `${userid}님 로그인 완료!`,
      user: req.session.user, // 세션에 저장된 사용자 정보 반환
    });
  } else {
    res.status(404).json({
      message: `${userid}님 아이디 또는 비밀번호를 확인하세요`,
    });
  }
}
