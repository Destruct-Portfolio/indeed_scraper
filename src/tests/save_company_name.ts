import Save_data from "../componenets/save_data.js";
import { company_header } from "../types";

const dummy_data = [
  {
    name: "randome_name2",
    wellbeing: "14",
    stars: "156",
    jobs: "154",
    reviews: "145432",
    salaries: "15485",
  },
];

await new Save_data().save_csv({name:"dummy", payload:dummy_data});
