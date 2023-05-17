import PuppeteerScrapper from "./puppeteer_scraper.js";
import fs from "node:fs";
import { company_header } from "../types";
import Save_data from "./save_data.js";

export default class Indeed_scraper extends PuppeteerScrapper {
  /**
   * @TODO [ ] find URLs to crawl, they were all specific to "Registered Nurse"
   * @TODO [X]  [
   * "company:US Nursing",
   * "overall_rating:3.8",
   * "work_life_balance:3.5",
   * "compensation_benefits:3.9",
   * "job_security_advancement:3.1",
   * "management:3.6",
   * "culture:3.8"
   * ]
   * @TODO [ ] replace the function for review page navigation with clicks instead of trying to calculate
   */
  private indeed_link: string;
  private comany_selectors = [
    {
      key: "company",
      selector:
        "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > header > div.css-1yjfwlt.eu4oa1w0 > div.css-kyg8or.eu4oa1w0 > div > div > div > div.css-16dv56u.eu4oa1w0 > div.css-1ce69ph.eu4oa1w0 > div.css-12f7u05.e37uo190 > div.css-1e5qoy2.e37uo190 > div > div",
    },
    {
      key: "overall_rating",
      selector:
        "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > header > div.css-1yjfwlt.eu4oa1w0 > div.css-kyg8or.eu4oa1w0 > div > div > div > div.css-16dv56u.eu4oa1w0 > div.css-1ce69ph.eu4oa1w0 > div.css-12f7u05.e37uo190 > div.css-1dk5aj.e37uo190 > div > span.css-htn3vt.e1wnkr790",
    },
    {
      key: "Work_Life_Balance",
      selector:
        "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-ypgzzu.eu4oa1w0 > div:nth-child(3) > div:nth-child(5) > div:nth-child(1) > div > div",
    },
    {
      key: "componsation_benfit",
      selector:
        "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-ypgzzu.eu4oa1w0 > div:nth-child(3) > div:nth-child(5) > div:nth-child(2) > div > div",
    },
    {
      key: "Job_Security_Advancement",
      selector:
        "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-ypgzzu.eu4oa1w0 > div:nth-child(3) > div:nth-child(5) > div:nth-child(3) > div > div",
    },
    {
      key: "Management",
      selector:
        "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-ypgzzu.eu4oa1w0 > div:nth-child(3) > div:nth-child(5) > div:nth-child(4) > div > div",
    },
    {
      key: "Culture",
      selector:
        "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-ypgzzu.eu4oa1w0 > div:nth-child(3) > div:nth-child(5) > div:nth-child(5) > div > div",
    },
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
        await this.$exists("");
        let company_information: company_header = await this.$page.evaluate((selectors) => {
          let DATA: any = {};
          for (let index = 0; index < selectors.length; index++) {
            const element = selectors[index];
            DATA[element.key] = (document.querySelector(element.selector!) as HTMLElement)
              ? (document.querySelector(element.selector!) as HTMLElement).innerText
              : null;
          }
          return DATA;
        }, this.comany_selectors);

        console.log(company_information);
        await new Save_data().save_csv({ name: "company", payload: [company_information] });

        let reviews_count = await this.$page.$eval(
          "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div.css-13i2c0o.eu4oa1w0 > div.css-r5p2ca.eu4oa1w0 > span > b",
          (el) => {
            return el.innerText;
          }
        );

        let NextPage = await this.$exists(
          "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div.cmp-ReviewsList > nav > ul > li:nth-child(3) > a"
        );
        console.log("[+] Next Page exists === " + NextPage);

        if (NextPage) {
          while (NextPage) {
            // scrape existing reviews on the page
            let reviews_Links = await this.$page.evaluate(() => {
              let links = Array.from(document.querySelectorAll("h2 > a")).map((review) => {
                return (review as HTMLAnchorElement).href;
              });
              return links;
            });
            console.log(reviews_Links);
            new Save_data().save_review_links(reviews_Links);
            // we check if there is a next page
            let NextPage_stil_exists = await this.$exists(
              "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div.cmp-ReviewsList > nav > ul > li:nth-child(3) > a"
            );
            if (NextPage_stil_exists) {
              let link = await this.$page.evaluate(() => {
                return (
                  document.querySelector(
                    "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div.cmp-ReviewsList > nav > ul > li:nth-child(3) > a"
                  ) as HTMLAnchorElement
                ).href;
              });
              await this.$page.goto(link, { timeout: 0, waitUntil: "networkidle2" });
            } else {
              NextPage = false;
            }
          }
        } else {
          let reviews_Links = await this.$page.evaluate(() => {
            let links = Array.from(document.querySelectorAll("h2 > a")).map((review) => {
              return (review as HTMLAnchorElement).href;
            });
            return links;
          });
          await new Save_data().save_review_links(reviews_Links);
        }
      }
    }
  }
}
