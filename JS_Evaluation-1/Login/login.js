document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const errorMsg = document.getElementById("errorMsg");
    const submitBtn = document.querySelector("#loginForm button");
  
    // Reset error state
    errorMsg.classList.remove("show");
    errorMsg.textContent = "";
    email.style.borderColor = "var(--border-color)";
    password.style.borderColor = "var(--border-color)";
  
    // Email format validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email.value.trim())) {
      showError(email, "Please enter a valid email address");
      return;
    }
  
    // Password format validation (min 6 chars)
    if (password.value.trim().length < 6) {
      showError(password, "Password must be at least 6 characters");
      return;
    }
  
    // Show loading state
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;
  
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      const users = JSON.parse(localStorage.getItem("users")) || [];
  
      // Check user credentials
      const user = users.find(
        (u) => u.email === email.value.trim() && u.password === password.value.trim()
      );
  
      if (!user) {
        showError(null, "Invalid email or password");
        return;
      }
  
      // Save logged-in user in localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(user));
  
      // Add success animation
      submitBtn.classList.remove("loading");
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
      submitBtn.style.backgroundColor = "var(--success-color)";
  
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        window.location.href = "../dashboard/dashboard.html";
      }, 1000);
  
    } catch (error) {
      showError(null, "An error occurred. Please try again.");
    } finally {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
    }
  });
  
  function showError(input, message) {
    const errorMsg = document.getElementById("errorMsg");
    errorMsg.textContent = message;
    errorMsg.classList.add("show");
  
    if (input) {
      input.style.borderColor = "var(--error-color)";
      input.focus();
    }
  }
  
  // Add input focus effects
  document.querySelectorAll(".form-group input").forEach(input => {
    input.addEventListener("focus", function() {
      this.parentElement.querySelector("i").style.color = "var(--primary-color)";
    });
  
    input.addEventListener("blur", function() {
      this.parentElement.querySelector("i").style.color = "#999";
    });
  });
  