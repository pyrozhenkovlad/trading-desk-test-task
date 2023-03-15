import { useEffect, useState } from "react";

interface TileProps {
  title: string;
  active: boolean;
  size: { width: string; height: string };
  position: { x: number; y: number };
  setTiles: (position: { x: number; y: number }) => void;
  onClick: () => void;
}

const TileOLD = (props: TileProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    // add event listeners when component mounts
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      // remove event listeners when component unmounts
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = () => {
    // start tracking movement when mouse is pressed down on the element
    setIsDragging(true);
  };

  const handleMouseMove = (event: any) => {
    if (isDragging) {
      // update position when mouse is moved while dragging
      setPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    // stop tracking movement when mouse is released
    setIsDragging(false);
  };

  return (
    <div
      onClick={props.onClick}
      className={`border ${
        props.active ? "border-blue-500" : "border-black"
      } w-[${props.size.width}] h-[${props.size.height}] absolute left-[${
        position.x
      }px] top-[${position.y}px]`}
      onMouseDown={handleMouseDown}
    >
      <div
        className={`h-10  flex flex-row border ${
          props.active ? "bg-blue-200 border-b-blue-500" : "border-b-black "
        }`}
      >
        <div className="self-center grid border place-content-center h-4 w-4 cursor-pointer"></div>
        <div className=" grid place-content-center flex-1">{props.title}</div>
      </div>
    </div>
  );
};

export default TileOLD;
