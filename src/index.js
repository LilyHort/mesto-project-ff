import './pages/index.css';
import { initialCards } from "./components/cards.js";
import { openPopup, closePopup } from "./components/modal.js";
import { createCard, deleteElement, addLikeButtonActiveClass } from "./components/card.js";

const popups = document.querySelectorAll(".popup");
const buttonEdite = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const container = document.querySelector('.content');
const placesList = container.querySelector('.places__list');
const popupContentImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const formElement = document.querySelector(".popup__form")
const formEditProfile = document.forms["edit-profile"];
const nameInputForm = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const buttonAdd = document.querySelector(".profile__add-button");
const newPlace = document.forms["new-place"];
const newPlaceNameForm = document.querySelector(".popup__input_type_card-name");
const newPlaceLink = document.querySelector(".popup__input_type_url");
const popupNewCard = document.querySelector(".popup_type_new-card");

popups.forEach(popup => popup.classList.add("popup_is-animated"));

// Добавление фотографии

buttonAdd.addEventListener("click", () => {
    openPopup(popupNewCard)
});

//Профиль



buttonEdite.addEventListener("click", () => {
    function openEdite() {
        nameInput.value = profileName.textContent;
        descriptionInput.value = profileDescription.textContent;
    }

    openEdite()
    openPopup(popupEdit)
});

//Темплейт

// @todo: DOM узлы


function openImage(event) {
    const card = event.target.closest('.places__item');
    const cardImage = card.querySelector(".card__image");
    const cardTitle = card.querySelector('.card__title').textContent.trim();

    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardTitle;
    openPopup(popupContentImage);
}

// @todo: Вывести карточки на страницу

function displayCards(arrayOfCards) {
    arrayOfCards.forEach(function displayCards(item) {
        const card = createCard(item, deleteElement, openImage, addLikeButtonActiveClass);
        placesList.appendChild(card);
    });
}

displayCards(initialCards);

// Форма профиля 

function editFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = nameInputForm.value;
    profileDescription.textContent = jobInput.value;
    closePopup()
}

formElement.addEventListener('submit', editFormSubmit)

// Форма загрузки фотографии


function addCardFormSubmit(event) {
    event.preventDefault();

    const item = {
        link: newPlaceLink.value,
        name: newPlaceNameForm.value
    }
    const createElement = createCard(item, deleteElement, openImage, addLikeButtonActiveClass);
    placesList.prepend(createElement);
    closePopup()
}

newPlace.addEventListener("submit", (event) => {
    addCardFormSubmit(event)
    document.forms["new-place"].reset();
})


// Валидация формы


//const formError = formElement.querySelector(".popup__input-error"); 

//const popupInput = formElement.querySelector(".popup__input")
//const popupError = formElement.querySelector(`.${popupInput.id}-error`);

// Шаблон регулярного выражения
// const castomTextError = "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"
// const regex = /^[a-zа-яё\-\s]+$/i;
/*
function validateInput(form, inputElement) {
  
    const regex = /[a-z-а-я-ё-]+/gi;
    if(regex.test(inputElement.value)){
        return true;
    }
    else {
        const errorElement = form.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = "Поле может содержать только буквы, пробелы и дефисы.";
        return false;
    }
}
*/
// Функция добавляющаяя класс ошибки 

function showInputError(form, inputElement, errorMessage) {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add("popup__input-type-error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_active");
  }; 

  // Функция удаляет класс с ошибкой

function hideInputError(form, inputElement) {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("popup__input-type-error");
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent ="";
  };

  

  //const input = document.querySelector("input[type=‘text’]");


  // Функция проверяющая валидность формы 

  function isValid (form, inputElement) {
    if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
      if(!inputElement.validity.valid) {
        showInputError(form, inputElement, inputElement.validationMessage)
      }
      else {
        hideInputError(form, inputElement)
      }
  }



 

  function setEventListeners(form) {
    const inputList = Array.from(form.querySelectorAll(".popup__input"));
    const buttonElement = form.querySelector(".popup__button");

    toggleButtonState(inputList, buttonElement)

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function() { 
            isValid(form, inputElement)
        toggleButtonState(inputList, buttonElement)
    })
})
  }

  
  function enableValidation () {
      const formList = Array.from(document.querySelectorAll(".popup__form"));

      formList.forEach((formElement) => {
         formElement.addEventListener("submit", (event) => {
            event.preventDefault()
         })

         setEventListeners(formElement)
      })
  };

  // Функция принимает массив полей

  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
  }

   // Функция блокирующая кнопку 

   function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add("popup__button-inactive")
    }
    else {
        buttonElement.disabled = false;
      buttonElement.classList.remove("popup__button-inactive")
    }
}
  
  enableValidation();