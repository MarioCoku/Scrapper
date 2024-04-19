const puppeteer = require('puppeteer');
import { title } from "process";
import { Browser } from "puppeteer";

const url = 'https://www.volcanodiscovery.com/earthquakes/today.html#google_vignette'

const main = async () => {
    const browser:Browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto(url)

    ///html[1]/body[1]/div[7]/div[1]/div[2]/div[1]/div[11]/div[1]/section[1]/div[4]/span[1]

    //  // Wait for the button to appear
    //  await page.waitForSelector('span.actionBtn', { visible: true });

    //  // Click the button
    //  await page.click('span.actionBtn');

    // Click the span element using its absolute XPath
    // const spanXPath = 'html[1]/body[1]/div[7]/div[1]/div[2]/div[1]/div[11]/div[1]/section[1]/div[4]/span[1]';
    // try {
    //     await page.$eval(spanXPath, (element) => element.click());
    // } catch (error) {
    //     console.error('Error clicking span element:', error);
    // }



    const quakeData = await page.evaluate(()=>{
        const quakePods = Array.from(document.querySelectorAll(".q2"))//q2 list_time
        const data = quakePods.map((quake: any)=>({
            dateAndTime: quake.querySelector('.list_time').innerText,
            magnitude: quake.querySelector('.mList div').innerText,
            location: quake.querySelector('.list_region').innerText,

        }))
        return data
    })
    console.log(quakeData)
    

    await browser.close()
}

main()