import Indeed_scraper from "./componenets/scraper_indeed.js";
import Save_data from "./componenets/save_data.js";

let url =
  "https://indeed.com/cmp/Elderwood/reviews/do-not-care-about-employees-health-or-wellbeing?id=5efe97be911b5a22";

await new Indeed_scraper(url).exec();
