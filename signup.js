document
  .getElementById("signup-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const userid = document.getElementById("userid").value.trim();
    const password = document.getElementById("password").value.trim();
    const name = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!userid || !password || !name || !email) {
      alert("모든 항목을 입력해 주세요.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userid, password, name, email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("회원가입 성공: " + data.message);

        window.location.href = "login.html"; // 회원가입 후 로그인 페이지로 이동
      } else {
        alert("회원가입 실패: " + data.message);
      }
    } catch (error) {
      alert("서버 통신 오류: " + error.message);
    }
  });
