export interface company_header {
  name: string;
  wellbeing: string;
  jobs: string;
  reviews: string;
  salaries: string;
  stars: string;
}

export interface save_data {
  save_company(companyInformation: company_header[]): Promise<void>;
  save_reviews(reviews: any[]): Promise<void>;
  save_review_links(review_Links: string[]): void;
}
