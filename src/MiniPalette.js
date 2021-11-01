import React, { Component } from 'react';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px", 
    padding: "0.5rem",
    paddingBottom: "2rem",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    "&:hover svg": {
      opacity: 1
    }
  },
  ["@media screen and (max-width: 615px)"]: {
  root: {
    height: "170px",
  }
},
  colors: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "lightgrey",
    height: '150px',
    width: '100%',
    borderRadius: "6px",
    overflow: "hidden"
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "1rem",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative"
  },
  ["@media screen and (max-width: 980px)"]: {
  title: {
    paddingBottom: "0.8rem",
  }
},
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem"
  },
  miniColor: {
    border: "none",
    height: '25%',
    width: '20%',
    display: 'inline-block',
    margin: '0 auto',
    position: 'relative',
    marginBottom: "-3.5px"
  },
  deleteIcon: {
    backgroundColor: "#eb3d30",
    width: "20px",
    height: "20px",
    color: "white",
    position: "absolute",
    right: "0px",
    top: "0px",
    padding: "6px",
    zIndex: 10,
    opacity: 0,
    transition: "all 0.3s ease-in-out"
  }
}

class MiniPalette extends Component {
  constructor(props) {
    super(props);
    this.deletePalette = this.deletePalette.bind(this);
  }
  
  deletePalette(e) {
    this.props.openDialog(this.props.id);
    e.stopPropagation()
  }
  
  render() {
    const { classes, paletteName, emoji, colors, handleClick } = this.props;
    const miniColorBoxes = colors.map(color => {
      return <div 
        className={classes.miniColor} 
        style={{ backgroundColor: color.color}}
        key={color.name}
      />
    })
  
  return (
    <div className={classes.root} onClick={handleClick}> 
      <DeleteSharpIcon className={classes.deleteIcon} onClick={this.deletePalette}/>
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName}<span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  )
  }
  
}

export default withStyles(styles)(MiniPalette);