'use strict';

import React, { Component } from 'react'
import {
	Alert,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

import NotesInput from '../components/NotesInput'

const dismissKeyboard = require('dismissKeyboard');


const styles = StyleSheet.create({
  container: {
	flexDirection: 'column',
	flex: 1,
	paddingTop: 74,
	margin: 12,
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

  assignButton: {
    backgroundColor: '#319bce',
    justifyContent: 'center',
    marginBottom: 0,
    borderRadius: 10,
    minHeight: 50,
    minWidth: 50,
    height: 80,
    width: 250
  },

  buttonText: {
  	color: 'white',
  	alignSelf: 'center',
  	fontSize: 25,
  },

  taskName: {
	fontSize: 24,
  },
  detailsContainer: {
	marginTop: 20,
	flexDirection: 'row',
	flex: 1,
  },
  textDetailsContainer: {
	marginLeft: 20,
	flexDirection: 'column',
	flex: 1
  },
  taskNameTextContainer: {
	marginTop: 15,
	alignSelf: 'stretch',
	marginBottom: 20,
  },
  taskNameText: {
	fontSize: 24,
	fontWeight: '500',
  },
  label: {
	textAlign: 'left',
	fontSize: 20,
  },
  dueAndTimeContainer: {
	flexDirection: 'column',
  },
  dueInTextContainer: {
	justifyContent: 'space-between',
	alignSelf: 'stretch',
	flexDirection: 'row',
	marginBottom: 3,
  },
  dueInText: {
	color: '#319bce',
	textAlign: 'right',
	fontSize: 20,
  },
  dueInTextUrgent: {
	color: 'red',
	textAlign: 'right',
	fontSize: 20,
  },
  timeToCompleteTextContainer: {
	justifyContent: 'space-between',
	alignSelf: 'stretch',
	flexDirection: 'row',
	marginTop: 3,
  },
  timeToCompleteText: {
	textAlign: 'right',
	fontSize: 20,
  },
  taskOwnerImageContainer: {
	flex: 1,
	alignItems: 'flex-end',
  },
  ownerImage: {
	marginRight: 20,
	height: 100,
	width: 100,
	borderRadius: 50,
  },

  /* Styling for notes */
  notesContainer: {
	marginTop: -20,
	marginLeft: 20,
	flex: 1,
	flexDirection: 'column',
	alignItems: 'stretch',
  },

  /* Styling for separator */
  separator: {
	borderBottomWidth: 2,
	borderBottomColor: '#C7C7CD',
	marginLeft: 20,
	marginRight: 20,
  },

  /* Styling for buttons */
  buttonsContainer: {
	marginTop: 20,
	flex: 1,
	alignItems: 'center',
  },
  button: {
	justifyContent: 'center',
	backgroundColor: '#319bce',
	marginBottom: 15,
	borderRadius: 15,
	minHeight: 75,
	minWidth: 250,
	alignItems: 'center',
  },
  disabledButton: {
	backgroundColor: '#979797',
  },
  buttonText: {
	fontWeight: '500',
	color: 'white',
	alignSelf: 'center',
	fontSize: 24,
  },

  /* Styling for carousel */
  carousel: {
	flex: 1,
	flexDirection: 'column',
	margin: 20,
  },
  carouselHeader: {
	flexDirection: 'row',
	alignItems: 'stretch',
	justifyContent: 'space-between',
  },
  carouselHeaderText: {
	textAlign: 'left',
	fontSize: 16,
	fontWeight: '900',
  },
  carouselCancel: {
	justifyContent: 'center',
  },
  carouselCancelButton: {
	alignItems: 'center',
	backgroundColor: '#D8D8D8',
	height: 30,
	width: 30,
	borderWidth: 1,
	borderRadius: 60,
  },
  cancelText: {
	textAlign: 'center',
	fontSize: 20,
	fontWeight: 'bold',
  },
  carouselScrollView: {
	height: 50,
	margin: 20,
  },
  userContainer: {
	flexDirection: 'column',
	margin: 10,
	alignItems: 'center',
  },
  userImage: {
	height: 60,
	width: 60,
	borderRadius: 30,
	marginBottom: 5,
  },
  userName: {}

});


class OverviewPage extends Component {
	constructor(props) {
	    super(props);
	    this.state = {renderPlaceholderOnly: true};
	}

	daysRemaining() {
		var dueDate = new Date(this.props.currentTask.due)
		var now = new Date()
		var timeDiff = Math.abs(now.getTime() - dueDate.getTime())
		var daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
		return daysLeft;
	}

	onPressAssign() {

		var members = [
			{name: 'Michael', picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/Michael.jpg'},
			{name: 'Evan', picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/Evan.jpg'},
			{name: 'David', picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/David.JPG'},
			{name: 'Tessera', picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/Tessera.jpg'}
		]

		var numMembers = members.length;

		this.props.currentTask.owner = members[Math.floor(Math.random() * numMembers)];
		this.props.currentTask.isMyTask = this.props.currentTask.owner.name === 'Michael';
		this.props.addTask(this.props.currentTask);

		this.props.navigator.popToTop(0);
	}

	// small grammar correction
	dayOrDays(daysRemaining) {
		return daysRemaining <= 1 ? "day" : "days";
	}

	render() {
		console.log('rendering jar page');
		return (
			<TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
				<View style={styles.container}>
			  	{/* Details about task */}
					<View style={styles.detailsContainer}>
						<View style={styles.textDetailsContainer}>
							<View style={styles.taskNameTextContainer}>
								<Text style={styles.taskNameText}>{this.props.currentTask.name}</Text>
						  	</View>
						  	<View style={styles.dueAndTimeContainer}>
								<View style={styles.dueInTextContainer}>
							  		<Text style={styles.label}>Due:</Text>
							  		{/* Use urgent style if task is due within 24 hours (1 day) */}
							  		<Text style={this.daysRemaining() > 1 ? styles.dueInText : styles.dueInTextUrgent}>{this.daysRemaining()} {this.dayOrDays(this.daysRemaining())}</Text>
								</View>
								<View style={styles.timeToCompleteTextContainer}>
							  		<Text style={styles.label}>Will Take:</Text>
							  		<Text style={styles.timeToCompleteText}>{this.props.currentTask.timeToComplete}</Text>
								</View>
						 	</View>
						</View>
					</View>

					<View style={styles.notesContainer}>
						<Text style={styles.label}>Notes:</Text>
						<NotesInput />
					</View>

				  	<View style={styles.separator}></View>

					<TouchableOpacity style={styles.assignButton} onPress={() => this.onPressAssign()}>
						<Text style={styles.buttonText}>Assign Task</Text>
					</TouchableOpacity>


				</View>
			</TouchableWithoutFeedback>


		);
	}
}


export default OverviewPage;


