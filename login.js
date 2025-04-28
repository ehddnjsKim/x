document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const userid = document.getElementById("userid").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!userid || !password) {
      alert("아이디와 비밀번호를 모두 입력해 주세요.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("로그인 성공: " + data.message);

        // ✅ 로그인 성공 시 JWT 토큰 저장
        localStorage.setItem("token", data.token);

        // ✅ 서버 응답 메시지를 화면에 표시
        document.getElementById("response-message").innerText = data.message;

        document.getElementById("login-form").reset();
      } else {
        alert("로그인 실패: " + data.message);
      }
    } catch (error) {
      alert("서버 통신 오류: " + error.message);
    }
  });
