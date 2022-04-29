import { v4 } from "uuid";
import {
  MIN_WEIGHT,
  MAX_WEIGHT,
  TEETER_TOTTER_WIDTH,
  SHAPE_COUNT,
  FALLING_BLOCKS_COUNT,
} from "./constants";

// eslint-disable-next-line import/prefer-default-export
export function generateRandomBlock() {
  const id = v4();
  const type = Math.floor(Math.random() * SHAPE_COUNT);
  const weight = Math.floor(Math.random() * MAX_WEIGHT) + MIN_WEIGHT;
  const offset = Math.floor((Math.random() * TEETER_TOTTER_WIDTH) / 2) + 1;
  const height = weight * 8;
  return {
    id,
    type,
    weight,
    offset,
    height,
  };
}
export function fillBlocks() {
  const blocks = [];
  for (let i = 0; i < FALLING_BLOCKS_COUNT; i += 1) {
    blocks.push(generateRandomBlock());
  }
  return blocks;
}
function getBlockPower(array) {
  const sum = array.reduce((acc, item) => acc + item.weight * item.offset, 0);
  return sum;
}
export function calculateSum(blocks) {
  return getBlockPower(blocks);
}
