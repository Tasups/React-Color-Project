import Palette from './Palette.js';
import seedColors from './seedColors.js';

function App() {
  return (
    <div className="App">
      <Palette {...seedColors[3]}/>
    </div>
  );
}

export default App;
