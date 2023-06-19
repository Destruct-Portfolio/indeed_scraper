import mysql from "mysql";
class DB_Index {
    /**
     * @TODO [x] needs arguments <DB_Creds> / <DB_Details> / <DATA>
     * @TODO [x] needs to connect to the db
     * @TODO [x] needs to check if there is a db under that name if not create one
     * @TODO [ ] needs to check if the table name is there if not create one
     * @TODO [ ] needs to send the data to the database
     */
    DB_Creds;
    DB_Details;
    Data;
    mysql_connection;
    constructor(DB_Creds, DB_Details, Data) {
        this.DB_Creds = DB_Creds;
        this.DB_Details = DB_Details;
        this.Data = Data;
        this.mysql_connection = null;
    }
    connect() {
        this.mysql_connection = mysql.createConnection(this.DB_Creds);
        this.mysql_connection.connect((err) => {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
        });
        return this.mysql_connection;
    }
    CheckDbExists() {
        /**
         * This will check if there is a db with that name if not it will create it
         */
        const checkDatabaseQuery = `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${this.DB_Details.data_base_name}'`;
        this.mysql_connection.query(checkDatabaseQuery, (err, results) => {
            if (err) {
                console.error("Error checking database existence: " + err.stack);
                throw new Error(err.message);
                // reject(err); // Reject the promise with the error
            }
            else {
                if (results.length > 0) {
                    console.log(`Database '${this.DB_Details.data_base_name}' already exists.`);
                    this.mysql_connection?.query(`USE ${this.DB_Details.data_base_name}`);
                    return true;
                    //resolve(true); // Resolve the promise with true if database exists
                }
                else {
                    console.log(`Database '${this.DB_Details.data_base_name}' does not exist.`);
                    // we can create the DB RIGHT HERE
                    this.mysql_connection?.query(`CREATE DATABASE ${this.DB_Details.data_base_name}`);
                    this.mysql_connection?.query(`USE ${this.DB_Details.data_base_name}`);
                    return false;
                    //resolve(false); // Resolve the promise with false if database does not exist
                }
            }
        });
    }
    CheckTables() {
        /**
         * This will check if there are tables with the specific records or not.
         */
        // Need to check if the table exists
        const tableName = this.DB_Details.table_name;
        this.mysql_connection.query(`SHOW TABLES LIKE '${tableName}'`, (err, result) => {
            if (err) {
                console.error(`Error checking table existence: ${err.message}`);
                return;
            }
            if (result.length > 0) {
                console.log(`Table '${tableName}' already exists.`);
            }
            else {
                // Table does not exist, create it
                const createTableQuery = `CREATE TABLE ${tableName} ${this.DB_Details.table_description}`;
                this.mysql_connection?.query(createTableQuery, (err, result) => {
                    if (err) {
                        console.error(`Error creating table: ${err.message}`);
                    }
                    else {
                        console.log(`Table '${tableName}' created successfully.`);
                    }
                });
            }
        });
    }
    PUSH_DATA() { }
    async exec() {
        this.connect();
        this.CheckDbExists();
        this.CheckTables();
    }
}
new DB_Index({ host: "localhost", password: "123456789aaAA@@", user: "root" }, { data_base_name: "indeed", table_description: "", table_name: "company" }, []).exec();
