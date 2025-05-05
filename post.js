// 🔥 사용자별 프로필 이미지 설정
const profileImages = {
  김사과: "./images/apple.png",
  반하나: "./images/banana.png",
  오렌지: "./images/orange.png",
  이메론: "./images/melon.png",
};

// 🔥 토큰 만료 확인 함수
function isTokenExpired(token) {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split(".")[1])); // 토큰 디코딩
  const expTime = payload.exp * 1000; // 만료 시간 변환 (밀리초)
  return Date.now() > expTime;
}

async function fetchPosts() {
  const token = localStorage.getItem("token");

  // ✅ 토큰 만료 확인
  if (!token || isTokenExpired(token)) {
    alert("토큰이 만료되었습니다. 다시 로그인하세요.");
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:8080/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`HTTP 오류! 상태: ${response.status}`);
    }

    const data = await response.json();

    console.log("API 응답 데이터:", data.posts); // ✅ 응답 확인 로그 추가
    displayPosts(data.posts);
  } catch (error) {
    console.error("API 호출 오류:", error);
    alert("게시글을 불러오는 중 오류가 발생했습니다.");
  }
}

// ✅ 소개글을 post.html에 출력
function displayPosts(posts) {
  const postList = document.getElementById("postList");

  if (!postList) {
    console.error("❌ 오류: postList 요소를 찾을 수 없음!");
    return;
  }

  postList.innerHTML = ""; // 기존 내용 제거

  if (!posts || posts.length === 0) {
    postList.innerHTML = "<p>소개글이 없습니다.</p>";
    return;
  }

  console.log("🔹 출력할 데이터:", posts); // ✅ 데이터 확인 로그 추가

  posts.forEach((post) => {
    console.log(`✔ 소개글 추가: ${post.name}`); // ✅ 개별 소개글 확인 로그 추가
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    // 🔥 사진 옆에 정보 표시
    postElement.innerHTML = `
            <img src="${
              profileImages[post.name] || "./images/default.png"
            }" alt="프로필 사진">
            <div class="post-info">
                <p><strong>번호:</strong> ${post.id}</p>
                <p><strong>이름:</strong> ${post.name}</p>
                <p><strong>나이:</strong> ${post.age}</p>
                <p><strong>이메일:</strong> ${post.email}</p>
            </div>
        `;

    postList.appendChild(postElement);
  });
}

// ✅ 페이지 로딩 시 API 데이터 요청
window.onload = fetchPosts;
