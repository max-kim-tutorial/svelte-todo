import axios from "axios";
// import { pluck, reduce, tab } from "rxjs/operators";
// import { ajax } from "rxjs/ajax";

// function createXHR() {
//   return new XMLHttpRequest();
// }

// export const getMovies = () =>
//   ajax({
//     url: "https://yts.mx/api/v2/list_movies.json",
//     crossDomain: true,
//     createXHR: function () {
//       return new XMLHttpRequest();
//     },
//   })
//     .pipe(pluck("response"))
//     .subscribe(
//       (res) => res,
//       (err) => {
//         throw Error("에러남", err);
//       }
//     );

export const getMovies = async () => {
  try {
    const { data } = await axios.get("https://yts.mx/api/v2/list_movies.json");
    console.log(data.data);
    return data.data;
  } catch (e) {
    console.error(e);
  }
};
