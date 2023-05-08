import ObjectsToCsv from "objects-to-csv";
import { company_header } from "../types";
import Logger from "../misc/Loger.js"
export default class Save_data {
  public static async save_company(data: company_header[]) {
    try {
      const csv = new ObjectsToCsv(data);
      await csv.toDisk("../output/company.csv");
    } catch (err) {

    }
  }
}
