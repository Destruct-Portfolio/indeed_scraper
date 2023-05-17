import read_assets from "../componenets/read_assets.js";
import Logger from "../misc/loggger.js";
import Indeed_scraper from "../componenets/scraper_indeed.js";
import Reviews_scraper from "../componenets/scrape_reviews.js";
import Save_data from "../componenets/save_data.js";
import fs from "node:fs";

export default class Handler {
  private Indeed_Links: string[] = [];

  constructor() {
    this.Indeed_Links = read_assets.read_Links();
    if (this.Indeed_Links.length < 1) {
      throw new Error("Please FIll up assets/indeed_custom_review_link.txt");
    }
  }

  public async exec(): Promise<void> {
    console.log("Indeed Links To be Scraped " + this.Indeed_Links.length);
    for (var i = 0; i < this.Indeed_Links.length; i++) {
      try {
        console.log(this.Indeed_Links[i]);
        await new Indeed_scraper(this.Indeed_Links[i]).exec();
        //we need to read the Reviews List
        let rev_links = read_assets.read_review_links();
        await new Reviews_scraper(rev_links).exec();
        //we need to delete the reviews file

        fs.rm("./review_Link/txt", () => {
          console.log("Deleting Temporary Files ...");
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
