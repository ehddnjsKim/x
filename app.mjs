// import express from "express";
// import postsRouter from "./router/posts.mjs";
// import authRouter from "./router/auth.mjs";
// import { config } from "../config.mjs";

// const app = express();

// app.use(express.json()); // JSON 데이터 처리 미들웨어 추가

// app.use(
//   session({
//     secret: "secret-key",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );

// app.use("/posts", postsRouter);
// app.use("/auth", authRouter);

// // 404 오류 처리 미들웨어
// app.use((req, res) => {
//   res.status(404).json({ message: "해당 경로를 찾을 수 없습니다." });
// });

// // 서버 내부 오류 처리 미들웨어
// app.use((err, req, res, next) => {
//   console.error("서버 내부 오류 발생:", err);
//   res.status(500).json({ message: "서버 내부 오류가 발생했습니다." });
// });

// app.listen(8080, () => {
//   console.log(" 서버 실행 중!");
// });

import express from "express";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import { config } from "./config.mjs";
import { connectDB } from "./db/database.mjs";

const app = express();

app.use(express.json());

app.use("/posts", postsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

// db.getConnection().then((connection) => console.log(connection));
connectDB()
  .then(() => {
    app.listen(config.host.port);
  })
  .catch(console.error);
