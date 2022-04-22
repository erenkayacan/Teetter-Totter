import { useRef } from "react";
import "./Block.css";

function Block(props, ref) {
  const { block, side, top } = props;
  const blockRef = useRef(ref);
  function roundUp(number) {
    return Math.round(number * 100) / 100;
  }
  function blockInlineStyle() {
    const { offset, type, height } = props.block;
    const topOffset = top || 0;
    const leftOffset = side ? 50 + offset * 10 : 50 - offset * 10;
    const blockHeight =
      type !== 1
        ? {
            height: `${roundUp(height)}px`,
            width: `${roundUp(height)}px`,
            lineHeight: `${roundUp(height)}px`,
          }
        : {
            borderWidth: `0 ${roundUp(height)}px ${roundUp(height)}px ${roundUp(
              height / 2,
            )}px`,
            lineHeight: `${roundUp(height * 1.2)}px`,
          };
    return {
      top: `${topOffset}px`,
      left: `${leftOffset}%`,
      ...blockHeight,
    };
  }

  function renderBlock() {
    const { type } = props.block;
    switch (type) {
      case 0:
        return "block-circle";
      case 1:
        return "block-triangle";
      case 2:
        return "block-rectangle";
      default:
        return "block-circle";
    }
  }

  // function getBlockBottomCoords() {
  //   const domElement = React.forwardRef('element');
  //   return domElement.getBoundingClientRect().bottom;
  // }

  return (
    <div className={renderBlock()} style={blockInlineStyle()} ref={blockRef}>
      {block.weight}
    </div>
  );
}

export default Block;
