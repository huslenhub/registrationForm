const wrapperBox = document.getElementById("wrapper");
const inputFieldGroup = document.getElementsByClassName("inputGroup");
const allInputs = document.querySelectorAll("input");
const userNickname = document.getElementById("nickname");
const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const confirmPassword = document.getElementById("confirmPassword");
const userPhone = document.getElementById("phone");
const registrationForm = document.getElementById("registrationForm");

const UpdateHelperText = (inputFieldGroup,message,isValid) => {
    const inputGroup = inputFieldGroup.parentElement;
    const helperText = inputGroup.getElementsByClassName("helperText")[0];

    if(isValid == true){
        inputGroup.classList.remove('invalid');
        inputGroup.classList.add('valid');
        helperText.style.visibility = 'hidden';
    }
    if(isValid == false){
        inputGroup.classList.remove('valid');
        inputGroup.classList.add('invalid');
        helperText.style.visibility = 'visible';
        helperText.innerText = message;
    }

};

const checkEmptyInput = (input) => {
    if(input.value.trim() === ''){
        UpdateHelperText(input,'값을 입력해주세요',false);
        return false;
    }else{
        UpdateHelperText(input,"",true);
        return true;
    }
}

const validateEmailFormat = (input) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(emailPattern.test(input.value.trim()) == true){
        UpdateHelperText(input,"",true);
        return true;
    }else{
        UpdateHelperText(input,"유효힌 이메일 입력 부탁드립니다.",false);
        return false;
    }
}

const checkPasswordStrength = (password) => {
    const strongPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,15}$/;
    if(strongPattern.test(password.value) == true){
        UpdateHelperText(password,"비밀번호 강도 강함",true);
        return true;
    }else{
        UpdateHelperText(password,"비밀번호 약함 숫자, 문자, 특수문자 포함 필요",false);
        return false;
    }
}

const validatePasswordMatch = (passwordInput,confirmInput) =>{
    if(passwordInput.value !== confirmInput.value){
        UpdateHelperText(confirmInput,"비밃번호가 일치 하지 않습니다.",false);
        return false;
    }else{
        UpdateHelperText(confirmInput,"",true);
        return true;
    }
}

const validPhoneNumber = (input) =>{
    const phonePattern = /^\d{8}$/;
    if(phonePattern.test(input.value.trim()) == true){
        UpdateHelperText(input,"",true);
        return true;
    }else{
        UpdateHelperText(input,"유효한 번호를 입력하세요.",false);
        return false;
    }
}

const validateForm = () =>{
    const isNicknameValid = checkEmptyInput(userNickname);
    const isEmailValid  = validateEmailFormat(userEmail);
    const isPasswordValid = checkPasswordStrength(userPassword);
    const isConfirmValid = validatePasswordMatch(userPassword,confirmPassword);
    const isPhoneValid = validPhoneNumber(userPhone);
    return isNicknameValid && isEmailValid && isPasswordValid && isConfirmValid && isPhoneValid;
}

registrationForm.addEventListener('submit',(e) => {
    e.preventDefault();
    if(validateForm() == true){
        console.log("모든 필드가 유효합니다.")
    }else{
        console.log("유효성 검사 실패 에러 있음");
    }
    console.log(e);
})

document.querySelectorAll("input").forEach(input => {
    input.addEventListener('input',() => {
        switch(input.id){
            case 'nickname':
                checkEmptyInput(input);
                break;
            case 'email':
                validateEmailFormat(input);
                break;
            case 'userPassword':
                checkPasswordStrength(input);
                break;
            case 'confrimPassword':
                validatePasswordMatch(userPassword,confirmPassword);
                break;
            case 'phone':
                validPhoneNumber(input);
                break;    
        }
    })
})