import React, { useEffect, useState } from "react";
import { mockTiles } from "./Components/tiles";
import Tile from "./Components/Tile";

function App() {
  const [tiles, setTiles] = React.useState(mockTiles);

  useEffect(() => {
    const localTiles = localStorage.getItem("tiles");
    if (localTiles) {
      setTiles(JSON.parse(localTiles));
    } /* else {
      localStorage.setItem("tiles", JSON.stringify(tiles));
    } */
  }, []);

  const activeHandler = (id: number) => {
    const newTiles = tiles.map((tile) => {
      if (tile.id === id) {
        return { ...tile, active: !tile.active };
      } else {
        return { ...tile, active: false };
      }
    });
    setTiles(newTiles);
  };

  return (
    <>
      <div className="h-screen">
        <div className="flex flex-col gap-y-4 absolute">
          {tiles.map((tile) => (
            <Tile
              //@ts-ignore
              setTiles={setTiles}
              key={tile.id}
              id={tile.id}
              title={tile.name}
              active={tile.active}
              size={tile.size}
              position={tile.position}
              onClick={activeHandler}
            />
          ))}
        </div>
        <div className="grid place-content-center fixed top-[40%] left-[40%]">
          <div className="border border-black grid place-content-center w-80 h-40">
            <p className="cursor-pointer">Return tile to trading desk</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
