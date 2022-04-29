import { useSelector } from "react-redux";
import FallingBlock from "../FallingBlock";
import { INITIAL_TIMEOUT } from "../../utils/constants";
import "./Dropbox.css";

function DropBox() {
  const fallingBlocks = useSelector(
    (state) => state.tetterTotter.fallingBlocks,
  );
  const timeOut = INITIAL_TIMEOUT;
  return (
    <section className="dropbox">
      {fallingBlocks.map((block, index) => (
        <FallingBlock
          block={block}
          index={index}
          timeOut={timeOut}
          key={block.id}
        />
      ))}
    </section>
  );
}

export default DropBox;
