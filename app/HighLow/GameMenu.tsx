"use client";

type SteamGame = {
  id: string;
  name: string;
  release_date: string;
  genre: string;
  tags: string[];
  playerCount: number;
};

type GameMenuProps = {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  menuShow: boolean;
  setMenuShow: React.Dispatch<React.SetStateAction<boolean>>;
  callApi: (appID: string) => Promise<SteamGame>;
  setCurrentGame: React.Dispatch<React.SetStateAction<SteamGame>>;
  setNewGame: React.Dispatch<React.SetStateAction<SteamGame>>;
  setNextGame: React.Dispatch<React.SetStateAction<SteamGame>>;
  bestScore: number;
  setBestScore: React.Dispatch<React.SetStateAction<number>>;
};

export default function GameMenu({
  score,
  setScore,
  menuShow,
  setMenuShow,
  callApi,
  setCurrentGame,
  setNewGame,
  setNextGame,
  bestScore,
  setBestScore,
}: GameMenuProps) {
  async function onClickPlayAgain() {
    if (score > bestScore) {
      setBestScore(score);
    }

    const game1 = await callApi("-1");
    const game2 = await callApi(`${game1.id}`);
    const game3 = await callApi(`${game2.id}`);

    setCurrentGame(game1);
    setNewGame(game2);
    setNextGame(game3);

    setMenuShow(!menuShow);
    setScore(0);
  }

  if (menuShow) {
    return (
      <div className="gameMenu">
        <p className="menuText">Game Menu</p>
        <p className="menuText">Score: {score}</p>
        <p className="menuText">Best Score: {bestScore} </p>
        <button className="menuText" onClick={() => onClickPlayAgain()}>
          Play Again
        </button>
      </div>
    );
  } else {
    return;
  }
}
