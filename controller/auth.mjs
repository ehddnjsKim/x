// import * as authRepository from "../data/auth.mjs";
// import * as bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// const secretKey = "abcdefg1234%^&*";
// const bctyptSaltRounds = 10;
// const jwtExpiresInDays = "2d";

// async function createJwtToken(id) {
//   return jwt.sign({ id }, secretKey, { expiresIn: jwtExpiresInDays });
// }

// export async function signup(req, res, next) {
//   try {
//     console.log(" 회원가입 요청 데이터:", req.body);

//     const { userid, password, name, email } = req.body;

//     // 회원 중복 체크
//     const found = await authRepository.findByUserid(userid);
//     if (found) {
//       return res.status(409).json({ message: `${userid}이 이미 있습니다.` });
//     }

//     const hshed = bcrypt.hashSync(password, bcryptSaltRounds);
//     const suers = await authRepository.createUser(userid, hashed, name, email);
//     const token = await createJwtToken(user.id);
//     console.log(token);
//     if (users) {
//       res.status(201).json({ token, userid });
//     }

//     if (!userid || !password || !name || !email) {
//       return res.status(400).json({ message: "모든 필드를 입력해야 합니다." });
//     }

//     const user = await authRepository.createUser(userid, password, name, email);

//     if (!user) {
//       return res
//         .status(500)
//         .json({ message: "회원가입 중 오류가 발생했습니다." });
//     }

//     res.status(201).json({ message: "회원가입 완료!", user });
//   } catch (error) {
//     console.error(" 회원가입 중 오류 발생:", error);
//     next(error); // 오류를 Express 오류 핸들러로 전달
//   }
// }

// // export async function login(req, res, next) {
// //   try {
// //     console.log(" 로그인 요청 데이터:", req.body);

// //     const { userid, password } = req.body;

// //     if (!userid || !password) {
// //       return res
// //         .status(400)
// //         .json({ message: "아이디와 비밀번호를 입력하세요." });
// //     }

// //     const user = await authRepository.login(userid, password);

// //     if (!user) {
// //       return res
// //         .status(404)
// //         .json({ message: "아이디 또는 비밀번호를 확인하세요." });
// //     }

// //     req.session.user = user;

// //     res.status(200).json({
// //       message: `${userid}님 로그인 완료!`,
// //       user: req.session.user,
// //     });
// //   } catch (error) {
// //     console.error(" 로그인 중 오류 발생:", error);
// //     next(error);
// //   }
// // }

// export async function login(req, res, next) {
//   const { userid, password } = req.body;
//   const user = await authRepository.findByUserid(userid);
//   if (!user) {
//     res.status(401).json(`${userid}아이디를 찾을 수 없음`);
//   }
//   const isValidPassowrd = await bcrypt.compare(password, user.password);
//   if (!isValidPassowrd) {
//     return res.status(401).json({ message: "아이디 또는 비밀번호를 확인" });
//   }
//   const token = await createJwtToken(user.id);
//   res.status();
// }

import * as authRepository from "../data/auth.mjs";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secretKey = "abcdefg1234%^&*";
const bcryptSaltRounds = 10;
const jwtExpiresInDays = "2d";
async function createJwtToken(id) {
  return jwt.sign({ id }, secretKey, { expiresIn: jwtExpiresInDays });
}

export async function signup(req, res, next) {
  const { userid, password, name, email } = req.body;
  // 회원 중복 체크
  const found = await authRepository.findByUserid(userid);
  if (found) {
    return res.status(409).json({ message: `${userid}이 이미 있습니다.` });
  }
  const hashed = bcrypt.hashSync(password, bcryptSaltRounds);
  const users = await authRepository.createUser(userid, hashed, name, email);
  const token = await createJwtToken(users.id);
  console.log(token);
  if (users) {
    res.status(201).json({ token, userid });
  }
}
export async function login(req, res, next) {
  const { userid, password } = req.body;
  const user = await authRepository.findByUserid(userid);
  if (!user) {
    res.status(401).json(`${userid} 아이디를 찾을 수 없음`);
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  // debug
  console.log(isValidPassword);

  if (!isValidPassword) {
    return res.status(401).json({ message: "아이디 또는 비밀번호 확인" });
  }
  const token = await createJwtToken(user.id);
  res.status(200).json({ token, userid });
}

export async function verify(req, res, next) {
  const id = req.id;
  if (id) {
    res.status(200).json(id);
  } else {
    res.status(401).json({ message: "사용자 인증 실패" });
  }
}

export async function me(req, res, next) {
  const user = await authRepository.findByid(req.id);
  if (!user) {
    return res.status(404).json({ message: "일치하는 사용자가 없음" });
  }
  res.status(200).json({ token: req.token, userid: user.userid });
}
