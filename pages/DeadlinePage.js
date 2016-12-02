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
	Dimensions
} from 'react-native';

import DurationPage from '../pages/DurationPage'
import Calendar from 'react-native-calendar'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 74,
    marginTop: 80
  },

  textPrompt: {
  	color: 'black',
  	fontSize: 30,
  	fontWeight: 'bold',
  	marginBottom: 20,
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

  buttonText: {
  	color: 'white',
  	alignSelf: 'center',
  	fontSize: 25,
  }

});


class DeadlinePage extends Component {
	constructor(props) {
	    super(props);
	    this.state = {renderPlaceholderOnly: true};
	}

	onPressNext() {

		var today = new Date();
		this.props.currentTask.due = new Date().setDate(today.getDate() + 1);

		this.props.navigator.push({
			title: 'Duration',
			component: DurationPage,
			passProps: {addTask: this.props.addTask, currentTask: this.props.currentTask}
		})
	}

	render() {
		console.log('rendering jar page');
		return (
			<View style={styles.container}>

				<Text style={styles.textPrompt}>When's the deadline?</Text>
				<View style={{borderBottomColor: '#d3d3d3', borderBottomWidth: 1, margin:10}}>
					<Calendar
						showControls={true}               // False hides prev/next buttons. Default: False
						prevButtonText={'Prev'}           // Text for previous button. Default: 'Prev'
						nextButtonText={'Next'}           // Text for next button. Default: 'Next'
						customStyle={{dayButton:{width:(Dimensions.get('window').width-20) / 7},
										dayButtonFiller:{width:(Dimensions.get('window').width-20) / 7}}} // Customize any pre-defined styles
						weekStart={0} // Day on which week starts 0 - Sunday, 1 - Monday, 2 - Tuesday, etc, Default: 1
						/>
				</View>

				<TouchableOpacity style={styles.nextButton} onPress={() => this.onPressNext()}>
					<Text style={styles.buttonText}>Next</Text>
				</TouchableOpacity>

				
			</View>

		);
	}
}


export default DeadlinePage;


