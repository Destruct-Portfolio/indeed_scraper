import PuppeteerScrapper from "./puppeteer_scraper.js";
import fs from "node:fs";
import Save_data from "./save_data.js";
export default class Reviews_scraper extends PuppeteerScrapper {
    /**
     * @TODO [x] the column headings all lower case
     * @TODO [x] fix the spelling for "tittle"
     * @TODO [x] Add this URL, company, date.
     * @TODO [x] regex for the description so it will not return new lines
     * @TODO [X] compensation_benefits is returning null for some reason on some links
     * @TODO [X] find a way to replace the null situation with the comment
     */
    review_Links;
    ID;
    constructor(review_Links, ID) {
        super();
        this.review_Links = review_Links;
        this.ID = ID;
    }
    async $extract() {
        let selectors = [
            {
                key: "overall_rating",
                selector: "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-1edyzoo.eu4oa1w0 > div > button",
            },
            {
                key: "title",
                selector: "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > h1",
            },
            {
                key: "author",
                selector: "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-vktqis.eu4oa1w0 > span > a",
            },
            {
                key: "address",
                selector: "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-vktqis.eu4oa1w0 > span > a:nth-child(3)",
            },
            {
                key: "comment",
                selector: "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-rr5fiy.eu4oa1w0",
            },
            {
                key: "work_life_balance",
                selector: "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-sjjo5n.eu4oa1w0 > div > div:nth-child(2) > div > div > div",
            },
            {
                key: "compensation_benefits",
                selector: "#cmp-container > div > div > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-sjjo5n.eu4oa1w0 > div > div:nth-child(3) > div > div > div",
            },
            {
                key: "job_security_advancement",
                selector: "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-sjjo5n.eu4oa1w0 > div > div:nth-child(4) > div > div > div",
            },
            {
                key: "Management",
                selector: "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-sjjo5n.eu4oa1w0 > div > div:nth-child(5) > div > div > div",
            },
            {
                key: "Culture",
                selector: "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-sjjo5n.eu4oa1w0 > div > div:nth-child(6) > div > div > div",
            },
            {
                key: "pros_cons",
                selector: "#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-kyg8or.eu4oa1w0",
            },
        ];
        if (this.$page) {
            for (let link of this.review_Links) {
                if (!link.includes("https://")) {
                    return;
                }
                await this.$page.goto(link, { timeout: 2 * 60 * 1000, waitUntil: "networkidle2" });
                // need to do a check here
                //  fs.writeFileSync("item.jpeg", await this.$page.screenshot());
                let company_header = await this.$page
                    .waitForSelector("#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > header > div.css-1yjfwlt.eu4oa1w0 > div.css-kyg8or.eu4oa1w0")
                    .then(() => {
                    return true;
                })
                    .catch(() => {
                    return false;
                });
                if (company_header) {
                    try {
                        let review_data = await this.$page.evaluate((selectors) => {
                            let Review = {};
                            for (var i = 0; i < selectors.length; i++) {
                                Review["pros"] = "N/A";
                                Review["cons"] = "N/A";
                                const element = selectors[i];
                                switch (element.key) {
                                    case "comment":
                                        let more_button = document.querySelector("#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-rr5fiy.eu4oa1w0 > span > span:nth-child(2) > button");
                                        if (more_button === null) {
                                            Review[element.key] = document.querySelector(element.selector)
                                                ? document.querySelector(element.selector).innerText.replace(/\n/g, " ")
                                                : "N/A";
                                        }
                                        else {
                                            more_button.click();
                                            let first_part = document.querySelector(element.selector)
                                                ? document.querySelector(element.selector).innerText
                                                : "";
                                            let second_part = document.querySelector("#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-rr5fiy.eu4oa1w0 > span > span.css-1cxc9zk.e1wnkr790 > span:nth-child(2) > span")
                                                ? document.querySelector("#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-rr5fiy.eu4oa1w0 > span > span.css-1cxc9zk.e1wnkr790 > span:nth-child(2) > span").innerText
                                                : "";
                                            Review["comment"] = first_part.replace(/\n/g, " ");
                                            +" " + second_part.replace(/\n/g, " ");
                                        }
                                        break;
                                    case "pros_cons":
                                        let pros_cons_exists = document.querySelector(element.selector);
                                        if (pros_cons_exists) {
                                            let pros_cons_combined = Array.from(pros_cons_exists.querySelectorAll("div .css-1z0411s.e1wnkr790"));
                                            for (const div of pros_cons_combined) {
                                                let parent_element = div.parentElement.innerText;
                                                if (parent_element.includes("Pros")) {
                                                    Review.pros = div.innerText.toString();
                                                }
                                                else if (parent_element.includes("Cons")) {
                                                    Review.cons = div.innerText.toString();
                                                }
                                            }
                                        }
                                        else {
                                            Review.pros = "N/A";
                                            Review.cons = "N/A";
                                        }
                                        break;
                                    case "address":
                                        let _address = document.querySelector("#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-vktqis.eu4oa1w0 > span > a:nth-child(3)")
                                            ? document.querySelector("#cmp-container > div > div.dd-privacy-allow.css-kyg8or.eu4oa1w0 > main > div.css-16ydvd8.e37uo190 > div.css-1cm81qf.eu4oa1w0 > div > div:nth-child(1) > div > div > div.css-r0sr81.e37uo190 > div.css-182xdcn.eu4oa1w0 > div.css-vktqis.eu4oa1w0 > span > a:nth-child(3)").innerText
                                            : null;
                                        if (_address) {
                                            Review["city"] = _address.split(", ")[0];
                                            Review["state"] = _address.split(", ")[1];
                                        }
                                        else {
                                            Review["city"] = "N/A";
                                            Review["state"] = "N/A";
                                        }
                                        break;
                                    default:
                                        Review[element.key.toLowerCase()] = document.querySelector(element.selector)
                                            ? document.querySelector(element.selector).innerText
                                            : "N/A";
                                }
                                Review["link"] = document.URL;
                            }
                            return Review;
                        }, selectors);
                        review_data["company_id"] = this.ID;
                        this.payload.push(review_data);
                        console.log(review_data);
                        await new Save_data().save_csv({ name: "Reviews", payload: [review_data] });
                    }
                    catch (error) {
                        console.log(error);
                        fs.writeFileSync("./if_not.jpeg", await this.$page.screenshot());
                    }
                }
                else {
                    fs.writeFileSync("./if_not.jpeg", await this.$page.screenshot());
                    return;
                }
            }
        }
    }
}
