const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // ✅ JWT 라이브러리 추가

const app = express();
const PORT = 8080;
const SECRET_KEY = "your_secret_key"; // ✅ 토큰 서명용 비밀 키

// 미들웨어
app.use(cors());
app.use(express.json());

// 회원가입 API
app.post("/auth/signup", (req, res) => {
  const { userid, password, name, email } = req.body;

  if (!userid || !password || !name || !email) {
    return res.status(400).json({ message: "모든 필드를 입력해주세요." });
  }

  console.log("회원가입 요청 받음:", req.body);

  res.json({ message: "회원가입이 완료되었습니다!" });
});

// 로그인 API (✅ JWT 토큰 반환 추가)
app.post("/auth/login", (req, res) => {
  const { userid, password } = req.body;

  if (!userid || !password) {
    return res
      .status(400)
      .json({ message: "아이디와 비밀번호를 모두 입력해주세요." });
  }

  console.log("로그인 요청 받음:", req.body);

  // ✅ JWT 토큰 생성
  const token = jwt.sign({ userid }, SECRET_KEY, { expiresIn: "1h" });

  res.json({
    message: "로그인에 성공했습니다!",
    token: token, // ✅ 응답에 토큰 포함
  });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://127.0.0.1:${PORT}`);
});
