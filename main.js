(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){"Escape"===e.key&&o()}function n(e){e.target===e.currentTarget&&o()}function r(e){e.target.classList.contains("popup__close")&&o()}function o(){var e=document.querySelector(".popup_is-opened");e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",t),e.removeEventListener("mousedown",n),e.removeEventListener("click",r),M()}function c(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",t),e.addEventListener("mousedown",n),e.addEventListener("click",r)}e.d({},{C:()=>M});var p=document.querySelector("#card-template").content.querySelector(".card");function u(e,t,n,r){var o=p.cloneNode(!0),c=o.querySelector(".card__delete-button"),u=o.querySelector(".card__image"),i=o.querySelector(".card__title"),a=o.querySelector(".card__like-button");return u.src=e.link,u.alt=e.name,i.textContent=e.name,u.addEventListener("click",n),a.addEventListener("click",r),c.addEventListener("click",t),o}function i(e){e.target.closest(".places__item").remove()}function a(e){e.target.classList.toggle("card__like-button_is-active")}var d=document.querySelectorAll(".popup"),s=document.querySelector(".profile__edit-button"),l=document.querySelector(".popup_type_edit"),_=document.querySelector(".popup__input_type_name"),m=document.querySelector(".popup__input_type_description"),y=document.querySelector(".profile__title"),v=document.querySelector(".profile__description"),f=document.querySelector(".content").querySelector(".places__list"),q=document.querySelector(".popup_type_image"),S=document.querySelector(".popup__image"),k=document.querySelector(".popup__caption"),L=document.querySelector(".popup__form"),g=document.forms["edit-profile"],E=g.elements.name,b=g.elements.description,h=document.querySelector(".profile__add-button"),x=document.forms["new-place"],C=document.querySelector(".popup__input_type_card-name"),w=document.querySelector(".popup__input_type_url"),A=document.querySelector(".popup_type_new-card");function j(e){var t=e.target.closest(".places__item"),n=t.querySelector(".card__image"),r=t.querySelector(".card__title").textContent.trim();S.src=n.src,S.alt=n.alt,k.textContent=r,c(q)}function D(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove("popup__button-inactive")):(t.disabled=!0,t.classList.add("popup__button-inactive"))}function M(){var e=document.querySelectorAll(".popup__input-error"),t=document.querySelectorAll(".popup__input");e.forEach((function(e){e.textContent=""})),t.forEach((function(e){e.classList.remove("popup__input-type-error")}))}d.forEach((function(e){return e.classList.add("popup_is-animated")})),h.addEventListener("click",(function(){document.forms["new-place"].reset(),c(A)})),s.addEventListener("click",(function(){_.value=y.textContent,m.value=v.textContent,c(l)})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var t=u(e,i,j,a);f.appendChild(t)})),L.addEventListener("submit",(function(e){e.preventDefault(),y.textContent=E.value,v.textContent=b.value,o()})),x.addEventListener("submit",(function(e){e.preventDefault(),function(e){e.preventDefault();var t=u({link:w.value,name:C.value},i,j,a);f.prepend(t),o()}(e),document.forms["new-place"].reset(),D(Array.from(x.querySelectorAll(".popup__input")),x.querySelector(".popup__button"))})),Array.from(document.querySelectorAll(".popup__form")).forEach((function(e){var t,n,r;e.addEventListener("submit",(function(e){e.preventDefault()})),t=e,n=Array.from(t.querySelectorAll(".popup__input")),r=t.querySelector(".popup__button"),D(n,r),n.forEach((function(e){e.addEventListener("input",(function(){!function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("popup__input-type-error"),n.classList.remove("popup__input-error_active"),n.textContent=""}(e,t):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add("popup__input-type-error"),r.textContent=n,r.classList.add("popup__input-error_active")}(e,t,t.validationMessage)}(t,e),D(n,r)}))}))}))})();