export type Suggestion = string;

export interface SuggestionProp {
  q: string;
  page: number;
  limit: number;
  result: Suggestion[];
  qty: number;
  total: number;
}
