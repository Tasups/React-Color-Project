import React, { Component } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';




class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      newPaletteName: ""
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value => 
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }
  
  handleChange(evt){
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  
  handleClickOpen() {
    this.setState({ open: true});
  }

  handleClose() {
    this.setState({ open: false});
  }
  
  render() {
    const { newPaletteName } = this.state;

    return (
    <div>
      <Button variant="outlined" onClick={this.handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog 
        open={this.state.open} 
        onClose={this.handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
                <TextValidator 
                  label="Palette Name" 
                  name="newPaletteName"
                  value={newPaletteName} 
                  onChange={this.handleChange}
                  validators={["required", "isPaletteNameUnique"]}
                  errorMessages={[
                  "this field is required",
                  "palette name already used"
                  ]}
                />
                <Button 
                  variant="contained" 
                  color="primary" 
                  type="Submit"
                >
                Save Palette
                </Button>
              </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={this.handleClose} color='primary'>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
  }
}

export default PaletteMetaForm;
