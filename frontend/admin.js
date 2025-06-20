/* admin.js */
const API_URL = "http://localhost:3000/admin/login";

document.getElementById('login-btn').onclick = async function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.success) {
        document.getElementById('login-message').style.color = "green";
        document.getElementById('login-message').innerText = "Login successful! Welcome, admin.";
        // Here you can redirect or show the next section later
   // Optional: Store the token (for use in the admin panel later)
localStorage.setItem('adminToken', data.token);

// Redirect to Q&A panel after 0.8 seconds
setTimeout(() => {
    window.location.href = "admin-dashboard.html";
}, 800);

    } else {
        document.getElementById('login-message').style.color = "red";
        document.getElementById('login-message').innerText = "Login failed. Try again!";
    }

    
};
