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
  users = [user, ...users];
  return users;
}

export async function login(req, res, next) {
  console.log("req.body 확인:", req.body); // 🔍 JSON 데이터가 올바르게 전달되는지 확인

  if (!req.body || !req.body.userid || !req.body.password) {
    return res.status(400).json({ message: "아이디와 비밀번호를 입력하세요." });
  }

  const { userid, password } = req.body;

  const user = users.find(
    (user) => user.userid === userid && user.password === password
  );

  if (user) {
    req.session.user = { userid: user.userid, name: user.name };

    res.status(200).json({
      message: `${userid}님 로그인 완료!`,
      user: req.session.user,
    });
  } else {
    res.status(404).json({ message: "아이디 또는 비밀번호를 확인하세요." });
  }
}
