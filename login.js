// corinnes code

document.addEventListener('DOMContentLoaded', function() {
    console.log('Login.js loaded successfully');
    
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        console.log('Login form found');
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Login attempt submitted');
            
            if (!loginForm.checkValidity()) {
                loginForm.reportValidity();
                return;
            }

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
    
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.username === username && u.password === password);
            
            if(username === "admin" && password === "manager123") {
                console.log('Manager credentials matched! Redirecting...');
                alert('Manager login successful!');
                window.location.href = "manager.html";
            } else if (user) {
                console.log('User login successful! Redirecting to menu...');
                alert('Login successful! Welcome back ' + user.name + '!');
                window.location.href = "menu.html";
            } else {
                alert('Login failed. Please check your username and password.');
            }
        });
    } else {
        console.error('Login form NOT found!');
    }
    
    
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if (!signupForm.checkValidity()) {
                signupForm.reportValidity();
                return;
            }
            
            const name = document.getElementById('signup-name').value.trim();
            const username = document.getElementById('signup-username').value.trim();
            const password = document.getElementById('signup-password').value.trim();

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!passwordRegex.test(password)) {
                alert('Password must be at least 8 characters long and include: one uppercase letter, one lowercase letter, and one number.');
                document.getElementById('signup-password').focus();
                return;
            }
            
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.some(u => u.username === username)) {
                alert('Username already exists. Please choose a different one.');
                document.getElementById('signup-username').focus();
                return;
            }
            
            users.push({ name, username, password });
            localStorage.setItem('users', JSON.stringify(users));
            
            alert('Account created successfully for ' + username + '! You can now login.');
            signupForm.reset();
        });
    }
});

// corinne code 