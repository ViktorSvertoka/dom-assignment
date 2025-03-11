const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

describe("Тестування стилів", () => {
  let html = `
   <div class="create_elements">
    </div>
  `;
  let window;
  let dom;
  let document;
  let scriptCode;
  beforeEach(() => {
    scriptCode = fs.readFileSync(
      path.resolve(__dirname, "../task3.js"),
      "utf-8"
    );
    runScript();
  });

  function runScript() {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    window = dom.window;
    document = window.document;
    const scriptElement = window.document.createElement("script");
    scriptElement.textContent = scriptCode;
    document.body.appendChild(scriptElement);
  }

  it("Створює main елементе з потрібними атрибутами", async () => {
    const mainElement = document.querySelector("main");
    expect(mainElement).not.toBeNull();
    expect(mainElement.classList.contains("mainClass")).toBe(true);
    expect(mainElement.classList.contains("check")).toBe(true);
    expect(mainElement.classList.contains("item")).toBe(true);
  });

  it('Створює div з id="myDiv" всередині <main>', () => {
    const mainElement = document.querySelector("main");
    const myDiv = document.querySelector("#myDiv");
    expect(myDiv).not.toBeNull();
    expect(mainElement.contains(myDiv)).toBe(true);
  });
  
  test("Створює параграф всередині #myDiv", () => {
    const paragraph = document.querySelector("#myDiv p");
    expect(paragraph).not.toBeNull();
    expect(paragraph.textContent).toBe("First paragraph");
    expect(paragraph.parentElement.id).toBe("myDiv");
  });
});
