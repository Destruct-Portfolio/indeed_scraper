"use strict";
/*import mysql, { Connection } from "mysql";
import fs from "node:fs";
import { Company, Review, config } from "../types";
import read_assets from "../componenets/read_assets.js";

export default class DatabaseManager {
  private connection: mysql.Connection;

  constructor(config: config) {
    this.connection = mysql.createConnection({
      host: config.host,
      password: config.password,
      user: config.user,
    });
  }

  // Fix the ANY


  public async createDB(database: string) {}

  public async initializeDatabase(database: string): Promise<void> {
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

    return this.createDatabaseIfNotExists(database)
      .then(() => this.connection.changeUser({ database }))
      .then(() => {
        this.createTableIfNotExists(query_company);
        this.createTableIfNotExists(query_reviews);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public createTableIfNotExists(query: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.connection.query(query, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  public createDatabaseIfNotExists(databaseName: string): Promise<void> {
    const query = `CREATE DATABASE IF NOT EXISTS ${databaseName};`;
    return new Promise<void>((resolve, reject) => {
      this.connection.query(query, (error) => {
        if (error) {
          reject(error);
        } else {
          this.connection.changeUser({ database: databaseName });
          resolve();
        }
      });
    });
  }

  public closeConnection(): void {
    this.connection.end();
  }

  public async insertData_company(data: Company[]): Promise<any> {
    const insertQuery = `INSERT INTO company (
    id INT AUTO_INCREMENT PRIMARY KEY,
    work_life_balance,
    compensation_benefits,
    job_security_advancement,
    management,
    culture,
    company,
    company_url,
    company_name,
    overall_rating
    ) VALUES ?`;

    const values = data.map((company) => [
      company.work_life_balance,
      company.compensation_benefits,
      company.job_security_advancement,
      company.management,
      company.culture,
      company.company,
      company.url,
      company.overall_rating,
    ]);
    console.log(values);

    await this.connection.query(insertQuery, [values], (error, results) => {
      if (error) {
        console.error("Error inserting data into the table: ", error);
        return error;
      } else {
        console.log("Data inserted successfully.");
        console.log(results);
        return results;
      }
    });
  }

  public insertData_reviews(data: Review[], table: string) {
    const sql = `INSERT INTO ${table} (
        pros,
        cons,
        overall_rating,
        link,
        title,
        author,
        city,
        state,
        culture,
        comment,
        work_life_balance,
        compensation_benefits,
        job_security_advancement,
        management
        ) VALUES ?`;

    const values = data.map((Review) => [
      Review.pros,
      Review.cons,
      Review.overall_rating ? Review.overall_rating : "N/A",
      Review.link ? Review.link : "N/A",
      Review.title ? Review.title : "N/A",
      Review.author ? Review.author : "N/A",
      Review.city ? Review.city : "N/A",
      Review.state ? Review.state : "N/A",
      Review.culture ? Review.culture : "N/A",
      Review.comment ? Review.comment : "N/A",
      Review.work_life_balance ? Review.work_life_balance : "N/A",
      Review.compensation_benefits ? Review.compensation_benefits : "N/A",
      Review.job_security_advancement ? Review.job_security_advancement : "N/A",
      Review.management ? Review.management : "N/A",
    ]);
    console.log(values);

    this.connection.query(sql, [values], (error, results) => {
      if (error) {
        console.error("Error inserting data into the table: ", error);
      } else {
        console.log("Data inserted successfully.");
      }
    });
  }
}

/*
const company_manager = new DatabaseManager(config);
company_manager
  .initializeDatabase(config.data_base_name, company_query, review_query)
  .then(() => {
    company_manager.insertData_company(companies, config.company_table_name);
    company_manager.insertData_reviews([sampled], config.review_table_name);
  })
  .catch((errors) => {
    console.log(errors);
    //    company_manager.closeConnection();
  })
  .finally(() => {
    company_manager.closeConnection();
  });*/
/*
console.log(`[+] Loading Companies and Reviews Files ... `);
let companies = await read_assets.read_company_csv("../../output/company.csv");
let reviews = await read_assets.read_company_csv("../../output/Reviews.csv");
console.log(reviews);

console.log(`[+] Loading Config File ... `);
let config = JSON.parse(fs.readFileSync("../../assets/config.json").toString());
console.log(config);

console.log(`[+] Start Sending Data for Companies ...`);

let company_query = `
  CREATE TABLE IF NOT EXISTS ${config.company_table_name} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    work_life_balance VARCHAR(255),
    compensation_benefits VARCHAR(255),
    job_security_advancement VARCHAR(255),
    management VARCHAR(255),
    culture VARCHAR(255),
    company VARCHAR(255),
    url VARCHAR(255),
    overall_rating VARCHAR(255)
  );`;

let review_query = `CREATE TABLE IF NOT EXISTS ${config.review_table_name} (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pros VARCHAR(255),
  cons VARCHAR(255),
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
);`;

let sampled = {
  pros: "[]",
  cons: "[]",
  overall_rating: "2.0",
  link: "https://www.indeed.com/cmp/Rnnetwork/reviews/you-have-to-stay-on-top-of-recruiter?id=9384478ec5f7c242",
  title: "You have to stay on top of recruiter...",
  author: "Registered Nurse",
  city: "Greater Cleveland",
  state:
    "Found that had to frequently direct and then redirect recruiter in obtaining placements and answers.  Be careful. They ask you to pay for things up front and say they will will reimburse you sometimes over $300 up front prior to working things and when say no they continue to ask you to pay saying will be reimbursed. Say they cover expenses to get ready for the job Such as drug testing and vaccinations. Was told needed a current vaccination that had they told me 2 days earlier could have gotten at doctor office when there but as such would have had to make another appointment so while getting drug tested and fit tested was given vaccine and theythen come back and say that not covering that so they end up taking it out of paycheck.  Management is so so.  Poor turn around on answering questions answered.",
  comment: "2.0",
  work_life_balance: "2.0",
  compensation_benefits: "2.0",
  job_security_advancement: "1.0",
  management: "1.0",
  culture: "4.0",
};


*/
