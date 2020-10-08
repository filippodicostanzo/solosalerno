export interface Data {
    baseUrl: string;
    perPage: string;
    wpFetchHeaders: { headers: { 'Access-Control-Expose-Headers': string; 'Access-Control-Allow-Origin': string } };
    catUrl: string;
    categories: any[];
    embed: string;
    posts: any[];
}
