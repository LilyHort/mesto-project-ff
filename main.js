(()=>{"use strict";function e(e){"Escape"===e.key&&o()}function t(e){e.target===e.currentTarget&&o()}function n(e){e.target.classList.contains("popup__close")&&o()}function o(){var o=document.querySelector(".popup_is-opened");o.classList.remove("popup_is-opened"),document.removeEventListener("keydown",e),o.removeEventListener("mousedown",t),o.removeEventListener("click",n)}function r(o){o.classList.add("popup_is-opened"),document.addEventListener("keydown",e),o.addEventListener("mousedown",t),o.addEventListener("click",n)}var c={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-8",headers:{authorization:"9b76b4e2-72c5-47c7-aa5b-879cc0bf4fd1","Content-Type":"application/json"}},a=document.querySelector("#card-template").content.querySelector(".card"),u=document.querySelector(".popup_type_delete-card");function i(e,t,n,o){var r=a.cloneNode(!0),c=r.querySelector(".card__delete-button"),u=r.querySelector(".card__image"),i=r.querySelector(".card__title"),s=r.querySelector(".card__like-button"),l=r.querySelector(".card__like-counter");return r.dataset.card_id=e._id,u.src=e.link,u.alt=e.name,i.textContent=e.name,l.textContent=e.likes.length,u.addEventListener("click",n),s.addEventListener("click",(function(t){return o(t,e._id)})),e.likes.find((function(e){return e._id==sessionStorage.userId}))&&s.classList.toggle("card__like-button_is-active"),e.owner._id!=sessionStorage.userId?c.remove():c.addEventListener("click",(function(){return t(e._id)})),r}function s(e){u.dataset.card_id=e,r(u)}function l(e,t){var n=e.target.closest(".places__item").querySelector(".card__like-counter");e.target.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(c.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:c.headers}).then((function(e){if(e.ok)return e.json()})).catch((function(e){return console.log(e)}))}(t).then((function(t){e.target.classList.toggle("card__like-button_is-active"),n.textContent=t.likes.length})).catch((function(e){return console.log(e)})):function(e){return fetch("".concat(c.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:c.headers}).then((function(e){if(e.ok)return e.json()})).catch((function(e){return console.log(e)}))}(t).then((function(t){e.target.classList.toggle("card__like-button_is-active"),n.textContent=t.likes.length})).catch((function(e){return console.log(e)}))}function d(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n)):(t.disabled=!0,t.classList.add(n))}function p(e,t){var n=e.querySelectorAll("".concat(t.inputSelector,"-error")),o=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(e){e.textContent=""})),o.forEach((function(e){e.classList.remove(t.inputErrorClass)})),d(o,r,t.inactiveButtonClass)}var f=document.querySelectorAll(".popup"),_=document.querySelector(".profile__edit-button"),m=document.querySelector(".popup_type_edit"),v=document.querySelector(".popup__input_type_name"),y=document.querySelector(".popup__input_type_description"),h=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),g=document.querySelector(".content").querySelector(".places__list"),b=document.querySelector(".popup_type_image"),q=document.querySelector(".popup__image"),k=document.querySelector(".popup__caption"),C=document.querySelector(".popup__form"),L=document.forms["edit-profile"],E=L.elements.name,x=L.elements.description,j=document.querySelector(".profile__add-button"),P=document.forms["new-place"],w=document.querySelector(".popup__input_type_card-name"),A=document.querySelector(".popup__input_type_url"),U=document.querySelector(".popup_type_new-card"),T=document.querySelector(".profile__image"),B=document.forms["new-avatar"],D=B.elements.link,I=document.querySelector(".popup_type_avatar"),N=document.querySelector(".popup__button-delete"),O=document.querySelector(".popup_type_delete-card"),J={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button-inactive",inputErrorClass:"popup__input-type-error",errorClass:"popup__input-error_active"};f.forEach((function(e){return e.classList.add("popup_is-animated")})),j.addEventListener("click",(function(){P.reset(),p(B,J),r(U)})),_.addEventListener("click",(function(){v.value=h.textContent,y.value=S.textContent,p(L,J),r(m)})),T.addEventListener("click",(function(){B.reset(),p(B,J),r(I)}));var M=event.target.querySelector(".popup__button");function H(e){var t=e.target.closest(".places__item"),n=t.querySelector(".card__image"),o=t.querySelector(".card__title").textContent.trim();q.src=n.src,q.alt=n.alt,k.textContent=o,r(b)}B.addEventListener("submit",(function(e){var t;e.preventDefault(),M.textContent="Сохранение...",(t=D.value,fetch("".concat(c.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:c.headers,body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){T.style.backgroundImage="url('".concat(e.avatar,"')"),o()})).catch((function(e){return console.log(e)})).finally((function(){M.textContent="Сохранить"}))})),C.addEventListener("submit",(function(e){var t,n;e.preventDefault(),M.textContent="Сохранение...",(t=E.value,n=x.value,fetch("".concat(c.baseUrl,"/users/me"),{method:"PATCH",headers:c.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){h.textContent=e.name,S.textContent=e.about,o()})).catch((function(e){return console.log(e)})).finally((function(){M.textContent="Сохранить"}))})),N.addEventListener("click",(function(){var e,t=document.querySelector('[data-card_id="'.concat(O.dataset.card_id,'"]'));N.textContent="Удаление...",(e=O.dataset.card_id,fetch("".concat(c.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:c.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){t.remove(),o(),delete O.dataset.card_id})).catch((function(e){return console.log(e)})).finally((function(){N.textContent="Да"}))})),P.addEventListener("submit",(function(e){e.preventDefault(),function(e){var t,n;e.preventDefault(),M.textContent="Сохранение...",(t=w.value,n=A.value,fetch("".concat(c.baseUrl,"/cards"),{method:"POST",headers:c.headers,body:JSON.stringify({name:t,link:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){var t=i(e,s,H,l);g.prepend(t),o()})).catch((function(e){return console.log(e)})).finally((function(){M.textContent="Сохранить"}))}(e),document.forms["new-place"].reset(),p(P,J)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);d(n,o,t.submitButtonSelector),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n,o){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),r.classList.remove(o),r.textContent=""}(e,t,n,o):function(e,t,n,o,r){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o),c.textContent=n,c.classList.add(r)}(e,t,t.validationMessage,n,o)}(e,r,t.inputErrorClass,t.errorClass),d(n,o,t.inactiveButtonClass)}))}))}(t,e)}))}(J),Promise.all([fetch("".concat(c.baseUrl,"/users/me"),{headers:c.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(c.baseUrl,"/cards"),{headers:c.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t=e[0];h.textContent=t.name,S.textContent=t.about,T.style.backgroundImage="url('".concat(t.avatar,"')"),sessionStorage.setItem("userId",t._id),e[1].forEach((function(e){var t=i(e,s,H,l);g.appendChild(t)}))})).catch((function(e){console.log(e)}))})();