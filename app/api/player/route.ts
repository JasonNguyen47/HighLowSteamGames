import { games } from "../../../lib/game";
// import steamGamesData from "../../../lib/steamGames.json";
import filteredSteamGames from "../../../lib/filteredSteamGames.json";

type SteamGame = {
  id: string;
  name: string;
  release_date: string;
  genre: string;
  tags: string[];
};

const steamGames = filteredSteamGames as SteamGame[];

export async function GET(request: Request) {
  let newNum: number;
  let currentAppID = new URL(request.url).searchParams.get("currentAppID");

  do {
    newNum = Math.floor(Math.random() * steamGames.length + 1);
  } while (steamGames[newNum].id == currentAppID);

  const randGame = steamGames[newNum];

  const res = await fetch(
    `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${randGame.id}`
  );
  const data = await res.json();

  const gameWithCount = {
    ...randGame,
    playerCount: data.response.player_count,
  };

  return Response.json({ gameWithCount });
}
