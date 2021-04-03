const puppeteer = require('puppeteer');
const {Ayioo} = require('ayiooo')
module.exports = async function (contextHere, myTimer) {
    
    contextHere.log("PunchinCron started");
    try {

        Ayioo.configure({
            token:'',
            channelID:''
        })


        Ayioo.log(`PunchinCron starts ~ ${new Date().toISOString()}`);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const context = browser.defaultBrowserContext()
        await context.overridePermissions('', ['geolocation'])
        //set the location
        await page.setGeolocation({ latitude: 10.80855654999999, longitude: 78.67935942999998 })
        await page.goto('', {
            waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2']
        });
        await page.focus('#user-name');
        await page.keyboard.type('');
        await page.$eval('#user-password', el => el.value = '');
        await page.click('#btn');


        await page.waitForNavigation({ waitUntil: "domcontentloaded" });

        const _isIn = await page.$('#punchin-success').then(res => !!res);

        if (_isIn) {
            await page.click("#punchin-success");
        } else {
            await page.click("#punchout-success");
            await page.waitForSelector('#punch_out_form', { visible: true });
            const button = await page.waitForSelector('#punch_out_modal_submit', { visible: true });
            await button.click();
        }




        await browser.close();


        Ayioo.warn(`Cron ended at ${new Date().toISOString()}`);


        contextHere.log("PunchinCron ended");
    } catch (error) {
        contextHere.log("ERROR X",error);

        Ayioo.error(error)
    }
};