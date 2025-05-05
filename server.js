const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 8080;
const SECRET_KEY = "mySuperSecretKey123!"; // ✅ 비밀 키 설정

// 미들웨어
app.use(cors());
app.use(express.json());

// ✅ 사용자 정보 저장 (회원가입된 사용자)
let users = {};

// ✅ 게시글 데이터 (소개글 형식으로 변경)
let posts = [
  {
    id: 1,
    name: "김사과",
    age: 20,
    email: "apple@naver.com",
    image: "./images/apple.png",
  },
  {
    id: 2,
    name: "반하나",
    age: 25,
    email: "banana@naver.com",
    image: "./images/banana.png",
  },
  {
    id: 3,
    name: "오렌지",
    age: 23,
    email: "orange@naver.com",
    image: "./images/orange.png",
  },
  {
    id: 4,
    name: "이메론",
    age: 21,
    email: "melon@naver.com",
    image: "./images/melon.png",
  },
];

// ✅ 회원가입 API
app.post("/auth/signup", (req, res) => {
  const { userid, password, name, email } = req.body;

  if (!userid || !password || !name || !email) {
    return res.status(400).json({ message: "모든 필드를 입력해주세요." });
  }

  users[userid] = { password, name, email };
  console.log("회원가입 완료:", users);

  res.json({ message: "회원가입이 완료되었습니다!" });
});

// ✅ 로그인 API (JWT 토큰 반환)
app.post("/auth/login", (req, res) => {
  const { userid, password } = req.body;

  if (
    !userid ||
    !password ||
    !users[userid] ||
    users[userid].password !== password
  ) {
    return res
      .status(400)
      .json({ message: "아이디 또는 비밀번호가 잘못되었습니다." });
  }

  console.log("로그인 요청 받음:", req.body);

  const token = jwt.sign({ userid }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ message: "로그인에 성공했습니다!", token, userid });
});

// ✅ 소개글 목록 조회 API (토큰 인증)
app.get("/posts", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "인증 실패: 토큰이 필요합니다." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (!decoded.userid) {
      return res
        .status(403)
        .json({ message: "사용자 정보를 찾을 수 없습니다." });
    }

    res.json({ message: "소개글 조회 성공!", user: decoded.userid, posts });
  } catch (error) {
    console.error("토큰 검증 오류:", error);
    res.status(403).json({ message: "유효하지 않은 토큰입니다." });
  }
});

// ✅ 서버 실행
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://127.0.0.1:${PORT}`);
});
