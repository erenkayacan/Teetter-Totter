import { useSelector, useDispatch } from "react-redux";
import Block from "../Block";
import { addRightSideBlock } from "../../store/actions/tetterTotterActions";
import { MAX_BENDING } from "../../utils/constants";
import { calculateSum } from "../../utils/helpers";
import "./Swing.css";

function Swing() {
  const dispatch = useDispatch();
  const rightSideBlocks = useSelector(
    (state) => state.tetterTotter.rightSideBlocks,
  );
  const leftSideBlocks = useSelector(
    (state) => state.tetterTotter.leftSideBlocks,
  );
  dispatch(addRightSideBlock());
  function calculateSwing() {
    if (!calculateSum(leftSideBlocks)) return MAX_BENDING;
    if (calculateSum(leftSideBlocks) === calculateSum(rightSideBlocks)) {
      return 0;
    }
    return calculateSum(leftSideBlocks) > calculateSum(rightSideBlocks)
      ? ((calculateSum(leftSideBlocks) - calculateSum(rightSideBlocks)) /
          calculateSum(leftSideBlocks)) *
          -100
      : ((calculateSum(rightSideBlocks) - calculateSum(leftSideBlocks)) /
          calculateSum(rightSideBlocks)) *
          100;
  }
  const swingBending = calculateSwing();
  function inlineStyleSwing() {
    console.log(swingBending);
    return {
      transform: `rotate(${swingBending / 2}deg)`,
    };
  }
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
