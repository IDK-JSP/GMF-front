export interface RecipeType {
    "id" : number,
    "email" : string,
    "title" : string,
    "content" : string,
    "image" : string,
    "person"? : number,
    "state"? : string,
    "rate"? : number,
    "nb_rate"? : number,
    "create"? : string,
    "update"? : string,
}