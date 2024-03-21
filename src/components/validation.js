// Функция добавляющаяя класс ошибки 

function showInputError(form, inputElement, errorMessage, inputErrorClass, errorClass) {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

// Функция удаляет класс с ошибкой

function hideInputError(form, inputElement, inputErrorClass, errorClass) {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
};

// Функция проверяющая валидность формы 

function isValid(form, inputElement, inputErrorClass, errorClass) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(form, inputElement, inputElement.validationMessage, inputErrorClass, errorClass)
    }
    else {
        hideInputError(form, inputElement, inputErrorClass, errorClass)
    }
}

// Функия проверки невалидного импута
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

// Функция блокирующая кнопку 
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass)
    }
    else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass)
    }
}

function setEventListeners(form, validationConfig) {

    const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = form.querySelector(validationConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            isValid(form, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
            toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
        })
    })
}

// Функция включения валидации
function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (event) => {
            event.preventDefault()
        })
        setEventListeners(formElement, validationConfig)
    })
};

// Функция очистки валидации 
function clearValidation(form, validationConfig) {
    const popupInputErrors = form.querySelectorAll(`${validationConfig.inputSelector}-error`);
    const popupInputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = form.querySelector(validationConfig.submitButtonSelector);

    popupInputErrors.forEach((popupInputError) => {
        popupInputError.textContent = "";
    })
    popupInputs.forEach((popupInput) => {
        popupInput.classList.remove(validationConfig.inputErrorClass)
    })
    toggleButtonState(popupInputs, buttonElement, validationConfig.inactiveButtonClass)
}

export { enableValidation, clearValidation }
