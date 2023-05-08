import Save_data from "../componenets/save_data.js";
import { company_header } from "../types";

const dummy_data: company_header[] = [
  {
    name: "125",
    wellbeing: "1454",
    stars: "1564",
    jobs: "15453",
    reviews: "145432",
    salaries: "15485",
  },
];

await Save_data.save_company(dummy_data);
