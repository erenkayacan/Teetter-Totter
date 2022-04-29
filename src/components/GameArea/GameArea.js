import DropBox from "../Dropbox";
import TetterTotter from "../TetterTotter";
import { useDispatch } from "react-redux";
import useKeypress from "react-use-keypress";
import {
  initializeFallingBlock,
  addRightSideBlock,
  moveBlockLeft,
  moveBlockRight,
} from "../../store/actions/tetterTotterActions";
import { fillBlocks } from "../../utils/helpers";
import "./GameArea.css";

function GameArea() {
  const dispatch = useDispatch();
  const blocks = fillBlocks();
  useKeypress(["ArrowLeft", "ArrowRight"], (event) => {
    if (event.key === "ArrowLeft") {
      console.log("left");
      dispatch(moveBlockLeft());
    }
    if (event.key === "ArrowRight") {
      console.log("right");
      dispatch(moveBlockRight());
    }
  });
  dispatch(initializeFallingBlock(blocks));
  dispatch(addRightSideBlock());
  return (
    <main className="gameArea">
      <DropBox />
      <TetterTotter />
    </main>
  );
}
export default GameArea;
