import Indeed_scraper from "./componenets/scraper_indeed.js";
import Save_data from "./componenets/save_data.js";

let url =
  "https://indeed.com/cmp/Elderwood/reviews/do-not-care-about-employees-health-or-wellbeing?id=5efe97be911b5a22";

//await new Indeed_scraper(url).exec();
import Reviews_scraper from "./componenets/scrape_reviews.js"


let url_List = [
"https://www.indeed.com/cmp/Elderwood/reviews/do-not-care-about-employees-health-or-wellbeing?id=5efe97be911b5a22",
"https://www.indeed.com/cmp/Elderwood/reviews/good-pay-and-cool-place?id=de0651d14889c6c5",
"https://www.indeed.com/cmp/Elderwood/reviews/great-management-team?id=64b103450b0a0d70",
"https://www.indeed.com/cmp/Elderwood/reviews/management?id=dff90c2953b3de52"
]
await new Reviews_scraper(url_List).exec()