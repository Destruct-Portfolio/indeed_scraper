import Logger from "../misc/loggger.js";
//import DatabaseManager from "../db/final_index.js";
import fs from "node:fs";
let config = JSON.parse(fs.readFileSync("../assets/config.json").toString());
export default class Handler {
    _Logger = new Logger("handler", "Index");
    Indeed_Links = [];
    config;
    //private DB_Manager: DatabaseManager;
    constructor(config) {
        this.config = config;
        // this.DB_Manager = new DatabaseManager({ host, password, username, database_name, query_company, query_reviews });
    }
    async exec() {
        this.Indeed_Links.pop();
        this._Logger.info("Indeed Links to scrape " + this.Indeed_Links.length);
        //  this.DB_Manager = new this.DB_Manager(this.config);
        //this.DB_Manager.Connection();
        for (var i = 0; i < this.Indeed_Links.length; i++) {
            try {
                this._Logger.info("Scraping " + this.Indeed_Links[i]);
                //let company = await new Indeed_scraper(this.Indeed_Links[i]).exec();
                let company = {
                    work_lifebalance: "3.5",
                    pay_benefits: "3.9",
                    jobsecurity_advancement: "3.1",
                    management: "3.6",
                    culture: "3.8",
                    company_name: "US Nursing ",
                    company: "US-Nursing",
                    company_url: "https://www.indeed.com/cmp/US-Nursing/reviews?fjobtitle=Registered+Nurse ",
                    overall_rating: "3.8",
                };
                console.log(company);
                if (company !== null) {
                    let query_company = `CREATE TABLE IF NOT EXISTS company (
            id INT AUTO_INCREMENT PRIMARY KEY,
            work_life_balance VARCHAR(255),
            compensation_benefits VARCHAR(255),
            job_security_advancement VARCHAR(255),
            management VARCHAR(255),
            culture VARCHAR(255),
            company VARCHAR(255),
            company_url VARCHAR(255),
            company_name VARCHAR(255),
            overall_rating VARCHAR(255)
            )`;
                    let query_reviews = `CREATE TABLE IF NOT EXISTS reviews (
            id INT AUTO_INCREMENT PRIMARY KEY,
            pros VARCHAR(4048),
            cons VARCHAR(4048),
            overall_rating TEXT,
            link TEXT,
            title TEXT,
            author TEXT,
            city TEXT,
            state TEXT,
            comment TEXT,
            work_life_balance TEXT,
            compensation_benefits TEXT,
            job_security_advancement TEXT,
            Management TEXT,
            Culture TEXT
            )`;
                    console.log("we are Here ... ");
                    /*  let db_handler = new DB({
                      host: "localhost",
                      password: "123456789aaAA@@",
                      user: "root",
                      database_name: "WWW",
                    });
                    db_handler
                      .InitializeDatabase(query_company, query_reviews)
                      .then(() => {
                        db_handler.PushCompany(company);
                      })
                      .catch(() => {});*/
                }
                /*
                let rev_links = read_assets.read_review_links();
        
                await new Reviews_scraper(rev_links).exec();
                //we need to delete the reviews file
        
                fs.rm("./review_Link/txt", () => {
                  console.log("Deleting Temporary Files ...");
                });
                  */
                // saving up to db
            }
            catch (error) {
                if (error instanceof Error) {
                    this._Logger.error(error.message);
                }
                console.log(error);
            }
        }
        process.exit(0);
    }
}
