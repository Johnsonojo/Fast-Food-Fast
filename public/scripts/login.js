const url = 'https://fast-food-fast-2018.herokuapp.com/api/v1/auth/login';

const form = document.getElementById('login');
const email = document.getElementById('email');
const password = document.getElementById('password');

// Login a registered user
const logIn = (event) => {
    event.preventDefault();

    if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value))) {
        displayMessage('This is not a valid email address!', 'error');
    }
    if (!(/\d/.test(password.value))) {
        displayMessage('Provided passwords must have a number', 'error');
    }

    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
        })
        .then(response => response.json())
        .then((logInResponse) => {
            if (logInResponse.status === 'failure') {
                return displayMessage(logInResponse.message, 'error');
            }
            localStorage.setItem('token', logInResponse.data.token);
            const decoded = jwt_decode(logInResponse.data.token);

            window.location = decoded.role === 'admin' ? 'admin-dashboard.html' : 'user-dashboard.html';
            displayMessage('redirecting');
        })
        .catch((error) => {
            displayMessage('Ooops, something wrong happened while logging you in', 'error');
        });
};

form.addEventListener('submit', logIn);