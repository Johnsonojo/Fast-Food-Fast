const url = 'https://fast-food-fast-2018.herokuapp.com/api/v1/auth/signup';

const form = document.getElementById('signup');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

// Registers a new user
const signUp = (event) => {
    event.preventDefault();

    if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value))) {
        displayMessage('This is not a valid email address!', 'error');
    }
    if (!(/\d/.test(password.value))) {
        displayMessage('Provided passwords must have a number', 'error');
    }
    if (password.value !== confirmPassword.value) {
        password.value = '';
        confirmPassword.value = '';
        displayMessage('Sorry, provided passwords do not match!', 'error');
    }

    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username.value,
                email: email.value,
                password: password.value,
                confirmPassword: confirmPassword.value
            }),
        })
        .then(response => response.json())
        .then((signUpResponse) => {
            if (signUpResponse.status === 'failure') {
                return displayMessage(signUpResponse.message, 'error');
            }
            displayMessage('Account created succesfully!', 'success');
            localStorage.setItem('token', signUpResponse.data.token);

            window.location.href = 'login.html';
            return displayMessage('redirecting');
        })
        .catch((error) => {
            displayMessage(error.message, 'error');
        });
};

form.addEventListener('submit', signUp);