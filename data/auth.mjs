let users = [
  {
    id: "1",
    userid: "apple",
    password: "1111",
    name: "김사과",
    email: "apple@apple.com",
    url: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: "2",
    userid: "banana",
    password: "2222",
    name: "반하나",
    email: "banana@banana.com",
    url: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    userid: "orange",
    password: "3333",
    name: "오렌지",
    email: "orange@orange.com",
    url: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: "4",
    userid: "berry",
    password: "4444",
    name: "배애리",
    email: "orange@orange.com",
    url: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    id: "5",
    userid: "melon",
    password: "5555",
    name: "이메론",
    email: "orange@orange.com",
    url: "https://randomuser.me/api/portraits/men/29.jpg",
  },
];

export async function createUser(userid, password, name, email) {
  const user = {
    id: Date.now().toString(),
    userid,
    password,
    name,
    email,
    url: "https://randomuser.me/api/portraits/men/29.jpg",
  };

  users = [...users, user]; // 기존 배열을 변경하지 않도록 개선

  return user; // 새로 생성된 사용자 객체 반환
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
