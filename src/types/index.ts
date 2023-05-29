export interface company_header {
  name: string | null;
  wellbeing: string | null;
  jobs: string | null;
  reviews: string | null;
  salaries: string | null;
  stars: string | null;
}

export interface save_csv {
  name: string;
  payload: any[];
}

export interface save_data {
  save_csv(arg1: save_csv): Promise<void>;
  save_reviews(reviews: any[]): Promise<void>;
  save_review_links(review_Links: string[]): void;
}

export interface DB_Creds {
  host: string;
  user: string;
  password: string;
}

export interface DB_Details {
  data_base_name: string;
  table_name: string;
  table_description: string;
}

export interface Review {
  management: any;
  pros: string;
  cons: string;
  overall_rating: string | null;
  link: string;
  title: string | null;
  author: string | null;
  city: string | null;
  state: string | null;
  comment: string | null;
  work_life_balance: string | null;
  compensation_benefits: string | null;
  job_security_advancement: string | null;
  culture: string | null;
}

export interface Company {
  work_life_balance: string | null;
  compensation_benefits: string | null;
  job_security_advancement: string | null;
  management: string | null;
  culture: string | null;
  company: string | null;
  url: string | null;
  overall_rating: string | null;
}
