
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
    fontFamily: 'Avenir',
  },
});

class NotesInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      hasNote: false
    };
  }

  updateTextFocus = () => {
    // console.log("Focus: " + this.state.text)
    if (!this.state.hasNote) {
      this.state.text = '';
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
          placeholder={'Add a note...'}
          value = {this.state.text}
        />
      </View>
    );
  }
}

export default NotesInput;