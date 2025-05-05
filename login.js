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
        alert("로그인 성공!");

        // ✅ JWT 토큰 및 사용자 ID 저장
        localStorage.setItem("token", data.token);
        localStorage.setItem("userid", data.userid);

        console.log("저장된 토큰:", data.token); // ✅ 토큰 확인용 로그 추가

        // ✅ 로그인 후 post.html 페이지로 자동 이동
        window.location.href = "post.html";
      } else {
        alert("로그인 실패: " + data.message);
      }
    } catch (error) {
      console.error("서버 오류:", error);
      alert("서버 오류 발생: " + error.message);
    }
  });
