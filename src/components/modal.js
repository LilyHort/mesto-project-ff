// Закрытие попап
function onKeyDown(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

function closePopupOnOverlayClick(evt) {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (evt.target === openedPopup) {
    closePopup();
  }
}

function closeByClick(evt) {
  if (evt.target.classList.contains('popup__close')) {
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
