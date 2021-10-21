import React, { Component } from 'react';
import classNames from 'classnames';
import PaletteFormNav from './PaletteFormNav.js';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import DraggableColorList from './DraggableColorList.js';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';

const drawerWidth = 300;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    marginTop: "3%",
    height: "calc(100vh - 64px)",
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  }
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      currentColor: "orange",
      newColorName: "",
      colors: [
        {color: "red", name: "red"}, {color: "orange", name: "orange"},
        {color: "yellow", name: "yellow"}, {color: "green", name: "green"}, 
        {color: "blue", name: "blue"}, {color: "indigo", name: "indigo"},
        {color: "violet", name: "violet"}
        ],
    }
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
  }
  
  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", value => 
      this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
  );
  
    ValidatorForm.addValidationRule("isColorUnique", value => 
      this.state.colors.every(
        ({ color }) => color !== this.state.currentColor
      )
  );
}
  /*
  state = {
    open: false,
    currentColor: "orange"
  };
  */


  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  
  updateCurrentColor(newColor) {
    this.setState({currentColor: newColor.hex});
  }
  
  handleChange(evt){
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  
  handleSubmit(newPaletteName){
    const newPalette = {
      paletteName: newPaletteName, 
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors}
    this.props.savePalette(newPalette);
    this.props.history.push("/");
  }
  
  onSortEnd = ({oldIndex, newIndex}) => {
      this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };
  
  removeColor(colorName) {
    this.setState({
    colors: this.state.colors.filter(color => color.name !== colorName)
    })
  }
  
  addNewColor(){
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    }
    this.setState({colors: [...this.state.colors, newColor], newColorName: ""});
  }
  
  addRandomColor() {
    const allColors = this.props.palettes.map(p => p.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    const randColor = allColors[rand];
    this.setState({colors: [...this.state.colors, randColor] });
  }

  clearColors() {
    this.setState({colors: []})
  }
  
  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    const paletteIsFull = colors.length >= maxColors;

    return (
      <div className={classes.root}>
        <PaletteFormNav 
          open={open} 
          classes={classes} 
          palettes={palettes} 
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Typography variant="h5">
            Design Your Palette
          </Typography>
          <div>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={this.clearColors}
            >
              Clear Palette
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={this.addRandomColor}
              disabled={paletteIsFull}
            >
              {paletteIsFull ? "Palette is full": "RANDOM COLOR"}
            </Button>
          </div>
          <ChromePicker 
            color={this.state.currentColor} 
            onChangeComplete={this.updateCurrentColor}
          />
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator 
              value={this.state.newColorName} 
              name="newColorName"
              onChange={this.handleChange}
              validators={["required", "isColorNameUnique", "isColorUnique"]}
              errorMessages={[
                "this field is required", 
                "color name must be unique", 
                "color already used"
                ]}
            />
            <Button 
              variant="contained" 
              color="primary" 
              style={{backgroundColor: paletteIsFull ? "lightgrey" : this.state.currentColor}}
              type="submit"
              disabled={paletteIsFull}
            >
              {paletteIsFull ? "Palette is full": "ADD COLOR"}
            </Button>
          </ValidatorForm>
           
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
            <DraggableColorList 
              colors={this.state.colors}
              onSortEnd={this.onSortEnd}
              removeColor={this.removeColor} 
              axis="xy"
            />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);


/*
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import DraggableColorBox from './DraggableColorBox.js';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
*/