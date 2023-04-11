import { ICast } from "./cast";
import { ICrew } from "./crew";

export interface IMovieCredits {
  id?: number;
  cast: ICast[];
  crew: ICrew[];
}