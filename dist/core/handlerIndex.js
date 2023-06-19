import fs from "node:fs";
import read_assets from "../componenets/read_assets.js";
import Logger from "../misc/loggger.js";
import Indeed_scraper from "../componenets/scraper_indeed.js";
import Reviews_scraper from "../componenets/scrape_reviews.js";
import DB_Manager from "../db/db_connection.js";
export default class IndexHandler {
    logger;
    Indeed_Links = [];
    constructor() {
        this.logger = new Logger("Index_Handler", "Index_Handler");
        this.Indeed_Links = [];
    }
    async exec() {
        let assets = JSON.parse(fs.readFileSync("../config.json").toString());
        console.log(assets);
        // GET the INDEED LINKS
        this.logger.info("Retrieving Indeed URLs");
        this.Indeed_Links = read_assets.read_Links();
        if (this.Indeed_Links.length === 0 || this.Indeed_Links[0] === " ") {
            return;
        }
        else {
            // Establish connection to db
            this.logger.info("Establishing DB Connection ... ");
            let _DB_Manager = await new DB_Manager();
            // Loop thru each Indeed_Link
            await _DB_Manager.Setup(assets.host, assets.user, assets.password);
            for (const Link of this.Indeed_Links) {
                if (Link !== undefined) {
                    let Company_information = await new Indeed_scraper(Link).exec();
                    // we need to send it to DB and return the ID
                    let TableID = await _DB_Manager.push_Company(Company_information);
                    let ReviewLinks = await read_assets.read_review_links();
                    let Reviews = await new Reviews_scraper(ReviewLinks, 2).exec();
                    //console.log(Reviews);
                    fs.rm("../output/review_Links.txt", () => {
                        console.log("Deleting Temporary Files ...");
                    });
                    await _DB_Manager.push_Reviews(Reviews);
                }
                else {
                    console.log(Link);
                    break;
                }
            }
            this.logger.info("Closing Down DB connection ...");
            _DB_Manager.closeConnection();
        }
    }
}
