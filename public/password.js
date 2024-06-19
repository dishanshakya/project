
const checkbox = document.getElementById('showpasscheck');
checkbox.addEventListener('click', () => {
    if (password.type == 'password') {
        password.type = 'text';
        cpassword.type = 'text';
    }
    else {
        password.type = 'password';
        cpassword.type = 'password';
    }
})