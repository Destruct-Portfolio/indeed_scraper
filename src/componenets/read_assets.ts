import fs from "node:fs";
import Logger from "../misc/loggger.js";
import CSV from "csv-parser";
import { Readable } from "readable-stream";

export default class read_assets {
  static Logger = new Logger("read_assets", "read_assets");
  static _tokenPath = "../assets/privacypass.token";
  static _indeedLinks = "../assets/indeed_custom_review_links.txt";
  static _reviewsLinks = "../output/review_Links.txt";
  static _companycsv = "../output/company.csv";

  public static read_Links(): string[] {
    this.Logger.info("reading Links ... ");
    try {
      const fileContents = fs.readFileSync(this._indeedLinks).toString();
      const links = fileContents.split("\n");
      this.Logger.info("Links retreived succsefully ...");
      return links;
    } catch (error) {
      if (error instanceof Error) {
        this.Logger.error("failed to Load indeed Links ...");
        this.Logger.error(error.message);
        return [];
      }
      return [];
    }
  }

  public static read_review_links(): string[] {
    this.Logger.info("reading Reviews Links ... ");
    try {
      const fileContents = fs.readFileSync(this._reviewsLinks).toString();
      const links = fileContents.split("\n");
      this.Logger.info("Links retreived succsefully ...");
      return links;
    } catch (error) {
      if (error instanceof Error) {
        this.Logger.error("failed to Load indeed Links ...");
        this.Logger.error(error.message);
        return [];
      }
      return [];
    }
  }

  public static readAndDeleteFirstLine(): string {
    try {
      const fileContents = fs.readFileSync(this._indeedLinks, "utf-8");
      const lines = fileContents.split("\n");

      if (lines.length === 0) {
        throw new Error("The file is empty.");
      }

      const firstLine = lines[0];
      lines.shift(); // Remove the first line

      const updatedContent = lines.join("\n");
      fs.writeFileSync(this._indeedLinks, updatedContent, "utf-8");

      return firstLine;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to read and delete first line from file: ${error.message}`);
      }
      throw new Error(`Failed to read and delete first line from file.`);
    }
  }

  public static read_Tokens(): any {
    this.Logger.info("Loading privacy pass token ... ");
    try {
      let tokens = JSON.parse(fs.readFileSync(this._tokenPath).toString());
      if (tokens.length === 0) throw new Error("Token File Empty ... " + this._tokenPath);

      const token = JSON.parse(tokens.shift());

      fs.unlinkSync(read_assets._tokenPath);

      fs.writeFileSync(read_assets._tokenPath, JSON.stringify(tokens, null, 2));

      this.Logger.info("Loaded Token Succesfuly ... ");

      return token;
    } catch (error) {
      if (error instanceof Error) {
        this.Logger.error("Failed to Load Privacy Pass token ... ");
        this.Logger.error(error.message);
      }
    }
  }

  public static read_company_csv(link: string): Promise<any[]> {
    const results: any[] = [];
    const fileData = fs.readFileSync(link, "utf8");

    return new Promise<any[]>((resolve, reject) => {
      const stream = new Readable();
      stream.push(fileData);
      stream.push(null);

      stream
        .pipe(CSV())
        .on("data", (data: any) => {
          results.push(data);
        })
        .on("end", () => {
          console.log(results);
          resolve(results);
        })
        .on("error", (error: any) => {
          reject(error);
        });
    });
  }
}
