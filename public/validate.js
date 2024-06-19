const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');
const r = document.querySelector(':root');
const warnings = document.getElementById('warnings');
const button = document.getElementById('signbtn');

password.addEventListener('keyup', () => {
    if (password.value.length < 8 && password.value.length > 0) {
        r.style.setProperty('--pass-outline-color', 'red');
        warnings.innerHTML = '8 or more characters required';
    }
    else {
        r.style.setProperty('--pass-outline-color', 'blue')
        warnings.innerHTML = '';
    }
    
});

cpassword.addEventListener('keyup', () => {
    if (cpassword.value.length > 0 && password.value.length > 8 && password.value !== cpassword.value) {
        r.style.setProperty('--pass-outline-color', 'red');
        warnings.innerHTML = 'Passwords don\'t match';
        button.disabled = true;
    }
    else {
        warnings.innerHTML = '';
        r.style.setProperty('--pass-outline-color', 'blue')
        button.disabled = false;
    }
});