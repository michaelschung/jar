'use strict';

import React, { Component } from 'react'
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

var CalendarPickerModule = require('react-native-calendar-picker')

class CalendarPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: new Date()
    };
  }

  // getInitialState: function() {
  //   return {
  //     date: new Date(),
  //   };
  // },

  onDateChange(date) {
    this.setState({ date: date });
  }

  render() {
    return (
      <View style={styles.container}>

        <CalendarPicker 
          selectedDate={this.state.date}
          onDateChange={this.onDateChange}
          screenWidth={Dimensions.get('window').width}
          selectedBackgroundColor={'#5ce600'} />

        <Text style={styles.selectedDate}> Date: { this.state.date.toString() } </Text>
      </View>
    );
  }
})