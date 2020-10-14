<template>
  <div>
      <div class="d-flex flex-wrap" v-if="nowPlaying">
          <MovieText :text="'Now Playing'"></MovieText>
          <MovieLists :movieList="nowPlaying"></MovieLists>
          <MovieText :text="'Popular'"></MovieText>
          <MovieLists :movieList="popular"></MovieLists>
          <MovieText :text="'Coming soon'"></MovieText>
          <MovieLists :movieList="upComing"></MovieLists>
      </div>
  </div>
</template>

<script>
import {movieApi} from "../utils/axios"
import MovieLists from "../components/MovieLists"
import MovieText from "../components/MovieText"
import { mapMutations } from 'vuex'
export default {
    components: {
        MovieLists, MovieText
    },
    data() {
        return {
            nowPlaying: [],
            popular: [],
            upComing: []
        };
    },
    created() {
        this.SET_LOADING(true);
    },
    async mounted() {
        try {
            const {nowPlaying, popular, upComing} = movieApi;
            const requestArr = [nowPlaying, popular, upComing];
            const [now, pop, up] = await Promise.all(
                requestArr.map((li) => li().then((res) => res.data.results))
            );
            this.SET_LOADING(false);
            this.nowPlaying = now;
            this.popular = pop;
            this.upComing = up;
            console.log(this.nowPlaying);
        } catch (error) {
            console.log("데이터가 존재하지 않습니다.");
        }
    },
    methods: {
        ...mapMutations(["SET_LOADING"])
    }
}
</script>

<style>
.movie-card {
    margin: 12px;
    width: 125px;
    font-size: 12px;
    font-weight: 400;
}
.movie-card:hover{
    opacity: 0.5;
    cursor: pointer;
}
.movie-card img {
    height: 180px;
    border-radius: 8px;
}
.movie-title {
    color: #ffffff;
}
.movie-information {
    margin-top: 7px;
}
.movie-date {
    font-size: 10px;
    margin-top: 5px;
    color: #cccccc;
}
</style>