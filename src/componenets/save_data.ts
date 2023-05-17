import ObjectsToCsv from "objects-to-csv";
import fs from "node:fs";
import Logger from "../misc/loggger.js";
import { save_csv } from "../types/index";
// need to fix the payload type to follow an enum

import { company_header, save_data } from "../types";

export default class Save_data implements save_data {
  save_review_links(review_Links: string[]): void {
    const stream = fs.createWriteStream("../output/review_Links.txt", { flags: "a" });
    review_Links.forEach((str) => {
      stream.write(str + "\n");
    });
    stream.end();
  }

  static #Logger = new Logger("save_data", "save_data");

  save_reviews(reviews: any[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async save_csv(arg1: save_csv): Promise<void> {
    const { name, payload } = arg1;
    Save_data.#Logger.info("saving company information to csv ... ");
    try {
      const csv = new ObjectsToCsv(payload);
      await csv.toDisk(`../output/${name}.csv`, { append: true });
      Save_data.#Logger.info("saving finished succsufully ... ");
    } catch (err) {
      if (err instanceof Error) {
        Save_data.#Logger.error("failed to save company information ... ");
        Save_data.#Logger.error(err.message);
      }
    }
  }

  public writeLineToTopOfFile(filePath: string, line: string): void {
    try {
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const updatedContent = line + "\n" + fileContents;
      fs.writeFileSync(filePath, updatedContent, "utf-8");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to write line to the top of the file: ${error.message}`);
      }
    }
  }
}
