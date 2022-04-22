import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { togglePause } from "../../store/actions/tetterTotterActions";
import "./Bar.css";

function Bar() {
  const isPaused = useSelector(
    (storeState) => storeState.tetterTotter.isPaused,
  );
  const dispatch = useDispatch();
  function tPause() {
    dispatch(togglePause());
  }
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__pauseButton" onClick={tPause}>
          <FontAwesomeIcon icon={isPaused ? faPlay : faPause}></FontAwesomeIcon>
        </div>
      </div>
    </header>
  );
}
export default Bar;
