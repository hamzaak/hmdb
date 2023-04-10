import { ICompany } from "./company";
import { ICountry } from "./country";
import { IGenre } from "./genre";
import { IMovie } from "./movie";

export interface IMovieDetails extends IMovie {
    budget: number;
    genres: IGenre[];
    production_companies: ICompany[];
    production_countries: ICountry[];
    revenue: number;
    status: string;
    tagline: string;
  }