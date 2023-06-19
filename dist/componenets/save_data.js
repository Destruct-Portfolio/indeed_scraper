import ObjectsToCsv from "objects-to-csv";
import fs from "node:fs";
import Logger from "../misc/loggger.js";
class Save_data {
    save_review_links(review_Links) {
        const stream = fs.createWriteStream("../output/review_Links.txt", { flags: "a" });
        review_Links.forEach((str) => {
            stream.write(str + "\n");
        });
        stream.end();
    }
    static #Logger = new Logger("save_data", "save_data");
    save_reviews(reviews) {
        throw new Error("Method not implemented.");
    }
    async save_csv(arg1) {
        const { name, payload } = arg1;
        Save_data.#Logger.info("saving company information to csv ... ");
        try {
            const csv = new ObjectsToCsv(payload);
            await csv.toDisk(`../output/${name}.csv`, { append: true });
            Save_data.#Logger.info("saving finished succsufully ... ");
        }
        catch (err) {
            if (err instanceof Error) {
                Save_data.#Logger.error("failed to save company information ... ");
                Save_data.#Logger.error(err.message);
            }
        }
    }
    writeLineToTopOfFile(filePath, line) {
        try {
            const fileContents = fs.readFileSync(filePath, "utf-8");
            const updatedContent = line + "\n" + fileContents;
            fs.writeFileSync(filePath, updatedContent, "utf-8");
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to write line to the top of the file: ${error.message}`);
            }
        }
    }
}
export default Save_data;
