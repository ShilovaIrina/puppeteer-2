const { clickElement, findText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});

describe("Cinema tests", () => {
  test("Фильм 'Сталкер' 30.11", async () => {
    await clickElement(page, "[data-time-stamp='1732914000']");
    await clickElement(page, "[data-seance-time-stamp='1732960800']");
    const actual = await findText(page, ".buying__info-title");
    await expect(actual).toContain("Сталкер(1979)");
  });

  test("Бронируем билет на 'Ведьмака' в вип зале", async () => { 
    await clickElement(page, "[data-time-stamp='1733000400']");
    await clickElement(page, "[data-seance-id='223']");
    await clickElement(page, "div:nth-child(5) span:nth-child(5)");
    await clickElement(page, ".acceptin-button");
    const actual = await findText(page, ".ticket__check-title");
    await expect(actual).toContain("Вы выбрали билеты:");
  });

  test("Без выбора места, нельзя забронировать билет", async () => {
   await clickElement(page, "[data-time-stamp='1733000400']");
   await clickElement(page, "[data-seance-id='223']");
   const acceptinButton = await page.$(".acceptin-button");
   const actual = await acceptinButton.evaluate((btn) => btn.disabled);
   expect(actual).toEqual(true);
  });
});