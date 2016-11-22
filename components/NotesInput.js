
import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet,
  TextInput
   } from 'react-native';

const styles = StyleSheet.create({
  notes: {
    height: 120,
    color: '#8F8E94',
    fontSize: 16,
  },
});

class NotesInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Add a note...',
      hasNote: false
    };
  }

  updateTextFocus = () => {
    console.log("Focus: " + this.state.text)
    if (!this.state.hasNote) {
      this.state.text = '';
    }
  }

  updateTextBlur = () => {
    console.log("Blur: " + this.state.text)
    if (this.state.text == '') {
      this.state.text = 'Add a note...';
      this.state.hasNote = false;
    } else {
      this.state.hasNote = true;
    }
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.notes}
          autoCorrect = {true}
          multiline = {true}
          numberOfLines = {6}
          onChangeText = {(text) => this.setState({text:text, hasNote: true})}
          onFocus = {() => this.updateTextFocus()}
          onBlur = {() => this.updateTextBlur()}
          value = {this.state.text}
        />
      </View>
    );
  }
}

export default NotesInput;