import * as authRepository from "../data/auth.mjs";

export async function login(req, res, next) {
  try {
    console.log("로그인 요청 데이터:", req.body);

    if (!req.body || !req.body.userid || !req.body.password) {
      return res
        .status(400)
        .json({ message: "아이디와 비밀번호를 입력하세요." });
    }

    const { userid, password } = req.body;
    const user = await authRepository.login(userid, password);

    console.log("로그인된 user 객체:", user);

    if (!user) {
      return res
        .status(404)
        .json({ message: "아이디 또는 비밀번호를 확인하세요." });
    }

    req.session.user = user;

    res.status(200).json({
      message: `${userid}님 로그인 완료.`,
      user: req.session.user,
    });
  } catch (error) {
    console.error("로그인 중 오류 발생:", error);
    res.status(500).json({ message: "서버 내부 오류가 발생했습니다." });
  }
}

export function getMe(req, res) {
  if (req.session.user) {
    res.status(200).json({ user: req.session.user });
  } else {
    res.status(401).json({ message: "로그인이 필요합니다." });
  }
}

export function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error("로그아웃 중 오류 발생:", err);
      return res
        .status(500)
        .json({ message: "로그아웃 처리 중 오류가 발생했습니다." });
    }
    res.status(200).json({ message: "로그아웃 성공." });
  });
}
