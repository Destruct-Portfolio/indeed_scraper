"use strict";
/*import { config } from "../types/index.js";
import DatabaseManager from "./final_index.js";

export default class db_handler {
  private Reviews: any[];
  private Company: any;

  constructor(Reviews: any, company: any) {
    this.Reviews = Reviews;
    this.Company = company;
  }

  public async exec(config: config) {
    console.log("Starting Saving To Database ... ");
    const db_manager = new DatabaseManager(config);
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
    pros VARCHAR(4048) ,
    cons VARCHAR(4048) ,
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
    // WE CREATE A DB
    await db_manager.createDatabaseIfNotExists(config.database_name);
    // WE INITIATE EACH ONE ALONE
    await db_manager.createTableIfNotExists(query_company);
    await db_manager.createTableIfNotExists(query_reviews);
    // we save company in db and return the ID
    let companyID = await db_manager.insertData_company([this.Company]);
    console.log("From CompanyID ==== > ");
    console.log(companyID);
  }
}
*/
