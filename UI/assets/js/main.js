// inspiration from https://stackoverflow.com/questions/38593899/how-to-open-modal-with-multiple-buttons

// Get the modal
let modal = document.getElementById('myModal');

// Get the button that opens the modal
let btn = document.querySelectorAll('.delBtn');
// let btn = document.getElementsByClassName("delBtn");


// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
[].forEach.call(btn, (el) => {
    el.onclick = () => {
        modal.style.display = "block";
    }
})

// When the user clicks on <span> (x), close the modal
span.onclick = () => {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}