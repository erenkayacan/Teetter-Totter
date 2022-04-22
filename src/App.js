import { Provider } from "react-redux";
import store from "./store";
import Bar from "./components/Bar";
import GameArea from "./components/GameArea";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="root">
        <Bar />
        <GameArea />
      </div>
    </Provider>
  );
}

export default App;
