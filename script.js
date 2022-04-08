const form = document.getElementsByClassName('form')[0];
const phoneInput = form.phone;
const emailInput = form.email;
const nameInput = form.name;
const statusMessage = document.getElementsByClassName('status_message')[0];

const emailIsValid = (email) => {
    if(email.length === 0){return true}
    const regExp =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regExp.test(email);
};

const phoneIsValid = (phone) => {
    const regExp =  /^[\+]?[0-9]{1,12}[-\s]?[0-9]{1,6}[-\s]?[0-9]{1,6}$/;
    return regExp.test(phone);
};

const nameIsValid = (name) => {
    const regExp =  /^[а-я\s-]+$/i;
    return regExp.test(name);
};

const clearForm = () => {
    nameInput.value = '';
    phoneInput.value = '';
    emailInput.value = '';
};

const errorMessage = (errorType) => {
    if(errorType === 'form'){
        statusMessage.innerText = 'Проверьте правильность заполнения формы'
    }
    if(errorType === 'badHTTP'){
        statusMessage.innerText = 'Произошла ошибка при отправке данных формы'
    }
    statusMessage.classList.add('message_intro');
    statusMessage.classList.add('message_bad');
    setTimeout(()=>{
        statusMessage.classList.remove('message_intro'); 
        statusMessage.classList.remove('message_bad');
    }, 7500);
};

const successMessage = () => {
    statusMessage.innerText = 'Ваши данные успешно отправлены на сервер'
    statusMessage.classList.add('message_intro');
    statusMessage.classList.add('message_good');
    setTimeout(()=>{
        statusMessage.classList.remove('message_intro'); 
        statusMessage.classList.remove('message_good');
    }, 7500);
};

form.onsubmit = async(e) => {
    e.preventDefault();
    let formVal;
    if(emailInput.value.length === 0){
        formVal = {
            name:nameInput.value,
            phone:phoneInput.value,
            email:'none'
        };
    }
    else {
        formVal = {
            name:nameInput.value,
            phone:phoneInput.value,
            email:emailInput.value
        };
    }
    
    if(!emailIsValid(emailInput.value)){
        emailInput.classList.add('form__input-invalid');
        emailInput.addEventListener('click', ()=>{emailInput.classList.remove('form__input-invalid');})
        errorMessage('form');
    }

    if(!phoneIsValid(phoneInput.value)){
        phoneInput.classList.add('form__input-invalid');
        phoneInput.addEventListener('click', ()=>{phoneInput.classList.remove('form__input-invalid')});
        errorMessage('form');
    }

    if(!nameIsValid(nameInput.value)){
        nameInput.classList.add('form__input-invalid');
        nameInput.addEventListener('click', ()=>{nameInput.classList.remove('form__input-invalid')});
        errorMessage('form');
    }

    if(emailIsValid(emailInput.value) && phoneIsValid(phoneInput.value) && nameIsValid(nameInput.value)){

    let response = await fetch('https://60376bfd5435040017722533.mockapi.io/form', 
        {
            method:'POST',
            body: {
                name:nameInput.value,
                phone:phoneInput.value,
                email:emailInput.value
                }    
        });

    clearForm();
    response.status !== 201 ? errorMessage('badHTTP') : successMessage();
    };
}        