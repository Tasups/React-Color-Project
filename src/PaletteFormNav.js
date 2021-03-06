import React, { Component } from 'react';
import PaletteMetaForm from "./PaletteMetaForm.js";
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddToPhotos from '@material-ui/icons/AddToPhotos';
import { Link } from 'react-router-dom';


class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  render() {
    const { classes, open, handleDrawerOpen, palettes, handleSubmit } = this.props;
    return(
      <div>
      <CssBaseline />
        <AppBar
          color="default"
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <AddToPhotos />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Create A Palette
            </Typography>
          <div className="navBtns">
              <PaletteMetaForm handleSubmit={handleSubmit} palettes={palettes}/>
                <Link to="/">
                  <Button
                    variant="contained"
                    color="secondary"
                  >
                   Go Back
                  </Button>
                </Link>
            </div>
            </Toolbar>
        </AppBar>
      </div>
      )
  }
}

export default PaletteFormNav;
