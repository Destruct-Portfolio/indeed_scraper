import mysql from "mysql2/promise";
import { convertToObject } from "typescript";

export default class DB_Manager {
  private connection: mysql.Connection | null;

  constructor() {
    this.connection = null;
  }

  private async InitializeConnection(host: string, username: string, password: string) {
    this.connection = await mysql.createConnection({
      host,
      user: username,
      password,
    });
  }

  public closeConnection(): void {
    this.connection!.end();
  }

  // need to fix the any HERE ASAP
  private async createDatabaseIfNotExists(databaseName: string): Promise<void> {
    const query = `CREATE DATABASE IF NOT EXISTS ${databaseName};`;
    await this.connection!.query(query);
    await this.connection?.changeUser({ database: databaseName });
  }

  private async CreateCompanyTableIfNotExists() {
    let query_company = `CREATE TABLE IF NOT EXISTS company (
    id INT AUTO_INCREMENT PRIMARY KEY,
    work_life_balance TEXT,
    compensation_benefits TEXT,
    job_security_advancement TEXT,
    management TEXT,
    culture TEXT,
    company_name TEXT,
    company TEXT,
    company_url TEXT,
    overall_rating TEXT 
    )`;

    await this.connection!.query(query_company);
  }

  public async Setup(host: string, username: string, password: string) {
    try {
      await this.InitializeConnection(host, username, password);
      await this.createDatabaseIfNotExists("indeed");
      await this.CreateCompanyTableIfNotExists();
      await this.createReviewTableIfNotExists();
    } catch (error) {
      console.log(error);
    }
  }

  public async push_Company(company: any) {
    let query = `INSERT INTO company (
        work_life_balance,
        compensation_benefits,
        job_security_advancement,
        management,
        culture,
        company_name,
        company,
        company_url,
        overall_rating
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    let values: string[] = [];
    for (const key in company) {
      // need to add a condition HERE TO CHECK IF THE RESULT HAS ANY NULL / undefined things
      values.push(company[key].trim());
    }
    try {
      let [result] = await this.connection!.query(query, values);
      // @ts-ignore
      let ID = result.insertId;
      return ID;
    } catch (error) {
      console.log(error);
    }
  }

  private async createReviewTableIfNotExists() {
    let query = `CREATE TABLE IF NOT EXISTS review (
      id INT AUTO_INCREMENT PRIMARY KEY,
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
    management TEXT,
    culture TEXT,
    pros TEXT ,
    cons TEXT ,
    company_id INT
    );`;

    await this.connection!.query(query);
  }

  public async push_Reviews(Reviews: {}[]) {
    let values: string[] = [];
    let query = `INSERT INTO review (
      overall_rating,
      link,
      title,
      author,
      city,
      state,
      comment,
      work_life_balance,
      compensation_benefits,
      job_security_advancement,
      management,
      culture,
      pros,
      cons,
      company_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    Reviews.map(async (review: {}) => {
      let x: string[] = [];
      for (const key in review) {
        //@ts-ignore
        x.push(review[key]);
      }
      await this.connection!.query(query, x);
    });
  }
}
