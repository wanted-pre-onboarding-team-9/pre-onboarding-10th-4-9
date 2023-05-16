export type Suggestion = string;

export interface GetSuggestionProps {
  q: string;
  page?: number;
  limit?: number;
}
