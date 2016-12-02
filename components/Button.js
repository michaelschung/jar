
import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet,
  TextInput,
  TouchableOpacity
   } from 'react-native';

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '500',
    color: 'white',
    alignSelf: 'center',
    fontSize: 24,
  },
});

class Button extends Component {
  /*
   * Expects the following properties:
   *
   * .text - string representing text that will be on button
   * .size - one of 'small', 'medium', 'large'
   * .color - string representing color code
   * .onPress - callback function that will be called when button is pressed
   * .textColor - optional string for text color (default text color is white)
   */
  constructor(props) {
    super(props);
  }


  render() {

    // Default sizes are those for medium button
    buttonStyles = {minHeight: 42, minWidth: 150, borderRadius: 8};
    if (this.props.size == 'small') {
      buttonStyles = {minHeight: 18, minWidth: 63, borderRadius: 4};
    } else if (this.props.size == 'large') {
      buttonStyles = {minHeight: 75, minWidth: 250, borderRadius: 15}
    }
    // Add color style
    buttonStyles['backgroundColor'] = this.props.color

    // Styles for button text
    buttonTextStyles = {};
    if (this.props.textColor) {
      buttonTextStyles['color'] = this.props.textColor;
    }

    return (
      <TouchableOpacity style={[styles.button, buttonStyles]} onPress={this.props.onPress} >
        <Text style={[styles.buttonText, buttonTextStyles]}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

export default Button;