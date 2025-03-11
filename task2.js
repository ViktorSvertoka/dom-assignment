// Простилізуйте елементи, як показано на зображенні task2.png.
// - Фон заголовка має бути "lightgreen", шрифт — жирний (font-weight: 700).
// - Колір другого параграфа — "red".
// - Третій параграф має бути підкреслений (underline).
// - Четвертий параграф має бути курсивним (italic).
// - Список має бути без маркерів і відображатися в одну лінію за допомогою flex.
// - На сторінці є елемент <span>, який потрібно приховати, встановивши властивість display: none.

const title = document.getElementById("title");
title.style.backgroundColor = "lightgreen";
title.style.fontWeight = "700";

const paragraphs = document.querySelectorAll("#myDiv p");
paragraphs[0].style.fontWeight = "700";
paragraphs[1].style.color = "red";
paragraphs[2].style.textDecoration = "underline";
paragraphs[3].style.fontStyle = "italic";

const myList = document.getElementById("myList");
myList.style.display = "flex";
myList.style.listStyle = "none";

const span = document.querySelector(".style_elements span");
span.style.display = "none";
