export type TweetField = 'created_at' | 'text';

export interface Tweet {
  id: string;
  text: string;
  created_at: string;
}

export interface TweetSearchParams {
  query: string;
  max_results: number;
  'tweet.fields': TweetField[];
}
