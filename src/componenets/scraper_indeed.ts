import PuppeteerScrapper from "./puppeteer_scraper.js";
import fs from "node:fs";

export default class Indeed_scraper extends PuppeteerScrapper {
  private indeed_link: string;
  constructor(indeed_link: string) {
    super();
    this.indeed_link = indeed_link;
  }

  protected async $extract(): Promise<void> {
    if (this.$page !== null) {
      // we need to run a check to see if the  page is cloudflare protected or not
      await this.$page.goto(this.indeed_link, { timeout: 0, waitUntil: "networkidle2" });
      let company_header = await this.$page
        .waitForSelector(
          "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > header > div.css-1yjfwlt.eu4oa1w0 > div.css-kyg8or.eu4oa1w0"
        )
        .then(() => {
          return true;
        })
        .catch(() => {
          // if that didn't show means that there is the Cloud_flare //
          return false;
        });
      if (company_header) {
        let company_information = await this.$page.evaluate(() => {
          let x = document.querySelector(
            "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > header > div.css-1yjfwlt.eu4oa1w0 > div.css-kyg8or.eu4oa1w0"
          );
            return {
              name: (x!.querySelector("div.css-8ulwr5") as HTMLElement).innerText,
              work_wellbeing: (x!.querySelector("css-1vlfpkl ") as HTMLElement).innerText,
              rated :(x!)
            };
        });
      }

      //      await this.$page.setExtraHTTPHeaders(getRedemptionHeader(JSON.parse(token[8]), this.indeed_link, "GET"));
      //      await this.$page.goto(this.indeed_link);
      //      await this.$page.goto("https://bigspy.com/user/login");
    }
  }
}
