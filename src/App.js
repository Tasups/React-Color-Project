import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PaletteList from './PaletteList.js';
import Palette from './Palette.js';
import SingleColorPalette from './SingleColorPalette.js';
import NewPaletteForm from './NewPaletteForm.js';
import seedColors from './seedColors.js';
import { generatePalette } from './colorHelpers.js';

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = {
      palettes: savedPalettes || seedColors
    }
    
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.syncLocalStorage = this.syncLocalStorage.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  
  findPalette(id) {
    return this.state.palettes.find(function(palette) {
       return palette.id === id;
    })
  }
  
  /*
  removeColor(colorName) {
    this.setState({
    colors: this.state.colors.filter(color => color.name !== colorName)
    })
  }
  */
  
  deletePalette(id) {
    this.setState(
      {palettes: this.state.palettes.filter(palette => palette.id !== id)}, 
      this.syncLocalStorage)
  }
  
  savePalette(newPalette) {
    this.setState({palettes: [...this.state.palettes, newPalette]}, this.syncLocalStorage);
  }
  
  syncLocalStorage() {
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes))
  }
    
  render() {
    return (
      <Switch>
        <Route 
          exact 
          path="/palette/new" 
          render={(routeProps) => 
            <NewPaletteForm 
              savePalette={this.savePalette} {...routeProps}
              palettes={this.state.palettes}  
            />} 
        />
        <Route
          exact 
          path='/' 
          render={routeProps => (
            <PaletteList 
              palettes={this.state.palettes} 
              deletePalette={this.deletePalette} 
              {...routeProps}
            />
          )} 
        />
        <Route 
          exact 
          path='/palette/:id' 
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
        <Route
          exact
          path='/palette/:paletteId/:colorId'
          render={routeProps => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>
  
    /*
    <div>
      <Palette palette={generatePalette(seedColors[1])}/>
    </div>
    */
    
    );
  }
}

export default App;
