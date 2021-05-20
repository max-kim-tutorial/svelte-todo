import { writable, readable } from "svelte/store";
import { getMovies } from "~/core/api";

// 비즈니스 로직 은닉
export const movieStore = (() => {
  const { subscribe, set, update } = writable({
    data: [],
  });

  return {
    subscribe,
    getMovie: async () => {
      const movieList = await getMovies();
      // return movieList;
      set({ data: movieList.movies });
    },
  };
})();
