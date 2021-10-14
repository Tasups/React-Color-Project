import Palette from './Palette.js';
import seedColors from './seedColors.js';
import { generatePalette } from './colorHelpers.js';

function App() {
  return (
    <div>
      <Palette palette={generatePalette(seedColors[1])}/>
    </div>
  );
}

export default App;
