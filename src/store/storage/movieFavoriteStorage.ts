import { IMovie } from '../types/movie';

const LOCAL_STORAGE_KEY = 'hmdbLocalStorage';

export function getFavoriteMovies() {
    return new Promise<{ response: IMovie[] }>((resolve) => {
        const persistedState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");
        if(!persistedState.favoriteMovies) {
            persistedState.favoriteMovies = [];
        }

        resolve({ response: persistedState.favoriteMovies });
    });
};

export function favoriteMovie(request: IMovie) {
    return new Promise<{ response: IMovie[] }>((resolve) => {
        const persistedState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");
        if(!persistedState.favoriteMovies) {
            persistedState.favoriteMovies = [];
        }

        var found = persistedState.favoriteMovies.filter(function(m: IMovie) { return m.id === request.id; });
        if(found.length > 0) {
            resolve({ response: persistedState.favoriteMovies });
        } else {
            persistedState.favoriteMovies.push(request);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(persistedState));
            resolve({ response: persistedState.favoriteMovies });
        }
    });
};

export function unfavoriteMovie(request: IMovie) {
    return new Promise<{ response: IMovie[] }>((resolve) => {
        const persistedState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");
        if(!persistedState.favoriteMovies) {
            persistedState.favoriteMovies = [];
        }

        var removedState = persistedState.favoriteMovies.filter(function(m: IMovie) { return m.id !== request.id; });
        persistedState.favoriteMovies = removedState;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(persistedState));
        resolve({ response: persistedState.favoriteMovies });
    });
};

export function isFavoriteMovie(request: IMovie) {
    return new Promise<{ isFavorite: boolean }>((resolve) => {
        const persistedState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");
        if(!persistedState.favoriteMovies) {
            persistedState.favoriteMovies = [];
        }

        var found = persistedState.favoriteMovies.filter(function(m: IMovie) { return m.id === request.id; });
        
        if(found.length > 0) {
            resolve({ isFavorite: true });
        } else {
            resolve({ isFavorite: false });
        }
    });
};