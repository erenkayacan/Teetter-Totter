import { useSelector, useDispatch } from "react-redux";
import Block from "../Block";
import { setSwingBending } from "../../store/actions/tetterTotterActions";
import { MAX_BENDING } from "../../utils/constants";
import "./Swing.css";

function Swing() {
  const rightSideBlocks = useSelector(
    (state) => state.tetterTotter.rightSideBlocks,
  );
  const dispatch = useDispatch();
  const leftSideBlocks = useSelector(
    (state) => state.tetterTotter.leftSideBlocks,
  );
  function getBlockPower(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i += 1) {
      sum += array[i].weight * array[i].offset;
    }
    return sum;
  }
  function calculateSum(blocks) {
    return getBlockPower(blocks);
  }
  const leftSum = calculateSum(leftSideBlocks);
  const rightSum = calculateSum(rightSideBlocks);
  function calculateSwing() {
    if (!leftSum) return MAX_BENDING;
    if (leftSum === rightSum) {
      return 0;
    }
    return leftSum > rightSum
      ? ((leftSum - rightSum) / leftSum) * -100
      : ((rightSum - leftSum) / rightSum) * 100;
  }
  const swingBending = calculateSwing();
  function inlineStyleSwing() {
    return {
      transform: `rotate(${swingBending / 2}deg)`,
    };
  }
  dispatch(setSwingBending(swingBending, leftSum, rightSum));
  return (
    <div className="swing" style={inlineStyleSwing()}>
      {rightSideBlocks.map((block) => (
        <Block block={block} side={true} key={block.id} />
      ))}
      {leftSideBlocks.map((block) => (
        <Block block={block} key={block.id} />
      ))}
    </div>
  );
}

export default Swing;
