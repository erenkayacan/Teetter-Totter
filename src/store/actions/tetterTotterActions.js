import {
  TOGGLE_PAUSE,
  ADD_RIGHT_SIDE_BLOCK,
  ADD_LEFT_SIDE_BLOCK,
  INITIALIZE_FALLING_BLOCKS,
  ADD_FALLING_BLOCK,
  MOVE_LEFT,
  MOVE_RIGHT,
  RESET_STATE,
  SET_SWING_BENDING,
  GAME_OVER_STATUS,
} from "../../utils/constants";

const togglePause = () => ({
  type: TOGGLE_PAUSE,
});
const initializeFallingBlock = (blocks) => ({
  type: INITIALIZE_FALLING_BLOCKS,
  payload: {
    blocks,
  },
});
const addRightSideBlock = () => ({
  type: ADD_RIGHT_SIDE_BLOCK,
});
const addLeftSideBlock = () => ({
  type: ADD_LEFT_SIDE_BLOCK,
});
const addFallingBlock = () => ({
  type: ADD_FALLING_BLOCK,
});
const moveBlockLeft = () => ({
  type: MOVE_LEFT,
});
const moveBlockRight = () => ({
  type: MOVE_RIGHT,
});
const resetState = () => ({
  type: RESET_STATE,
});
const setSwingBending = (bending, leftSum, rightSum) => ({
  type: SET_SWING_BENDING,
  payload: {
    swingBending: bending,
    leftSum,
    rightSum,
  },
});
const setGameOverStatus = () => ({
  type: GAME_OVER_STATUS,
});
export {
  togglePause,
  initializeFallingBlock,
  addRightSideBlock,
  addLeftSideBlock,
  addFallingBlock,
  moveBlockLeft,
  moveBlockRight,
  resetState,
  setSwingBending,
  setGameOverStatus,
};
