import Indeed_scraper from "./componenets/scraper_indeed.js";
import Save_data from "./componenets/save_data.js";
import Handler from "./core/handler.js";

let url = "https://www.indeed.com/cmp/US-Nursing/reviews?fjobtitle=Registered+Nurse";

// "https://indeed.com/cmp/Elderwood/reviews/do-not-care-about-employees-health-or-wellbeing?id=5efe97be911b5a22";

//await new Indeed_scraper(url).exec();

import Reviews_scraper from "./componenets/scrape_reviews.js";

let url_List = [
  "https://www.indeed.com/cmp/US-Nursing/reviews/rapid-response-healthcare-staffing-therefore-inconsistent-opportunities-available-however-when-opportunities-avail-themselves-this-company-does-is-go?id=9d77dfffabd60a7e",
  "https://www.indeed.com/cmp/Rnnetwork/reviews/lies?id=535d87c48522a2cb",
  "https://www.indeed.com/cmp/Rnnetwork/reviews/creditialing?id=7ce67e43fd6178f2",
  "https://www.indeed.com/cmp/Rnnetwork/reviews/productive?id=57be90e4141b4767",
  "https://www.indeed.com/cmp/Rnnetwork/reviews/horrible-people-that-doesn-t-care-about-their-staff?id=ddc2259b0cb81477",
];

await new Handler().exec();
//await new Reviews_scraper(url_List).exec();
