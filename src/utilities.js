import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";

export const $ = (el) => document.querySelector(el);

export const toast = (text) => {
  Toastify({
    text,
    duration: 2000,
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover

    onClick: function () {}, // Callback after click
  }).showToast();
};
