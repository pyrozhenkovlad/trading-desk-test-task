import { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";

interface TileProps {
  title: string;
  active: boolean;
  id: number;
  size: { width: string; height: string };
  position: { x: number; y: number };
  setTiles: (position: { x: number; y: number }) => void;
  onClick: (id: number) => void;
}

const Tile = (props: TileProps) => {

  const eventLogger = (e: MouseEvent, data: Object) => {
    //@ts-ignore
    console.log('Data X: ', data.x);
    //@ts-ignore
    console.log('Data Y: ', data.y);
  };

  return (
    <>
      <Draggable
        onStart={()=>{props.onClick(props.id)}}
        //@ts-ignore
        onStop={(e, data) => eventLogger(e , data)}
      >
        <div
          className={`border ${
            props.active ? "border-blue-500" : "border-black"
          } h-[150px] w-[300px]  ${props.active ? " z-20" : "z-10"} bg-green-100`}
        >
          <div
            className={`h-10  flex flex-row border ${
              props.active ? "bg-blue-200 border-b-blue-500" : "border-b-black "
            } ] `}
          >
            <div className="self-center grid border place-content-center h-4 w-4 cursor-pointer"></div>
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
