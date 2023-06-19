import mysql from "mysql";
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789aaAA@@",
    //database: "sys",
});
// THis Is A connection
connection.connect(function (err) {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to database.");
});
const databaseName = "Hello";
const createDatabaseQuery = `CREATE DATABASE ${databaseName}`;
// THIS IS HOW WE CREATE A DB
/*connection.query(createDatabaseQuery, (err, results) => {
  if (err) {
    console.error("Error creating database: " + err.stack);
    return;
  }

  console.log(`Database '${databaseName}' created successfully.`);
});*/
//const databaseName = "your_database_name";
// Query to check if a db exists
const checkDatabaseQuery = `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${databaseName}'`;
connection.query(checkDatabaseQuery, (err, results) => {
    if (err) {
        console.error("Error checking database existence: " + err.stack);
        return;
    }
    if (results.length > 0) {
        console.log(`Database '${databaseName}' already exists.`);
    }
    else {
        console.log(`Database '${databaseName}' does not exist.`);
    }
});
class DB_HAndler {
    /**
     * @INFO need to change the any
     */
    data_base_name;
    table_name;
    table_description;
    data = [];
    mysql_connection;
    db_creds;
    constructor(DB_HAndler, db_creds) {
        (this.data_base_name = DB_HAndler.data_base_name),
            (this.table_name = DB_HAndler.table_name),
            (this.table_description = DB_HAndler.table_description);
        this.mysql_connection = null;
        this.db_creds = db_creds;
    }
    async connection() {
        this.mysql_connection = mysql.createConnection(this.db_creds);
        this.mysql_connection.connect((err) => {
            if (err instanceof Error)
                throw new Error(err.message);
        });
    }
    async setup() {
        // need to check for the DB NAME
        this.mysql_connection.query(checkDatabaseQuery, (err, results) => {
            if (err) {
                console.error("Error checking database existence: " + err.stack);
                return;
            }
            if (results.length > 0) {
                console.log(`Database '${databaseName}' already exists.`);
            }
            else {
                console.log(`Database '${databaseName}' does not exist.`);
            }
        });
        // create the DB NAME
        // create the TABLE
        // create
    }
    async to_db() {
        // we need to send the data_to_db
    }
    async exec() {
        await this.connection();
    }
}
