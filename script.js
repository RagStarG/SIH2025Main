let map; // global map

// Smooth scroll to report
function scrollToReport() {
  document.getElementById("report").scrollIntoView({ behavior: 'smooth' });
}

// Track issue (demo)
function trackIssue() {
  const issueId = document.getElementById("issueId").value;
  const statusResult = document.getElementById("statusResult");

  if(issueId.trim() === "") {
    statusResult.innerHTML = `<p style='color:red'>Please enter a valid Issue ID.</p>`;
  } else {
    statusResult.innerHTML = `
      <h3>Status for Issue ID: ${issueId}</h3>
      <ul>
        <li>📌 Reported</li>
        <li>✅ Verified</li>
        <li>⏳ Assigned</li>
        <li>❌ Pending Resolution</li>
      </ul>`;
  }
}

// ---------------- LOGIN + SIGNUP + FORGOT ----------------
document.getElementById("goSignup")?.addEventListener("click", () => {
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("signupSection").style.display = "flex";
});

document.getElementById("goLogin")?.addEventListener("click", () => {
  document.getElementById("signupSection").style.display = "none";
  document.getElementById("loginSection").style.display = "flex";
});

// SIGNUP
document.getElementById("signupForm")?.addEventListener("submit", e => {
  e.preventDefault();
  let newUser = document.getElementById("newUsername").value;
  let newPass = document.getElementById("newPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some(u => u.username === newUser)) {
    document.getElementById("signupError").style.display = "block";
    return;
  }

  users.push({ username: newUser, password: newPass });
  localStorage.setItem("users", JSON.stringify(users));

  alert("✅ Signup Successful! Please login.");
  document.getElementById("signupForm").reset();
  document.getElementById("signupSection").style.display = "none";
  document.getElementById("loginSection").style.display = "flex";
});

// LOGIN
document.getElementById("loginForm")?.addEventListener("submit", e => {
  e.preventDefault();
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let validUser = users.find(u => u.username === user && u.password === pass);

  if (validUser) {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("signupSection").style.display = "none";
    document.getElementById("forgotPasswordSection").style.display = "none";
    document.getElementById("mainPage").style.display = "block";

    // Fix map glitch
    setTimeout(() => { map.invalidateSize(); }, 300);

  } else {
    document.getElementById("loginError").style.display = "block";
  }
});

// FORGOT PASSWORD
document.getElementById("forgotPasswordLink")?.addEventListener("click", () => {
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("forgotPasswordSection").style.display = "flex";
});

document.getElementById("backToLogin")?.addEventListener("click", () => {
  document.getElementById("forgotPasswordSection").style.display = "none";
  document.getElementById("loginSection").style.display = "flex";
});

document.getElementById("forgotForm")?.addEventListener("submit", e => {
  e.preventDefault();
  let uname = document.getElementById("forgotUsername").value;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.username === uname);

  if (user) {
    document.getElementById("forgotResult").innerHTML = `🔑 Your password is: <b>${user.password}</b>`;
  } else {
    document.getElementById("forgotResult").innerHTML = "❌ No account found with that username.";
  }
});

// LOGOUT
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  document.getElementById("mainPage").style.display = "none";
  document.getElementById("loginSection").style.display = "flex";
});

// ---------------- LEAFLET MAP ----------------
document.addEventListener("DOMContentLoaded", function() {
  map = L.map('map').setView([22.5726, 88.3639], 12); // Kolkata

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  L.marker([22.5726, 88.3639]).addTo(map)
    .bindPopup('Example Issue: Garbage Dump')
    .openPopup();
});
