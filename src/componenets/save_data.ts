import ObjectsToCsv from "objects-to-csv";
import fs from "node:fs";

import Logger from "../misc/loggger.js";

import { company_header, save_data } from "../types";

export default class Save_data implements save_data {
  save_review_links(review_Links: string[]): void {
    fs.writeFileSync("../output/review_Links.txt", review_Links.toString(), { flag: "a" });
  }

  static #Logger = new Logger("save_data", "save_data");

  save_reviews(reviews: any[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async save_company(companyInformation: company_header[]): Promise<void> {
    Save_data.#Logger.info("saving company information to csv ... ");
    try {
      const csv = new ObjectsToCsv(companyInformation);
      await csv.toDisk("../output/company.csv", { append: true });
      Save_data.#Logger.info("saving finished succsufully ... ");
    } catch (err) {
      if (err instanceof Error) {
        Save_data.#Logger.error("failed to save company information ... ");
        Save_data.#Logger.error(err.message);
      }
    }
  }
}
