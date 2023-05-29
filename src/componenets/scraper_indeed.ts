import PuppeteerScrapper from "./puppeteer_scraper.js";
import fs from "node:fs";
import { company_header } from "../types";
import Save_data from "./save_data.js";

function checkNonNullValues(obj: any): boolean {
  for (const key in obj) {
    if (obj[key] === null) {
      return true;
    }
  }
  return false;
}

export default class Indeed_scraper extends PuppeteerScrapper {
  /**
   * @TODO [X] find URLs to crawl, they were all specific to "Registered Nurse"
   * @TODO [X]  [
   * "company:US Nursing",
   * "overall_rating:3.8",
   * "work_life_balance:3.5",
   * "compensation_benefits:3.9",
   * "job_security_advancement:3.1",
   * "management:3.6",
   * "culture:3.8"
   * ]
   * @TODO [X] replace the function for review page navigation with clicks instead of trying to calculate
   * @TODO [X] there is some issues with webscraping company information we need to make sure its there !
   * @TODO [X] add the company name from the website "company_name"
   * @TODO [X] check the string encoding for the strings and shit
   * @TODO [ ] needs heavy refactoring there is a lot of repetition
   */
  private indeed_link: string;

  constructor(indeed_link: string) {
    super();
    this.indeed_link = indeed_link;
  }

  protected async $extract(): Promise<void> {
    try {
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
          let company_data2 = await this.$page.evaluate(() => {
            let x: any = {};
            let Parent_Element = (document.querySelector('[data-testid="topic-filter-list"]') as HTMLElement).innerText;

            let parts = Parent_Element.split("\n");
            parts.map((item, index) => {
              if (
                item === "Work-Life Balance" ||
                item === "Pay & Benefits" ||
                item === "Job Security & Advancement" ||
                item === "Management" ||
                item === "Culture"
              ) {
                x[item.replace(/[^a-zA-Z0-9_]/g, "_").toLowerCase()] = parts[index - 1];
              }
            });

            x["company_name"] = (
              document.querySelector(
                "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-1kmudnk.eu4oa1w0 > div.css-kckn0r.e37uo190 > h1"
              ) as HTMLElement
            ).innerText.split("Employee")[0];

            return x;
          });

          company_data2["company"] = this.indeed_link.split("/")[4];
          company_data2["url"] = this.indeed_link;
          company_data2["overall_rating"] = await this.$page.evaluate(() => {
            return (document.querySelector('[data-tn-component="rating-histogram"]') as HTMLElement)
              ? (document.querySelector('[data-tn-component="rating-histogram"]') as HTMLElement).innerText.split(
                  "\n"
                )[1]
              : null;
          });

          await new Save_data().save_csv({ name: "company", payload: [company_data2] });
          let NextPage = await this.$exists(
            "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div.cmp-ReviewsList > nav > ul > li:nth-child(3) > a"
          );

          if (NextPage) {
            while (NextPage) {
              // scrape existing reviews on the page
              let reviews_Links = await this.$page.evaluate(() => {
                let links = Array.from(document.querySelectorAll("h2 > a")).map((review) => {
                  return (review as HTMLAnchorElement).href;
                });
                return links;
              });
              //  console.log(reviews_Links);
              new Save_data().save_review_links(reviews_Links);
              // we check if there is a next page
              let NextPage_still_exists = await this.$exists(
                "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div.cmp-ReviewsList > nav > ul > li:nth-child(3) > a"
              );
              if (NextPage_still_exists) {
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
            new Save_data().save_review_links(reviews_Links);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
