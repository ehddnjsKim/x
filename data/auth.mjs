import { db } from "../db/database.mjs";

export async function createUser(user) {
  const { userid, password, name, email, url } = user;
  return db
    .execute(
      "insert into users (userid, password, name, email, url) values (?, ?, ?, ?, ?)",
      [userid, password, name, email, url]
    )
    .then((result) => result[0].insertId);
}

export async function login(userid, password) {
  try {
    console.log(" authRepository에서 로그인 요청:", userid, password);

    const user = users.find(
      (user) => user.userid === userid && user.password === password
    );

    if (!user) {
      console.error(" 사용자를 찾을 수 없음:", userid);
      return null; // res.status를 여기서 사용하지 않고 null 반환
    }

    return user; // 로그인 성공 시 사용자 객체 반환
  } catch (error) {
    console.error(" 로그인 중 오류 발생:", error);
    throw new Error("서버 내부 오류 발생"); // 오류 발생 시 throw로 예외 전달
  }
}

export async function findByUserid(userid) {
  return db
    .execute("select * from users where userid=?", [userid])
    .then((result) => result[0][0]);
}

export async function findByid(idx) {
  return db
    .execute("select * from users where idx=?", [idx])
    .then((result) => result[0][0]);
}
