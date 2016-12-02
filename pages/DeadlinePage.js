'use strict';

import React, { Component } from 'react'
import {
	Alert,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Dimensions,
	DatePickerIOS
} from 'react-native';


import DurationPage from '../pages/DurationPage'
import Calendar from 'react-native-calendar'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 80
  },

  textPrompt: {
  	color: 'black',
  	fontSize: 30,
  	paddingLeft: 40,
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

  calendarContainer: {
  	borderBottomColor: '#d3d3d3',
  	borderBottomWidth: 1,
  	marginLeft: 15,
  	marginRight: 15
  },

  calendar: {
  	marginTop: 0
  },

  buttonContainer: {
  	flex: 1,
  	flexDirection: 'row',
  	marginTop: 0,
  	paddingBottom: 4,
  	paddingLeft: 40
  },

  backButton: {
    backgroundColor: '#319bce',
    justifyContent: 'center',
    marginBottom: 0,
    borderRadius: 10,
    minHeight: 50,
    minWidth: 50,
    height: 40,
    width: 100,
    alignSelf: 'flex-start'
  },

  nextButton: {
    backgroundColor: '#319bce',
    justifyContent: 'center',
    marginBottom: 0,
    borderRadius: 10,
    minHeight: 50,
    minWidth: 50,
    height: 40,
    width: 100,
    marginLeft: 95,
    alignSelf: 'flex-start'
  },

  buttonText: {
  	color: 'white',
  	alignSelf: 'center',
  	fontSize: 25,
  	marginTop: 7
  },

});

const calendarStyle = {
	calendarContainer: {
		backgroundColor: 'white'
	},
  	dayButton: {
  		width:(Dimensions.get('window').width-30) / 7
  	},
	dayButtonFiller: {
		width:(Dimensions.get('window').width-30) / 7
	}
}


class DeadlinePage extends Component {

	static defaultProps = {
    	date: new Date(),
    	timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  	};

	constructor(props) {
	    super(props);
	    this.state = {
	    	renderPlaceholderOnly: true,
	    	date: new Date(),
	    	timeZoneOffsetInHours: this.props.timeZoneOffsetInHours
	    };
	}

	onPressBack() {
		this.props.navigator.pop()
	}

	onPressNext() {

		var today = new Date();
		this.props.currentTask.due = new Date().setDate(today.getDate() + 1);

		this.props.navigator.push({
			title: 'Duration',
			component: DurationPage,
			passProps: {
				addTask: this.props.addTask,
				currentTask: this.props.currentTask,
				date: new Date(),
	    		timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
	    	},
	    	leftButtonTitle: 'Cancel',
			onLeftButtonPress: () => this.props.navigator.popToTop(0)
		})
	}

	onDateChange = (date) => {
		this.setState({date: date});
	}

	render() {
		console.log('rendering jar page');
		return (
			<View style={styles.container}>

				<Text style={styles.textPrompt}>When's the deadline?</Text>
				<View style={styles.calendarContainer}>
					<Calendar
						style={styles.calendar}
						showControls={true}               // False hides prev/next buttons. Default: False
						prevButtonText={'Prev'}           // Text for previous button. Default: 'Prev'
						nextButtonText={'Next'}           // Text for next button. Default: 'Next'
						customStyle={calendarStyle} // Customize any pre-defined styles
						weekStart={0} // Day on which week starts 0 - Sunday, 1 - Monday, 2 - Tuesday, etc, Default: 1
						/>
				</View>

				<DatePickerIOS
	        		date={this.state.date}
			        mode="time"
			        timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
			        onDateChange={this.onDateChange}
			        minuteInterval={10}
        		/>

				<View style={styles.buttonContainer}>

					<TouchableOpacity style={styles.backButton} onPress={() => this.onPressBack()}>
						<Text style={styles.buttonText}>Back</Text>
					</TouchableOpacity>


					<TouchableOpacity style={styles.nextButton} onPress={() => this.onPressNext()}>
						<Text style={styles.buttonText}>Next</Text>
					</TouchableOpacity>

				</View>

				
			</View>

		);
	}
}


export default DeadlinePage;


