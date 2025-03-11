// На сторінці є форма з заголовком "Новий користувач", яка містить поля для введення даних користувача.
// Поля форми:
// Ім'я користувача (userName)
// Номер телефону (phone)
// Дата народження (birthday)
// Електронна пошта (email)
// Реалізуйте функцію submitHandler, яка буде викликатись при натисканні кнопки Submit.
// При натисканні на кнопку відправки форми в консоль ма.ть вивестись введені дані з усіх полів.

function submitHandler() {
  const form = document.forms["userForm"];
  const userName = form["userName"].value;
  const phone = form["phone"].value;
  const birthday = form["birthday"].value;
  const email = form["email"].value;

  console.log(userName);
  console.log(phone);
  console.log(birthday);
  console.log(email);
}
