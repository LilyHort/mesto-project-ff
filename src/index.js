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

