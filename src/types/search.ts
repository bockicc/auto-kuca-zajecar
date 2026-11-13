export type SearchResultType = "vehicle" | "page" | "faq";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  href: string;
  keywords: string;
}

export interface SearchGroup {
  type: SearchResultType;
  label: string;
  results: SearchResult[];
}
