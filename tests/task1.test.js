const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

describe("Тестування роботи", () => {
  let logSpy;
  let html;
  let window;
  let dom;
  let scriptCode;
  beforeEach(() => {
    scriptCode = fs.readFileSync(
      path.resolve(__dirname, "../task1.js"),
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
    const scriptElement = window.document.createElement("script");
    scriptElement.textContent = scriptCode;
    document.body.appendChild(scriptElement);
  }

  it("Правильний вивід при стандартному списку", async () => {
    html = `
            <ul id="list">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul>
        `;
    runScript();
    expect(logSpy).toHaveBeenNthCalledWith(1, "1");
    expect(logSpy).toHaveBeenNthCalledWith(2, "5");
    expect(logSpy).toHaveBeenNthCalledWith(3, "2");
    expect(logSpy).toHaveBeenNthCalledWith(4, "3");
    expect(logSpy).toHaveBeenNthCalledWith(5, "4");
  });
  it("Правильний вивід при списку з 10 елементів", async () => {
    html = `
            <ul id="list">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>10</li>
                <li>20</li>
                <li>30</li>
                <li>40</li>
                <li>50</li>
            </ul>
        `;
    runScript();
    expect(logSpy).toHaveBeenNthCalledWith(1, "1");
    expect(logSpy).toHaveBeenNthCalledWith(2, "50");
    expect(logSpy).toHaveBeenNthCalledWith(3, "2");
    expect(logSpy).toHaveBeenNthCalledWith(4, "3");
    expect(logSpy).toHaveBeenNthCalledWith(5, "4");
  });

  it("Правильний вивід при списку з 2 елементів", async () => {
    html = `
            <ul id="list">
                <li>A</li>
                <li>B</li>
            </ul>
        `;
    runScript();
    expect(logSpy).toHaveBeenNthCalledWith(1, "A");
    expect(logSpy).toHaveBeenNthCalledWith(2, "B");
    expect(logSpy).toHaveBeenNthCalledWith(3, "B");
  });

  it("Правильний вивід при наявності двох списків", async () => {
    html = `
            <ul id="list">
                <li>A1</li>
                <li>B1</li>
                <li>C2</li>
            </ul>
            <ul id="list-02">
                <li>item</li>
                <li>item-item</li>
            </ul>
        `;
    runScript();
    expect(logSpy).toHaveBeenNthCalledWith(1, "A1");
    expect(logSpy).toHaveBeenNthCalledWith(2, "C2");
    expect(logSpy).toHaveBeenNthCalledWith(3, "B1");
  });

  it("Правильний вивід при наявності двох списків та додаткових елементів", async () => {
    html = `
            <ul id="list">
                <li>item-01</li>
                <p>paragraph</p>
                <li>item-02</li>
                <span>span</span>
                <li>item-03</li>
                <li>item-04</li>
                <li>item-05</li>
                <li>item-06</li>
            </ul>
            <ul id="list-02">
                <li>item</li>
                <li>item-item</li>
            </ul>
        `;
    runScript();
    expect(logSpy).toHaveBeenNthCalledWith(1, "item-01");
    expect(logSpy).toHaveBeenNthCalledWith(2, "item-06");
    expect(logSpy).toHaveBeenNthCalledWith(3, "item-02");
    expect(logSpy).toHaveBeenNthCalledWith(4, "item-03");
    expect(logSpy).toHaveBeenNthCalledWith(5, "item-04");
  });
});
