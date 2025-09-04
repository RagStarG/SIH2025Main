// Toggle Phone/Email
function setupToggle(radioName, phoneId, emailId) {
  document.querySelectorAll(`input[name="${radioName}"]`)?.forEach(opt => {
    opt.addEventListener("change", () => {
      document.getElementById(phoneId).style.display = opt.value === "phone" ? "block" : "none";
      document.getElementById(emailId).style.display = opt.value === "email" ? "block" : "none";
    });
  });
}
setupToggle("adminContactOption", "adminPhoneNumber", "adminEmailId");
setupToggle("adminLoginContactOption", "adminLoginPhoneNumber", "adminLoginEmailId");

// Go Home
function goHome() { window.location.href = "admin-index.html"; }

// ---------------- SIGNUP ----------------
document.getElementById("adminSignupForm")?.addEventListener("submit", e => {
  e.preventDefault();
  let firstName = adminFirstName.value.trim();
  let lastName = adminLastName.value.trim();
  let type = document.querySelector('input[name="adminContactOption"]:checked').value;
  let phone = adminPhoneNumber.value.trim();
  let email = adminEmailId.value.trim();
  let pass = newAdminPassword.value.trim();
  let confirm = confirmAdminPassword.value.trim();

  let admins = JSON.parse(localStorage.getItem("admins")) || [];

  if (admins.some(a => (phone && a.phone===phone) || (email && a.email===email))) {
    adminSignupError.style.display = "block"; return;
  }
  if (pass !== confirm) {
    adminPasswordError.style.display = "block"; return;
  }

  admins.push({ firstName, lastName, phone: type==="phone"?phone:null, email: type==="email"?email:null, password: pass });
  localStorage.setItem("admins", JSON.stringify(admins));
  alert("✅ Admin Signup Successful! Please login.");
  window.location.href = "admin-login.html";
});

// ---------------- LOGIN ----------------
document.getElementById("adminLoginForm")?.addEventListener("submit", e => {
  e.preventDefault();
  let firstName = adminLoginFirstName.value.trim();
  let lastName = adminLoginLastName.value.trim();
  let type = document.querySelector('input[name="adminLoginContactOption"]:checked').value;
  let phone = adminLoginPhoneNumber.value.trim();
  let email = adminLoginEmailId.value.trim();
  let pass = adminPassword.value.trim();

  let admins = JSON.parse(localStorage.getItem("admins")) || [];
  let valid = admins.find(a =>
    a.firstName===firstName && a.lastName===lastName && a.password===pass &&
    ((type==="phone" && a.phone===phone) || (type==="email" && a.email===email))
  );

  if (valid) {
    alert("✅ Login Successful!");
    window.location.href = "admin-dashboard.html";
  } else {
    adminLoginError.style.display = "block";
  }
});

// ---------------- DASHBOARD FUNCTIONS ----------------
function logoutAdmin() {
  alert("👋 Logged out successfully!");
  window.location.href = "admin-index.html";
}

function viewReports() {
  alert("📊 Reports Page (to be developed).");
}

function goToSignup() { window.location.href = "admin-signup.html"; }

function manageAdmins() {
  let admins = JSON.parse(localStorage.getItem("admins")) || [];
  if (admins.length===0) { alert("No admins found!"); return; }
  let list = "👥 Admin Accounts:\n\n";
  admins.forEach((a,i)=>{ list += `${i+1}. ${a.firstName} ${a.lastName} - ${a.phone||a.email}\n`; });
  alert(list);
}

function openSettings() { alert("⚙️ Settings (Coming Soon)."); }
