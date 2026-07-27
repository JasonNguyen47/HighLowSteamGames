"use client";

import { FastAverageColor } from "fast-average-color";

type SteamGame = {
  id: string;
  name: string;
  release_date: string;
  genre: string;
  tags: string[];
  playerCount: number;
};

type PanelsProps = {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  menuShow: boolean;
  setMenuShow: React.Dispatch<React.SetStateAction<boolean>>;
  currentGame: SteamGame;
  setCurrentGame: React.Dispatch<React.SetStateAction<SteamGame>>;
  newGame: SteamGame;
  setNewGame: React.Dispatch<React.SetStateAction<SteamGame>>;
  nextGame: SteamGame;
  setNextGame: React.Dispatch<React.SetStateAction<SteamGame>>;
  callApi: (appID: string) => Promise<SteamGame>;
};

export default function Panels({
  score,
  setScore,
  menuShow,
  setMenuShow,
  currentGame,
  setCurrentGame,
  newGame,
  setNewGame,
  nextGame,
  setNextGame,
  callApi,
}: PanelsProps) {
  async function answerCheck(answer: string) {
    const correct =
      answer === "Higher"
        ? currentGame.playerCount < newGame.playerCount
        : currentGame.playerCount > newGame.playerCount;

    if (correct) {
      // movePanel();
      setScore(score + 1);
      setCurrentGame(newGame);
      setNewGame(nextGame);
      const holdGame = await callApi(nextGame.id);
      setNextGame(holdGame);
    } else {
      setMenuShow(true);
    }
  }

  return (
    <div>
      <div className={"panel leftPanel"}>
        <p className={"gameName"}>{currentGame.name}</p>
        <p> Player Count: {currentGame.playerCount}</p>
        <img
          className={"steamImage"}
          src={`https://raw.githubusercontent.com/JasonNguyen47/SteamImages/main/${currentGame.id}.jpg`}
          crossOrigin={"anonymous"}
          onLoad={() => setPanelBackground(".panel.leftPanel")}
        />
      </div>
      <div className={"panel rightPanel"}>
        <p className="gameName">{newGame.name}</p>
        {menuShow ? <p> Player Count: {newGame.playerCount} </p> : <div />}
        <img
          className={"steamImage"}
          src={`https://raw.githubusercontent.com/JasonNguyen47/SteamImages/main/${newGame.id}.jpg`}
          crossOrigin={"anonymous"}
          onLoad={() => setPanelBackground(".panel.rightPanel")}
        />

        <div className="button-holders">
          <button
            className={"answerButton Lower"}
            onClick={() => answerCheck("Lower")}
          >
            Lower
          </button>
          <button
            className={"answerButton Higher"}
            onClick={() => answerCheck("Higher")}
          >
            Higher
          </button>
        </div>
      </div>
    </div>
  );
}

function setPanelBackground(stringClassName: string) {
  const fac = new FastAverageColor();

  const container = document.querySelector<HTMLImageElement>(stringClassName);
  if (!container) return;

  const img = container.querySelector(".steamImage") as HTMLCanvasElement;

  const color = fac.getColor(img);

  container.style.backgroundColor = color.rgba;
  container.style.color = color.isDark ? "#fff" : "#000";
}

function movePanel() {
  const panel = document.querySelector(".panel.rightPanel");

  console.log(panel);

  panel?.classList.toggle("rightPanel");

  panel?.classList.toggle("rightPanelToLeft");

  panel?.classList.toggle("rightPanel");
}
