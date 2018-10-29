// inspiration from https://stackoverflow.com/questions/38593899/how-to-open-modal-with-multiple-buttons

// Get the modal
const modal = document.getElementById('myModal');

// Get the button that opens the modal
const btn = document.querySelectorAll('.delBtn');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal 
[].forEach.call(btn, (el) => {
    el.onclick = () => {
        modal.style.display = 'block';
    };
});

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
    modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Display Messages
function displayMessage(message, type) {
    const body = document.querySelector('body');

    const messageDispalyDiv = document.createElement('div');
    messageDispalyDiv.textContent = message;

    messageDispalyDiv.classList.add('display-message');

    if (type === 'success') {
        messageDispalyDiv.classList.add('display-message_success');
    } else if (type === 'error') {
        messageDispalyDiv.classList.add('display-message_error');
    } else {
        messageDispalyDiv.classList.add('display-message');
    }

    body.insertBefore(messageDispalyDiv, document.querySelector('header'));
    setTimeout(() => {
        body.querySelector('.display-message').remove();
    }, 3000);
}


// Logout function
function logout() {
    localStorage.removeItem('token');
    window.location = 'index.html';
}

document.querySelector('#logout').addEventListener('click', logout);