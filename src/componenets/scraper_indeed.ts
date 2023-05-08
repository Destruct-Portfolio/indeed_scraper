import PuppeteerScrapper from "./puppeteer_scraper.js";
import fs from "node:fs";
import { company_header } from "../types";

export default class Indeed_scraper extends PuppeteerScrapper {
  private indeed_link: string;
  private comany_selectors = [
    {
      key: "name",
      selector:
        "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > header > div.css-1yjfwlt.eu4oa1w0 > div.css-kyg8or.eu4oa1w0 > div > div > div > div.css-16dv56u.eu4oa1w0 > div.css-1ce69ph.eu4oa1w0 > div.css-12f7u05.e37uo190 > div.css-1e5qoy2.e37uo190 > div > div",
    },
    {
      key: "wellbeing",
      selector:
        "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > header > div.css-1yjfwlt.eu4oa1w0 > div.css-kyg8or.eu4oa1w0 > div > div > div > div.css-16dv56u.eu4oa1w0 > div.css-1ce69ph.eu4oa1w0 > div.css-12f7u05.e37uo190 > div.css-1dk5aj.e37uo190 > div > div.css-1f31fgx.e37uo190 > span",
    },
    {
      key: "stars",
      selector:
        "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > header > div.css-1yjfwlt.eu4oa1w0 > div.css-kyg8or.eu4oa1w0 > div > div > div > div.css-16dv56u.eu4oa1w0 > div.css-1ce69ph.eu4oa1w0 > div.css-12f7u05.e37uo190 > div.css-1dk5aj.e37uo190 > div > div.css-8l8558.e37uo190 > span.css-htn3vt.e1wnkr790",
    },
    { key: "jobs", selector: "#cmp-skip-header-desktop > div > ul > li:nth-child(3) > a > div" },
    { key: "reviews", selector: "#cmp-skip-header-desktop > div > ul > li.css-hykvqz.eu4oa1w0 > a > div" },
    { key: "salaries", selector: "#cmp-skip-header-desktop > div > ul > li:nth-child(5) > a > div" },
  ];

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
        fs.writeFileSync("test.jpeg", await this.$page.screenshot());
        let company_information: company_header = await this.$page.evaluate((selectors) => {
          let DATA: any = {};
          for (let index = 0; index < selectors.length; index++) {
            const element = selectors[index];
            DATA[element.key] = (document.querySelector(element.selector) as HTMLElement).innerText;
          }
          return DATA;
        }, this.comany_selectors);

        //www.indeed.com/cmp/Elderwood/reviews
        console.log(company_information);

        //console.log("waiting for navigation is over now ");
        // getting all Links >>> need to add check to see if the page is loaded Properly

        let tps = eval(company_information.reviews) % 20;
        console.log(tps);

        let reviewsonpage = 0;
        for (var i = 0; tps; i++) {
          console.log(reviewsonpage);
          if (reviewsonpage > eval(company_information.reviews)) {
            break;
          }
          await this.$page.goto("https://www.indeed.com/cmp/Elderwood/reviews?fcountry=ALL&start=" + reviewsonpage, {
            timeout: 0,
            waitUntil: "networkidle2",
          });

          fs.writeFileSync("after_thin.jpeg", await this.$page.screenshot());
          console.log(this.$page.url());
          let review_Links = await this.$page.evaluate(() => {
            return Array.from(document.querySelectorAll("h2 > a")).map((review) => {
              return (review as HTMLAnchorElement).href;
            });
          });
          console.log(review_Links);
          reviewsonpage = reviewsonpage + 20;
        }
      }
    }
  }
}
