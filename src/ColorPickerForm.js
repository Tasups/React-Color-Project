import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';


const styles ={
  picker: {
    width: "100% !important",
    marginTop: "2rem"
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "2rem",
    fontSize: "1.5rem"
  },
  colorNameInput: {
    width: "100%",
    height: "40px",
  }
}

class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: "orange",
      newColorName: "",
    };
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", value => 
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
  );
    ValidatorForm.addValidationRule("isColorUnique", value => 
      this.props.colors.every(
        ({ color }) => color !== this.state.currentColor
      )
  );
}

  updateCurrentColor(newColor) {
    this.setState({currentColor: newColor.hex});
  }
  
  handleChange(evt){
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  
  handleSubmit() {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    this.props.addNewColor(newColor);
    this.setState({newColorName: ""})
  }
  
  render() {
    const { paletteIsFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;
    return(
      <div>
        <ChromePicker 
          color={currentColor} 
          onChangeComplete={this.updateCurrentColor}
          className={classes.picker}
        />
         <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
           <TextValidator 
             placeholder="Color Name"
             value={newColorName} 
             className={classes.colorNameInput}
             name="newColorName"
             margin="normal"
             variant="filled"
             onChange={this.handleChange}
             validators={["required", "isColorNameUnique", "isColorUnique"]}
             errorMessages={[
              "this field is required", 
              "color name must be unique", 
              "color already used"
            ]}
           />
          <Button 
            className={classes.addColor}
            variant="contained" 
            color="primary" 
            style={{backgroundColor: paletteIsFull ? "lightgrey" : currentColor}}
            type="submit"
            disabled={paletteIsFull}
          >
            {paletteIsFull ? "Palette is full": "ADD COLOR"}
          </Button>
        </ValidatorForm>
      </div>
      )
  }
}

export default withStyles(styles)(ColorPickerForm);