import {
  TOGGLE_PAUSE,
  ADD_RIGHT_SIDE_BLOCK,
  ADD_LEFT_SIDE_BLOCK,
  RESET_STATE,
  FALLING_BLOCKS_COUNT,
  INITIALIZE_FALLING_BLOCKS,
  ADD_FALLING_BLOCK,
  MOVE_RIGHT,
  MOVE_LEFT,
} from "../../utils/constants";
import { generateRandomBlock } from "../../utils/helpers";

const initialState = {
  isPaused: true,
  leftSideBlocks: [],
  rightSideBlocks: [],
  fallingBlocks: [],
};
const blocks = [];

for (let i = 0; i < FALLING_BLOCKS_COUNT; i += 1) {
  const randomBlock = generateRandomBlock();
  blocks.push(randomBlock);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_PAUSE:
      return { ...state, isPaused: !state.isPaused };
    case ADD_RIGHT_SIDE_BLOCK:
      return {
        ...state,
        rightSideBlock: state.rightSideBlocks.push(generateRandomBlock()),
      };
    case ADD_LEFT_SIDE_BLOCK:
      const leftSideBlocks = [];
      leftSideBlocks.push(state.fallingBlocks.shift());
      return {
        ...state,
      };
    case INITIALIZE_FALLING_BLOCKS:
      return { ...state, fallingBlocks: blocks };
    case ADD_FALLING_BLOCK:
      state.fallingBlocks.push(generateRandomBlock());
      return {
        ...state,
        fallingBlocks: state.fallingBlocks,
      };
    case MOVE_RIGHT:
      if (state.isPaused || state.fallingBlocks[0].offset - 1 <= 0) break;
      return {
        ...state,
        fallingBlocks: state.fallingBlocks.map((block) => {
          if (block.index === 0) {
            state.fallingBlocks[0].offset += 1;
            return state.fallingBlocks[0];
          }
          return block;
        }),
      };
    case MOVE_LEFT:
      if (state.isPaused || state.fallingBlocks[0].offset + 1 > 5) break;
      return {
        ...state,
        fallingBlocks: state.fallingBlocks.map((block) => {
          if (block.index === 0) {
            state.fallingBlocks[0].offset += 1;
            return state.fallingBlocks[0];
          }
          return block;
        }),
      };
    case RESET_STATE:
      return {
        isPaused: true,
        leftSideBlocks: [],
        rightSideBlock: [],
        fallingBlocks: [],
      };
    default:
      return state;
  }
};

export default reducer;
