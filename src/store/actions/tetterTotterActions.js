import {
  TOGGLE_PAUSE,
  ADD_RIGHT_SIDE_BLOCK,
  ADD_LEFT_SIDE_BLOCK,
  RESET_STATE,
  INITIALIZE_FALLING_BLOCKS,
  ADD_FALLING_BLOCK,
} from "../../utils/constants";

const togglePause = () => ({
  type: TOGGLE_PAUSE,
});

const initializeFallingBlock = () => ({
  type: INITIALIZE_FALLING_BLOCKS,
});

const addRightSideBlock = () => ({
  type: ADD_RIGHT_SIDE_BLOCK,
});

const addLeftSideBlock = () => ({
  type: ADD_LEFT_SIDE_BLOCK,
});

const resetState = () => ({
  type: RESET_STATE,
});

const addFallingBlock = () => ({
  type: ADD_FALLING_BLOCK,
});

export {
  togglePause,
  initializeFallingBlock,
  addRightSideBlock,
  addLeftSideBlock,
  resetState,
  addFallingBlock,
};
