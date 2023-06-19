import mysql from "mysql";
import fs from "node:fs";
import read_assets from "../componenets/read_assets.js";
/**
 *  "data_base_name": "testingDB",
    "host": "",
    "user": "",
    "password": "",
    "company_table_name": "companies",
    "review_table_name": "reviews"
 */
export default class DatabaseManager {
    connection;
    constructor(config) {
        this.connection = mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
        });
    }
    async initializeDatabase(database, query) {
        return this.createDatabaseIfNotExists(database)
            .then(() => this.connection.changeUser({ database }))
            .then(() => this.createTableIfNotExists(query));
    }
    createTableIfNotExists(query) {
        return new Promise((resolve, reject) => {
            this.connection.query(query, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }
    createDatabaseIfNotExists(databaseName) {
        const query = `CREATE DATABASE IF NOT EXISTS ${databaseName};`;
        return new Promise((resolve, reject) => {
            this.connection.query(query, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }
    closeConnection() {
        this.connection.end();
    }
    insertData_company(data, table) {
        const insertQuery = `INSERT INTO ${table} (
      work_life_balance,
      compensation_benefits,
      job_security_advancement,
      management,
      culture,
      company,
      url,
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
        this.connection.query(insertQuery, [values], (error, results) => {
            if (error) {
                console.error("Error inserting data into the table: ", error);
            }
            else {
                console.log("Data inserted successfully.");
            }
        });
    }
    insertData_reviews(data, table) {
        const sql = `INSERT INTO ${table} (
        pros,
        cons,
        overall_rating,
        link, title, author,
        city,
        state,
        comment,
        work_life_balance,
        compensation_benefits,
        job_security_advancement,
        Management,
        Culture
        ) VALUES ?`;
        const values = data.map((Review) => [
            Review.Culture,
            Review.pros,
            Review.Management,
            Review.author,
            Review.city,
            Review.comment,
            Review.compensation_benefits,
            Review.cons,
            Review.job_security_advancement,
            Review.link,
            Review.overall_rating,
            Review.state,
            Review.title,
            Review.work_life_balance,
        ]);
        console.log(values);
        this.connection.query(sql, [values], (error, results) => {
            if (error) {
                console.error("Error inserting data into the table: ", error);
            }
            else {
                console.log("Data inserted successfully.");
            }
        });
    }
}
console.log(`[+] Loading Companies and Reviews Files ... `);
let companies = await read_assets.read_company_csv("../../output/company.csv");
let reviews = await read_assets.read_company_csv("../../output/Reviews.csv");
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
const company_manager = new DatabaseManager(config);
company_manager
    .initializeDatabase(config.data_base_name, company_query)
    .then(() => {
    company_manager.insertData_company(companies, config.company_table_name);
    company_manager.insertData_reviews(reviews, config.review_table_name);
})
    .catch((errors) => {
    config.reviews_table_name;
    console.log(errors);
    //    company_manager.closeConnection();
})
    .finally(() => {
    // company_manager.closeConnection();
});
console.log(`[+] Start Sending Data for Reviews`);
/*
const reviews_manager = new DatabaseManager(config);

const review_query = `CREATE TABLE reviews (
  id INT(11) NOT NULL AUTO_INCREMENT,
  pros TEXT NOT NULL,
  cons TEXT NOT NULL,
  overall_rating VARCHAR(255),
  link VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  author VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  comment,
  work_life_balance VARCHAR(255),
  compensation_benefits VARCHAR(255),
  job_security_advancement VARCHAR(255),
  Management VARCHAR(255),
  Culture VARCHAR(255),
  PRIMARY KEY (id)
)`;

reviews_manager
  .initializeDatabase(config.data_base_name, review_query)
  .then(() => {
    reviews_manager.insertData_reviews(reviews, config.reviews_table_name);
  })
  .catch((errors) => {
    console.log(errors);
  })
  .finally(() => {
    company_manager.closeConnection();
  });
*/
