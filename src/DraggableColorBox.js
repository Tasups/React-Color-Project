import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { withStyles } from '@material-ui/styles';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';


const styles = {
  root: {
    width: '20%',
    height: "25%",
    margin: "0 auto",
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    "&:hover svg": {
      color: "white",
      transform: "scale(1.33)"
    }
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between"
  },
  deleteIcon: {
    transition: "all 0.2s ease-in-out"
  }
};

const DraggableColorBox = SortableElement (({classes, handleClick, name, color}) => {
  //const { classes, handleClick, name, color } = props;
    return(
      <div 
        className={classes.root} 
        style={{backgroundColor: color}}
      >
        <div className={classes.boxContent}>
          <span>{name}</span>
          <DeleteSharpIcon className={classes.deleteIcon} onClick={handleClick} />
        </div>
      </div>
      );
});

export default withStyles(styles)(DraggableColorBox);