import fs from "node:fs";
import Logger from "../misc/loggger.js";

export default class read_assets {
  static Logger = new Logger("read_assets", "read_assets");

  static _tokenPath = "../assets/privacypass.token";
  static _indeedLinks = "../assets/indeed_custom_review_links.txt";

  public static read_Links() {
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
    }
  }

  public static read_Tokens() {
    this.Logger.info('Loading privacy pass token ... ')
    try{
      let tokens = JSON.parse(fs.readFileSync(this._tokenPath).toString());
      if (tokens.length === 0) throw new Error("Token File Empty ... " + this._tokenPath);
      
      const token = JSON.parse(tokens.shift());
      
      fs.unlinkSync(read_assets._tokenPath);
      
      fs.writeFileSync(read_assets._tokenPath, JSON.stringify(tokens, null, 2));
      
      this.Logger.info('Loaded Token Succesfuly ... ')

      return token;

    }catch(error){
        if (error instanceof Error) {
          this.Logger.error("Failed to Load Privacy Pass token ... ");
          this.Logger.error(error.message);
        }
    }
  }
}
