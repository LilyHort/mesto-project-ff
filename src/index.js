import './pages/index.css';
import { openPopup, closePopup } from "./components/modal.js";
import { createCard, deleteElement, addLikeButtonActiveClass } from "./components/card.js";
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, updateUserInfo, getInitialCards, addNewCard, updateAvatar, deleteCard } from './components/API.js';

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
const newPlaceForm = document.forms["new-place"];
const newPlaceNameForm = document.querySelector(".popup__input_type_card-name");
const newPlaceLink = document.querySelector(".popup__input_type_url");
const popupNewCard = document.querySelector(".popup_type_new-card");
const profileImage = document.querySelector(".profile__image");
const newAvatarForm = document.forms["new-avatar"];
const linkInputFormAvatar = newAvatarForm.elements.link;
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupDeleteButton = document.querySelector(".popup__button-delete");
const popupDelete = document.querySelector(".popup_type_delete-card");

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-inactive',
    inputErrorClass: 'popup__input-type-error',
    errorClass: 'popup__input-error_active'
}

popups.forEach(popup => popup.classList.add("popup_is-animated"));

// Кнопка открытия попапа добавления фотографии

buttonAdd.addEventListener("click", () => {
    newPlaceForm.reset();
    clearValidation(newAvatarForm, validationConfig);
    openPopup(popupNewCard);
});

// Кнопка открытия попапа редактирования профиля

buttonEdite.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    clearValidation(formEditProfile, validationConfig);
    openPopup(popupEdit);
});

// Редактирование аватара 

profileImage.addEventListener("click", () => {
    newAvatarForm.reset();
    clearValidation(newAvatarForm, validationConfig);
    openPopup(popupAvatar);
})

function editFormSubmitAvatar(event) {
    event.preventDefault();
    const button = event.target.querySelector(".popup__button");
    button.textContent = "Сохранение...";
    updateAvatar(linkInputFormAvatar.value)
        .then((res) => {
            profileImage.style.backgroundImage = `url('${res.avatar}')`;
            closePopup();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            button.textContent = "Сохранить";
        });
}

newAvatarForm.addEventListener('submit', editFormSubmitAvatar)

// Открытие картинки по клику

function openImage(event) {
    const card = event.target.closest('.places__item');
    const cardImage = card.querySelector(".card__image");
    const cardTitle = card.querySelector('.card__title').textContent.trim();

    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardTitle;
    openPopup(popupContentImage);
}

// Вывод массива карточек на страницу

function displayCards(arrayOfCards) {
    arrayOfCards.forEach(function displayCards(item) {
        const card = createCard(item, deleteElement, openImage, addLikeButtonActiveClass);
        placesList.appendChild(card);
    });
}

// Загрузка всех карточек с сервера

function loadInitialInfo() {
    Promise.all([getUserInfo(), getInitialCards()])
        .then((data) => {
            const profileInfo = data[0];
            profileName.textContent = profileInfo.name;
            profileDescription.textContent = profileInfo.about;
            profileImage.style.backgroundImage = `url('${profileInfo.avatar}')`;
            sessionStorage.setItem('userId', profileInfo._id);
            displayCards(data[1]);
        })
        .catch((err) => {
            console.log(err);
        });
}

// Сохранение изминения профиля


function editFormSubmit(event) {
    event.preventDefault();
    const button = event.target.querySelector(".popup__button");
    button.textContent = "Сохранение...";
    updateUserInfo(nameInputForm.value, jobInput.value)
        .then((res) => {
            profileName.textContent = res.name;
            profileDescription.textContent = res.about;
            button.textContent = "Сохранить";
            closePopup();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            button.textContent = "Сохранить";
        });
}

formElement.addEventListener('submit', editFormSubmit)

// Подтверждение удаления карточки

function buttonAproveDeleteCardListener() {
    const card = document.querySelector(`[data-card_id="${popupDelete.dataset.card_id}"]`);
    popupDeleteButton.textContent = "Удаление...";
    deleteCard(popupDelete.dataset.card_id)
        .then(() => {
            card.remove();
            closePopup(popupDelete);
            delete popupDelete.dataset.card_id;
        })
        .catch((err) => console.log(err))
        .finally(() => {
            popupDeleteButton.textContent = "Да";
        });
}

popupDeleteButton.addEventListener("click", buttonAproveDeleteCardListener)

// Форма загрузки фотографии

function addCardFormSubmit(event) {
    event.preventDefault();
    const button = event.target.querySelector(".popup__button");
    button.textContent = "Сохранение...";
    addNewCard(newPlaceNameForm.value, newPlaceLink.value)
        .then((res) => {
            const createElement = createCard(res, deleteElement, openImage, addLikeButtonActiveClass);
            placesList.prepend(createElement);
            closePopup()
        })
        .catch((err) => console.log(err))
        .finally(() => {
            button.textContent = "Сохранить";
        });
}

newPlaceForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addCardFormSubmit(event)
    document.forms["new-place"].reset();
    clearValidation(newPlaceForm, validationConfig);
})

enableValidation(validationConfig);

loadInitialInfo() 