import puppetteer from 'puppeteer';

jest.setTimeout(30000); // default puppeteer timeout

describe('INN/OGRN form', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000/';
  beforeAll(async () => {
    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 100,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });

  test('add new card -> ok', async () => {
    await page.goto(baseUrl);
    const addBtn = await page.$('[data-id=createB]');
    addBtn.click();
    await page.waitForSelector('[data-id=form]', { visible: true });

    const inputName = await page.$('[data-id=name]');
    await inputName.type('Nokia');
    const inputCost = await page.$('[data-id=cost]');
    await inputCost.type('45000');

    const btnSave = await page.$('[data-id=btnSave]');
    btnSave.click();
    await page.waitForSelector('[data-id=form]', { visible: false });
  });

  test('add new card -> error', async () => {
    await page.goto(baseUrl);
    const addBtn = await page.$('[data-id=createB]');
    addBtn.click();
    await page.waitForSelector('[data-id=form]', { visible: true });

    const btnSave = await page.$('[data-id=btnSave]');
    btnSave.click();
    await page.waitForSelector('[data-id=form]', { visible: true });
    await page.$eval('[data-id=cost_invalid]', (e) => e.innerHTML);
  });

  test('card editor open -> ok && cancel button click', async () => {
    await page.goto(baseUrl);
    const editBtn = await page.$('.edit_0');
    editBtn.click();
    await page.waitForSelector('[data-id=form]', { visible: true });
    await page.$eval('.nameInput', (e) => e.innerHTML);
    await page.$eval('.costInput', (e) => e.innerHTML);
    const cancelBtn = await page.$('#btnCancel');
    cancelBtn.click();
    await page.waitForSelector('[data-id=form]', { visible: false });
  });
});
