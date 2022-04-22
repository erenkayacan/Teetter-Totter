import DropBox from "../Dropbox";
import TetterTotter from "../TetterTotter";
import "./GameArea.css";

function GameArea() {
  const block = {
    height: 56,
    id: "1d358e7f-c648-4db9-8b93-f519bded03bb",
    offset: 5,
    type: 2,
    weight: 7,
  };
  return (
    <main className="gameArea">
      <DropBox />
      <TetterTotter />
    </main>
  );
}
export default GameArea;
