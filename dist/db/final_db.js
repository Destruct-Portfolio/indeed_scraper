import mysql from "mysql";
export default class DB {
    config;
    connection;
    database_name;
    constructor(config) {
        this.config = config;
        this.connection = mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
        });
        this.database_name = config.database_name;
    }
    createDatabaseIfNotExists() {
        const query = `CREATE DATABASE IF NOT EXISTS ${this.database_name};`;
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
    closeConnection() {
        this.connection.end();
    }
    async InitializeDatabase(query_company, query_reviews) {
        return this.createDatabaseIfNotExists()
            .then(() => this.connection.changeUser({ database: this.database_name }))
            .then(() => {
            this.createTableIfNotExists(query_company);
            this.createTableIfNotExists(query_reviews);
        })
            .catch((err) => {
            console.log(err);
        });
    }
    async PushCompany(Company) {
        const query = `INSERT INTO company (
        company.work_life_balance,
        company.compensation_benefits,
        company.job_security_advancement,
        company.management,
        company.culture,
        company.company,
        company.company_url,
        company.company_name,
        company.overall_rating
    )`;
        const value = [
            Company.work_life_balance,
            Company.pay_benefits,
            Company.job_security_advancement,
            Company.management,
            Company.culture,
            Company.company,
            Company.company_url,
            Company.company_name,
            Company.overall_rating,
        ];
        console.log(value);
        this.connection.query(query, value, (err, results) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(results);
            }
        });
    }
}
