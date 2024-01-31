// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(item, deleteElement) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = card.querySelector(".card__delete-button");

    card.querySelector(".card__image").src = item.link;
    card.querySelector(".card__image").alt = item.name;
    card.querySelector(".card__title").textContent = item.name;

    deleteButton.addEventListener("click", () => {
        deleteElement(deleteButton);
    });

    return card;
}

// @todo: Функция удаления карточки


function deleteElement(deleteButton) {
    deleteButton.parentElement.remove();
}

// @todo: Вывести карточки на страницу

function displayCards(arrayOfCards) {
    arrayOfCards.forEach(function displayCards(item) {
        const card = createCard(item,deleteElement);
        placesList.appendChild(card);
    });
}

displayCards(initialCards);
