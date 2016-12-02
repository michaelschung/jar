'use strict';

import React, { Component } from 'react'
import {
	Alert,
	Image,
	DatePickerIOS,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

import OverviewPage from '../pages/OverviewPage'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 74,
    paddingLeft: 40,
    marginTop: 80
  },

  textPrompt: {
  	color: 'black',
  	fontSize: 30,
  	fontWeight: 'bold',
  	marginBottom: 20
  },

  textInput: {
  	height: 30,
  	width: 300,
  	fontSize: 20,
  },

  nextButton: {
    backgroundColor: '#319bce',
    justifyContent: 'center',
    top: 50,
    marginBottom: 0,
    borderRadius: 10,
    minHeight: 50,
    minWidth: 50,
    height: 40,
    width: 100
  },

  buttonText: {
  	color: 'white',
  	alignSelf: 'center',
  	fontSize: 25,
  },

  datePicker: {
  	height: 40
  }

});

class Heading extends React.Component {
  render() {
    return (
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          {this.props.label}
        </Text>
      </View>
    );
  }
}


class DurationPage extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	renderPlaceholderOnly: true,
	    	duration: 0,
	    	date: this.props.date,
    		timeZoneOffsetInHours: this.props.timeZoneOffsetInHours
	   	};
	}

	onPressNext() {
		this.props.currentTask.timeToComplete = '5 min';

		this.props.navigator.push({
			title: 'Overview',
			component: OverviewPage,
			passProps: {addTask: this.props.addTask, currentTask: this.props.currentTask}
		});

	}

	onDurationChange = (duration) => {
    	this.setState({duration: duration});
  	};

	render() {
		console.log('rendering jar page');
		return (
			<View style={styles.container}>
				<Text style={styles.textPrompt}>How long will it take?</Text>
				<View style={{borderBottomColor: '#d3d3d3', borderBottomWidth: 1}}>
					<TextInput
				    	style={styles.textInput}
				    	multiline={false}
				    	onChangeText={(text) => this.setState({text})}
				    />
				</View>

				<Heading label="Date picker" />

		        <DatePickerIOS
		        	style={styles.datePicker}
		        	date={this.state.date}
		        	mode="time"
		        	timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
		        	onDateChange={this.onDurationChange}
		        	minuteInterval={10}
		        />

				<TouchableOpacity style={styles.nextButton} onPress={() => this.onPressNext()}>
					<Text style={styles.buttonText}>Next</Text>
				</TouchableOpacity>

				
			</View>

		);
	}
}


export default DurationPage;


