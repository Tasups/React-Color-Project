import Palette from './Palette.js';
import seedColors from './seedColors.js';

function App() {
  return (
    <div className="App">
      <Palette palette={seedColors[4]}/>
    </div>
  );
}

export default App;
