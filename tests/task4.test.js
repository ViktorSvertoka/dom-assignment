const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe("Тестування роботи, підключення в body", () => {
  let logSpy;
  let html;
  let window;
  let dom;
  let scriptCode;

  beforeEach(() => {
    scriptCode = fs.readFileSync(
      path.resolve(__dirname, "../task4.js"),
      "utf-8"
    );
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });
  afterEach(() => {
    logSpy.mockRestore();
  });

  function runScript() {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    window = dom.window;
    document = window.document;
    document.forms.userForm.userName = {
      value: document.getElementsByName("userName")[0].value,
    };
    document.forms.userForm.phone = {
      value: document.getElementsByName("phone")[0].value,
    };
    document.forms.userForm.birthday = {
      value: document.getElementsByName("birthday")[0].value,
    };
    document.forms.userForm.email = {
      value: document.getElementsByName("email")[0].value,
    };
    const scriptElement = window.document.createElement("script");
    scriptElement.textContent = scriptCode;
    document.body.appendChild(scriptElement);
  }

  it("Правильний вивід введених даних 1", async () => {
    html = `
    <html>
    <body>
    <form name="userForm" onsubmit="submitHandler()">
      <legend>Новий користувач</legend>
      <input
        value="testUser"
        type="text"
        data-form="ПІБ"
        class="text-data arr"
        name="userName"
        placeholder="Введіть ПІБ"
      />
      <input
        value="+380-00-000-0000"
        type="phone"
        data-form="Номер телефону"
        name="phone"
        placeholder="+380-00-000-0000"
      />
      <input
        value="1990-02-18"
        type="date"
        data-form="Дата народження"
        name="birthday"
      />
      <input
        value="email@softserveinc.com"
        type="email"
        data-form="Електронна пошта"
        placeholder="email@softserveinc.com"
        name="email"
      />
      <input type="submit"  class="btn" />
    </form>
    </body>
    </html>
    `;
    runScript();

    const buntton = document.getElementsByClassName("btn")[0];
    buntton.click();
    expect(logSpy).toHaveBeenCalledWith("testUser");
    expect(logSpy).toHaveBeenCalledWith("+380-00-000-0000");
    expect(logSpy).toHaveBeenCalledWith("1990-02-18");
    expect(logSpy).toHaveBeenCalledWith("email@softserveinc.com");
  });
  it("Правильний вивід введених даних 2", async () => {
    const userName = `test${getRandomNumber(1, 10)}User-${getRandomNumber(
      30,
      100
    )}`;
    const phone = `+380-${getRandomNumber(10, 99)}-${getRandomNumber(
      100,
      999
    )}-0000`;
    const date = `1990-0${getRandomNumber(1, 9)}-${getRandomNumber(10, 27)}`;
    const email = `email${getRandomNumber(1, 100)}@softserveinc.com`;
    html = `
    <html>
    <body>
    <form name="userForm" onsubmit="submitHandler()">
      <legend>Новий користувач</legend>
      <input
        value=${userName}
        type="text"
        data-form="ПІБ"
        class="text-data arr"
        name="userName"
        placeholder="Введіть ПІБ"
      />
      <input
        value=${phone}
        type="phone"
        data-form="Номер телефону"
        name="phone"
        placeholder="+380-00-000-0000"
      />
      <input
        value=${date}
        type="date"
        data-form="Дата народження"
        name="birthday"
      />
      <input
        value=${email}
        type="email"
        data-form="Електронна пошта"
        placeholder="email@softserveinc.com"
        name="email"
      />
      <input type="submit"  class="btn" />
    </form>
    </body>
    </html>
    `;
    runScript();

    const buntton = document.getElementsByClassName("btn")[0];
    buntton.click();
    expect(logSpy).toHaveBeenCalledWith(userName);
    expect(logSpy).toHaveBeenCalledWith(phone);
    expect(logSpy).toHaveBeenCalledWith(date);
    expect(logSpy).toHaveBeenCalledWith(email);
  });
});
