"use client";

import { useState, useEffect } from "react";
import GameMenu from "../HighLow/GameMenu";
import Panels from "../HighLow/Panel";

type SteamGame = {
  id: string;
  name: string;
  release_date: string;
  genre: string;
  tags: string[];
  playerCount: number;
};

const emptygame: SteamGame = {
  id: "",
  name: "",
  release_date: "",
  genre: "",
  tags: [],
  playerCount: -1,
};

export default function HighLowPage() {
  const [score, setScore] = useState<number>(0);
  const [menuShow, setMenuShow] = useState<boolean>(false);
  const [currentGame, setCurrentGame] = useState<SteamGame>(emptygame);
  const [newGame, setNewGame] = useState<SteamGame>(emptygame);
  const [nextGame, setNextGame] = useState<SteamGame>(emptygame);
  const [bestScore, setBestScore] = useState<number>(0);
  const [isbooting, setIsBooting] = useState<boolean>(true);

  async function callApi(appID: string) {
    console.log("Start of API Call");
    const res = await fetch(`/api/player/?currentAppID=${appID}`);
    const data = await res.json();
    if (data == undefined) {
      console.log("NULL API");
    } else {
      console.log(data.gameWithCount.playerCount);
      return data.gameWithCount;
    }
  }

  useEffect(() => {
    async function fetchStartingGames() {
      setIsBooting(true);

      const game1 = await callApi("-1");
      console.log("Rand Game 1: " + game1.name);

      const game2 = await callApi(`${game1.id}`);
      console.log("Rand Game 2: " + game2.name);

      const game3 = await callApi(`${game2.id}`);
      console.log("Rand Game 3: " + game3.name);

      setCurrentGame(game1);
      setNewGame(game2);
      setNextGame(game3);

      setIsBooting(false);
    }

    fetchStartingGames();
  }, []);

  setCurrentGame;

  if (isbooting) {
    return <div className="loadingScreen">loading...</div>;
  }

  return (
    <div className="HighLowBackground">
      <Panels
        setScore={setScore}
        setMenuShow={setMenuShow}
        score={score}
        menuShow={menuShow}
        currentGame={currentGame}
        setCurrentGame={setCurrentGame}
        newGame={newGame}
        setNewGame={setNewGame}
        nextGame={nextGame}
        setNextGame={setNextGame}
        callApi={callApi}
      />
      <p className="scoreCounter">Score Counter: {score}</p>

      <GameMenu
        score={score}
        setScore={setScore}
        menuShow={menuShow}
        setMenuShow={setMenuShow}
        callApi={callApi}
        setCurrentGame={setCurrentGame}
        setNewGame={setNewGame}
        setNextGame={setNextGame}
        bestScore={bestScore}
        setBestScore={setBestScore}
      />
    </div>
  );
}
