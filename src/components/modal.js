// Закрытие попап

function onKeyDown(event) {
  if (event.key === "Escape") {
    closePopup();
  }
}

function closePopupOnOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closePopup();
  }
}

function closeByClick(event) {
  if (event.target.classList.contains('popup__close')) {
    closePopup();
  }
}

function closePopup() {
  const openedPopup = document.querySelector('.popup_is-opened');
  openedPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', onKeyDown);
  openedPopup.removeEventListener('mousedown', closePopupOnOverlayClick);
  openedPopup.removeEventListener('click', closeByClick);
}

//Открытие попап

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', onKeyDown);
  popup.addEventListener('mousedown', closePopupOnOverlayClick);
  popup.addEventListener('click', closeByClick);
}

export { closePopup, openPopup }
