import axios from "axios";

let apiKey="254616084bec4eb19ca2792f2bdbad61";

export const fetchGames2 = () =>
    axios({
        method: 'get', //you can set what request you want to be
        url: 'https://api.rawg.io/api/games?key=' + apiKey,
        data: {},
        headers: {"Access-Control-Allow-Origin": "*"}
    }).then(({ data }) => data);

export const fetchGames = () =>
    axios
        .get("https://api.rawg.io/api/games?page_size=15&key=" + apiKey)
        .then(({ data }) => data);