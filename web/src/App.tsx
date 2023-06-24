import "./styles/main.css";
import logoImg from "./assets/logo.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { GameController } from "phosphor-react";
import { Input } from "./components/form/Input";

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

      <Dialog.Root>
        <CreateAdBanner />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[450px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">
              Publique um anúncio
            </Dialog.Title>

            <form className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">
                  Qual o game?
                </label>
                <Input />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="nome">Seu nome (ou nickname)</label>
                <Input id="nome" placeholder="Como te chamam dentro do game?" />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input
                    type="number"
                    id="yearsPlaying"
                    placeholder="Tudo bem ser ZERO"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual seu discord?</label>
                  <Input type="text" placeholder="Usuário#0000" id="discord" />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                  <div className="grid grid-cols-4 gap-2">
                    <button className="w-8 h-8 bg-zinc-900 rounded" title="domingo">D</button>
                    <button className="w-8 h-8 bg-zinc-900 rounded" title="segunda">S</button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title="terça">T</button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title="quarta">Q</button>
                    <button className="w-8 h-8 bg-zinc-900 rounded" title="quinta">Q</button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title="sexta">S</button>
                    <button className="w-8 h-8 rounded bg-zinc-900" title="sábado">S</button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input id="hourStart" type="time" placeholder="De" />
                    <Input id="hourEnd" type="time" placeholder="Até" />
                  </div>
                </div>
              </div>

              <div className="mt-2 flex gap-2 text-sm">
                <Input type="checkbox" id="" />
                Costumo me conectar ao chat de voz
              </div>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
                <button className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600" type="submit">
                  <GameController size={24} />
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App;
