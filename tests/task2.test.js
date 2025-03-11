const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

describe("Тестування стилів", () => {
  let html = `
   <div class="style_elements">
        <h1 id="title">I'am a big header!!!</h1>
        <div id="myDiv">
            <p>First paragraph</p>
            <p>Second paragraph</p>
            <p>Third paragraph</p>
            <p>Fourth paragraph</p>
        </div>
        <ul id="myList">
            <li>Make</li>
            <li>me</li>
            <li>horizontal!</li>
        </ul>
        <span>Make me invisible, please!</span>
    </div>
  `;
  let window;
  let dom;
  let document;
  let scriptCode;
  beforeEach(() => {
    scriptCode = fs.readFileSync(
      path.resolve(__dirname, "../task2.js"),
      "utf-8"
    );
  });

  function runScript() {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    window = dom.window;
    document = window.document;
    const scriptElement = window.document.createElement("script");
    scriptElement.textContent = scriptCode;
    document.body.appendChild(scriptElement);
  }

  it("Застосовує стилі до елементів", async () => {
    runScript();
    const styledElement = document.getElementById("title");
    const firstPar = document.getElementById("myDiv").children[0];
    const secondPar = document.getElementById("myDiv").children[1];
    const thirdPar = document.getElementById("myDiv").children[2];
    const fourthPar = document.getElementById("myDiv").children[3];
    const myList = document.getElementById("myList");
    const span = document.getElementsByTagName("span")[0];

    expect(styledElement.style.backgroundColor).toBe("lightgreen");
    expect(firstPar.style.fontWeight).toBe("700");
    expect(secondPar.style.color).toBe("red");
    expect(thirdPar.style.textDecoration).toBe("underline");
    expect(fourthPar.style.fontStyle).toBe("italic");
    expect(myList.style.listStyle).toBe("none");
    expect(myList.style.display).toBe("flex");
    expect(span.style.display).toBe("none");
  });
});
