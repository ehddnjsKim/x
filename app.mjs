import express from "express";
import session from "express-session";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/auth", authRouter);
app.use("/posts", postsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "해당 경로를 찾을 수 없습니다." });
});

app.use((err, req, res, next) => {
  console.error("서버 내부 오류 발생:", err);
  res.status(500).json({ message: "서버 내부 오류가 발생했습니다." });
});

app.listen(8080, () => {
  console.log("서버가 8080번 포트에서 실행 중.");
});
