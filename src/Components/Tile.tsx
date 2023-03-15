import Draggable from "react-draggable";

interface TileProps {
  title: string;
  active: boolean;
  id: number;
  size: { width: string; height: string };
  position: { x: number; y: number };
  setTiles: () => void;
  onClick: (id: number) => void;
}

const Tile = (props: TileProps) => {
  const eventLogger = (e: MouseEvent, data: Object) => {
    props.onClick(props.id);
    //@ts-ignore
    props.setTiles((prevTiles) => {
      const index = prevTiles.findIndex((tile: any) => tile.id === props.id);
      const updatedTile = {
        ...prevTiles[index],
        position: {
          //@ts-ignore
          x: data.x,
          //@ts-ignore
          y: data.y,
        },
      };
      const newTiles = [...prevTiles];
      newTiles[index] = updatedTile;
      return newTiles;
    });
  };

  const deleteHandler = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    //@ts-ignore
    props.setTiles((prevTiles) => {
      const index = prevTiles.findIndex((tile: any) => tile.id === id);
      const deletedTile = prevTiles[index];
      localStorage.setItem("deletedTile", JSON.stringify(deletedTile));
      const newTiles = [...prevTiles];
      newTiles.splice(index, 1);
      return newTiles;
    });
  };

  return (
    <>
      <Draggable
        //@ts-ignore
        onStart={(e, data) => eventLogger(e, data)}
        position={{ x: props.position.x, y: props.position.y }}
        //@ts-ignore
        onStop={(e, data) => eventLogger(e, data)}
      >
        <div
          className={`border ${
            props.active ? "border-blue-500" : "border-black"
          } h-[150px] w-[300px]   ${
            props.active ? " z-20" : "z-10"
          } bg-gray-100 absolute cursor-pointer`}
        >
          <div
            className={`h-10  flex flex-row border ${
              props.active ? "bg-blue-200 border-b-blue-500" : "border-b-black "
            }  `}
          >
            <div
              className="self-center grid border ml-1 bg-white place-content-center h-4 w-4 cursor-pointer"
              onClick={(e) => deleteHandler(e, props.id)}
            >
              -
            </div>
            <div className=" grid place-content-center flex-1">
              {props.title}
            </div>
          </div>
        </div>
      </Draggable>
    </>
  );
};

export default Tile;
