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
