import MongoDB from "mongodb";
import { getUsers } from "../db/database.mjs";
const ObjectID = MongoDB.ObjectId;

export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((result) => result.insertedId.toString());
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
  return getUsers().find({ userid }).next().then(mapOptionalUser);
}

export async function findByid(id) {
  return getUsers()
    .find({ _id: new ObjectID(id) })
    .next()
    .then(mapOptionalUser);
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
