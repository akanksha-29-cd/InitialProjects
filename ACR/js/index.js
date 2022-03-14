const names = document.getElementById('name');
const password = document.getElementById('password1');
const form = document.getElementById('form');
const error = document.getElementById('error');

form.addEventListener('submit', (e) => {
    let message = []
    if(names.value === '' || names.value == null){
        message.push('Name is required');
    }
if(password.value.length <= 6){
    message.push('Password must be more thn 6 characters');
}
if(password.value.length >= 15){
    message.push('Password must be less than 20 characters');
}
if(password.value = 'password'){
    message.push('Password cannot be set to password');
}
if(message.length > 0){
    e.preventDefault();
    error.innerHTML = message.join(',');
}
});