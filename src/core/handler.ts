import read_assets from "../componenets/read_assets.js";
import Logger from "../misc/loggger.js";
import Indeed_scraper from "../componenets/scraper_indeed.js";
import Reviews_scraper from "../componenets/scrape_reviews.js";

import fs from "node:fs";

export default class Handler {
  private _Logger = new Logger("handler", "Index");
  private Indeed_Links: string[] = [];

  constructor() {
    this.Indeed_Links = read_assets.read_Links();
    if (this.Indeed_Links.length < 1) {
      this._Logger.error("Please Fill up assets/indeed_custom_review_link.txt file ... ");
      throw new Error("Please FIll up assets/indeed_custom_review_link.txt");
    }
  }

  public async exec(): Promise<void> {
    this._Logger.info("Indeed Links to scrape " + this.Indeed_Links.length);
    for (var i = 0; i < this.Indeed_Links.length; i++) {
      try {
        this._Logger.info("Scraping " + this.Indeed_Links[i]);
        await new Indeed_scraper(this.Indeed_Links[i]).exec();
        //we need to read the Reviews List
        let rev_links = read_assets.read_review_links();

        await new Reviews_scraper(rev_links).exec();
        //we need to delete the reviews file

        fs.rm("./review_Link/txt", () => {
          console.log("Deleting Temporary Files ...");
        });

        // saving to db
      } catch (error) {
        if (error instanceof Error) {
          this._Logger.error(error.message);
        }
        console.log(error);
      }
    }
    process.exit(0);
  }
}
