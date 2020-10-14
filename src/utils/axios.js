import axios from "axios"

const request = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "ca2fe80b6a6b1e50a889d7b5cbc6ed97",
        language: "ko-KR"
    }
});

export const movieApi = {
    nowPlaying: () => request.get("/movie/now_playing"),
    popular: () => request.get("/movie/popular"),
    upComing: () => request.get("/movie/upcoming"),
    movieDetail: (id) => request.get(`/movie/${id}`, {
        params: {append_to_response: "videos"}
    }),
    search: (keyword) => request.get("/search/movie", {
        params: {query: keyword}
    })
}