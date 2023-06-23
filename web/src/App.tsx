import "./styles/main.css";
import logoImg from "./assets/logo.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { useEffect, useState } from "react";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count?: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data[0]);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });
  }, []);


  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20">
      <img src={logoImg} />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui.
      </h1>


      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              adsCount={game._count?.ads || 0}
              title={game.title}
              bannerUrl={game.bannerUrl}
            />
          );
        })}
      </div>

      <CreateAdBanner />
    </div>
  );
}

export default App;
