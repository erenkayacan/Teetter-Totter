import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Block from "../Block";
import {
  addRightSideBlock,
  addLeftSideBlock,
  addFallingBlock,
  resetState,
  initializeFallingBlock,
  setGameOverStatus,
} from "../../store/actions/tetterTotterActions";
import {
  MAX_BENDING,
  MAX_SIDES_DIFFERENCE,
  MIN_BENDING,
  TEETER_TOTTER_WIDTH,
} from "../../utils/constants";
import { fillBlocks } from "../../utils/helpers";

function FallingBlock(props, ref) {
  const { block, index, timeOut } = props;
  const blockRef = useRef(ref);
  const dispatch = useDispatch();
  const {
    leftSideBlocks,
    rightSideBlocks,
    swingBending,
    isPaused,
    leftSum,
    rightSum,
    gameOverStatus,
  } = useSelector((storeState) => storeState.tetterTotter);
  const [blockDropboxTop, setBlockDropboxTop] = useState(block.height);
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
  function getGameOverStatus() {
    return (
      swingBending > MAX_BENDING ||
      swingBending < MIN_BENDING ||
      Math.abs(leftSum - rightSum) > MAX_SIDES_DIFFERENCE
    );
  }
  if (gameOverStatus) {
    alert("Game Over");
    dispatch(resetState());
    dispatch(addRightSideBlock());
    // eslint-disable-next-line no-shadow
    const block = fillBlocks();
    dispatch(initializeFallingBlock(block));
  }
  function finishFalling() {
    dispatch(addLeftSideBlock());
    dispatch(addFallingBlock());
    if (leftSideBlocks.length !== rightSideBlocks.length) {
      dispatch(addRightSideBlock());
    }
    if (getGameOverStatus()) {
      dispatch(setGameOverStatus());
    }
  }
  useEffect(() => {
    if (isPaused) return clearTimeout(timer);
    if (index !== 0) return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    timer = setTimeout(() => {
      if (blockDropboxTop >= blockFinalPosition() - 90) {
        setBlockDropboxTop(0);
        finishFalling();
        clearTimeout(timer);
        return null;
      }
      incrementBlockDropboxTop();
      // eslint-disable-next-line no-useless-return
      return null;
    }, timeOut);
    return () => {};
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
