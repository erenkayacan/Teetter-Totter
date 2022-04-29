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
  GAME_OVER_STATUS,
  SET_SWING_BENDING,
} from "../../utils/constants";
import { generateRandomBlock } from "../../utils/helpers";

const initialState = {
  isPaused: true,
  leftSideBlocks: [],
  rightSideBlocks: [],
  fallingBlocks: [],
  gameOverStatus: false,
};
const blocks = [];
for (let i = 0; i < FALLING_BLOCKS_COUNT; i += 1) {
  const randomBlock = generateRandomBlock();
  blocks.push(randomBlock);
}
// eslint-disable-next-line consistent-return
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_PAUSE:
      return { ...state, isPaused: !state.isPaused };
    case ADD_RIGHT_SIDE_BLOCK:
      // eslint-disable-next-line no-case-declarations
      const block = generateRandomBlock();
      return {
        ...state,
        rightSideBlocks: [...state.rightSideBlocks, block],
      };
    case ADD_LEFT_SIDE_BLOCK:
      // eslint-disable-next-line no-case-declarations
      const leftSideBlock = state.fallingBlocks.shift();
      return {
        ...state,
        leftSideBlocks: [...state.leftSideBlocks, leftSideBlock],
      };
    case INITIALIZE_FALLING_BLOCKS:
      return {
        ...state,
        fallingBlocks: action.payload.blocks,
      };
    case ADD_FALLING_BLOCK:
      // eslint-disable-next-line no-case-declarations
      const fallingBlock = generateRandomBlock();
      return {
        ...state,
        fallingBlocks: [...state.fallingBlocks, fallingBlock],
      };
    case MOVE_RIGHT:
      if (state.isPaused || state.fallingBlocks[0].offset - 1 <= 0) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        fallingBlocks: state.fallingBlocks.map((fBlock, index) => {
          if (index === 0) {
            state.fallingBlocks[0].offset -= 1;
            return state.fallingBlocks[0];
          }
          return fBlock;
        }),
      };
    case MOVE_LEFT:
      if (state.isPaused || state.fallingBlocks[0].offset + 1 > 5) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        fallingBlocks: state.fallingBlocks.map((fBlock, index) => {
          if (index === 0) {
            state.fallingBlocks[0].offset += 1;
            return state.fallingBlocks[0];
          }
          return fBlock;
        }),
      };
    case RESET_STATE:
      return {
        isPaused: true,
        leftSideBlocks: [],
        rightSideBlocks: [],
        fallingBlocks: [],
      };
    case SET_SWING_BENDING:
      return {
        ...state,
        swingBending: action.payload.swingBending,
        leftSum: action.payload.leftSum,
        rightSum: action.payload.rightSum,
      };
    case GAME_OVER_STATUS:
      return {
        ...state,
        gameOverStatus: true,
      };
    default:
      return state;
  }
};

export default reducer;
