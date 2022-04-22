import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Block from "../Block";
import {
  addRightSideBlock,
  addLeftSideBlock,
  addFallingBlock,
  initializeFallingBlock,
  resetState,
} from "../../store/actions/tetterTotterActions";
import { TEETER_TOTTER_WIDTH } from "../../utils/constants";

function FallingBlock(props, ref) {
  const { block, index, timeOut } = props;
  const blockRef = useRef(ref);
  const dispatch = useDispatch();
  const isPaused = useSelector(
    (storeState) => storeState.tetterTotter.isPaused,
  );
  const { leftSideBlocks, rightSideBlocks, gameOverStatus, swingBending } =
    useSelector((storeState) => storeState.tetterTotter);
  const [blockDropboxTop, setBlockDropboxTop] = useState(block.height);
  const [blockWindowBottom, setBlockWindowBottom] = useState(0);
  let timer = 0;
  function getSwingCoords() {
    const { top, bottom } = document
      .querySelector(".swing")
      .getBoundingClientRect();
    return {
      top,
      bottom,
    };
  }
  function blockFinalPosition() {
    const { top, bottom } = getSwingCoords();
    return swingBending >= 0
      ? top +
          ((bottom - top) / 2) * (1 - block.offset / (TEETER_TOTTER_WIDTH / 2))
      : bottom -
          ((bottom - top) / 2) * (1 - block.offset / (TEETER_TOTTER_WIDTH / 2));
  }
  function incrementBlockDropboxTop() {
    setBlockDropboxTop(blockDropboxTop + 20);
  }
  function finishFalling() {
    console.log("finish falling calisti");
    dispatch(addLeftSideBlock());
    dispatch(addFallingBlock());
    if (leftSideBlocks.length !== rightSideBlocks.length) {
      console.log("lengthler esit degil");
      dispatch(addRightSideBlock());
    }
    if (gameOverStatus) {
      setTimeout(() => {
        alert("game finished");
        dispatch(resetState());
        dispatch(addRightSideBlock());
        dispatch(initializeFallingBlock());
      });
    }
  }
  useEffect(() => {
    if (isPaused) return clearTimeout(timer);
    if (index !== 0) return;
    timer = setTimeout(() => {
      if (blockDropboxTop >= blockFinalPosition() - 20) {
        console.log("finished");
        finishFalling();
        clearTimeout(timer);
        return;
      }
      incrementBlockDropboxTop();
      return;
    }, timeOut);
  });
  return (
    <div ref={blockRef}>
      <Block
        block={block}
        top={blockDropboxTop}
        index={index}
        isPaused={isPaused}
      />
    </div>
  );
}

export default FallingBlock;
