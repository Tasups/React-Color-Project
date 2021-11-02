import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '../node_modules/@material-ui/icons/Check.js';
import CloseIcon from '../node_modules/@material-ui/icons/Close.js';
import MiniPalette from './MiniPalette.js';
import bg from './bg.svg';
import blue from '../node_modules/@material-ui/core/colors/blue.js';
import red from '../node_modules/@material-ui/core/colors/red.js';

const styles = {
  root: {
    /* background by SVGBackgrounds.com */
    backgroundColor: "#07A0AA",
    backgroundImage: `url("${bg}")`,
    height: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center"
    },
  container: {
    width: "90%",
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  
  nav: {
    fontSize: "1.5rem",
    color: 'white',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center', 
    '& a': {
      color: "white", 
      textDecoration: "none",
      fontSize: "1.25rem"
    }
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '5%',
    paddingBottom: "1rem",
    marginBottom: "1rem"
  },
  ["@media screen and (max-width: 980px)"]: {
  palettes: {
    gridTemplateColumns: 'repeat(2, 48%)'
  }
},
["@media screen and (max-width: 615px)"]: {
  palettes: {
    gridTemplateColumns: 'repeat(1, 80%)',
    justifyContent: "center",
    gridGap: "2rem"
  }
}
}

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      deletingId: ""
    }
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.goToPalette = this.goToPalette.bind(this);
  }
  
  openDialog(id) {
    this.setState({ openDeleteDialog: true, deletingId: id })
  }
  
  closeDialog() {
    this.setState({ openDeleteDialog: false, deletingId: "" })
  }
  
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }
  
  handleDelete() {
    this.props.deletePalette(this.state.deletingId)
    this.closeDialog()
  }
  
  render() {
    const { palettes, classes, deletePalette } = this.props;
    const { openDeleteDialog, deletingId } = this.state;
    return(
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <div className={classes.palettes}>
            {palettes.map(palette => {
           return <MiniPalette 
                    {...palette} 
                    handleClick={this.goToPalette}
                    //handleDelete={deletePalette}
                    openDialog={this.openDialog}
                    key={palette.id}
                    id={palette.id}
                  />
          })}
          </div>
        </div>
        <Dialog 
          open={openDeleteDialog} 
          aria-labelledby="delete-dialog-title" 
          onClose={this.closeDialog}
        >
          <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: blue[100], color: blue[700] }}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
                <ListItemText>
                  Delete
                </ListItemText>
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[700] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
                <ListItemText>
                  Cancel
                </ListItemText>
            </ListItem>
          </List>
        </Dialog>
      </div>
      )
  }
}

export default withStyles(styles)(PaletteList);