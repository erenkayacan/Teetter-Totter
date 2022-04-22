import { useSelector, useDispatch } from "react-redux";
import FallingBlock from "../FallingBlock";
import { initializeFallingBlock } from "../../store/actions/tetterTotterActions";
import {
  FALLING_BLOCKS_COUNT,
  ITERATION_COUNT_INCREASING,
  TIMEOUT_STEP_DECREASING,
  INITIAL_TIMEOUT,
} from "../../utils/constants";
import { generateRandomBlock } from "../../utils/helpers";
import "./Dropbox.css";

function DropBox() {
  const fallingBlocks = useSelector(
    (state) => state.tetterTotter.fallingBlocks,
  );
  const dispatch = useDispatch();
  let timeOut = INITIAL_TIMEOUT;
  let iterationCounter = 0;
  function onKeyDown(ev) {
    if (ev.keyCode === 39) this.moveBlockRight();
    if (ev.keyCode === 37) this.moveBlockLeft();
  }
  function onFinishFalling() {
    iterationCounter += 1;
    if (iterationCounter === ITERATION_COUNT_INCREASING) {
      timeOut -= TIMEOUT_STEP_DECREASING;
      iterationCounter = 0;
    }
  }
  function fillBlocks() {
    const blocks = [];
    for (let i = 0; i < FALLING_BLOCKS_COUNT; i += 1) {
      blocks.push(generateRandomBlock());
    }
    return blocks;
  }
  const blocks = fillBlocks();
  dispatch(initializeFallingBlock(blocks));
  return (
    <section className="dropbox">
      {fallingBlocks.map((block, index) => (
        <FallingBlock
          block={block}
          index={index}
          timeOut={timeOut}
          key={block.id}
        />
      ))}
    </section>
  );
}

export default DropBox;
