import mysql from "mysql";
class DatabaseManager {
    connection;
    constructor() {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "123456789aaAA@@",
            database: "your_database",
        });
    }
    createDatabaseIfNotExists() {
        const query = `CREATE DATABASE IF NOT EXISTS your_database;`;
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
    createTableIfNotExists() {
        const query = `
      CREATE TABLE IF NOT EXISTS your_table (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        age INT
      );`;
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
    insertData(name, age) {
        const query = `INSERT INTO your_table (name, age) VALUES (?, ?);`;
        return new Promise((resolve, reject) => {
            this.connection.query(query, [name, age], (error, results) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(results.insertId);
                }
            });
        });
    }
    async initializeDatabase() {
        return this.createDatabaseIfNotExists()
            .then(() => this.connection.changeUser({ database: "your_database" }))
            .then(() => this.createTableIfNotExists());
    }
    closeConnection() {
        this.connection.end();
    }
}
// Example usage:
const dbManager = new DatabaseManager();
dbManager
    .initializeDatabase()
    .then(() => dbManager.insertData("John Doe", 25))
    .then((insertId) => {
    console.log(`Data inserted with ID: ${insertId}`);
    dbManager.closeConnection();
})
    .catch((error) => {
    console.error("An error occurred:", error);
    dbManager.closeConnection();
});
