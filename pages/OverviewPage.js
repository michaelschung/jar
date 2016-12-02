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
    Dimensions,
} from 'react-native';

import NotesInput from '../components/NotesInput'

const window = Dimensions.get('window');
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
		fontFamily: 'Avenir',
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
		marginBottom: 30,
		borderRadius: 10,
		minHeight: 50,
		minWidth: 50,
		height: 80,
		width: 250,
		left: window.width/2 - 125,
    },

    buttonText: {
		color: 'white',
		alignSelf: 'center',
		fontSize: 25,
		fontFamily: 'Avenir',
    },

    taskName: {
		fontSize: 24,
		fontFamily: 'Avenir',
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
		fontFamily: 'Avenir',
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
		fontFamily: 'Avenir',
    },
    dueInTextUrgent: {
		color: 'red',
		textAlign: 'right',
		fontSize: 20,
		fontFamily: 'Avenir',
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
		fontFamily: 'Avenir',
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
    	position: 'relative',
    	top: -50,
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
		fontFamily: 'Avenir',
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
		fontFamily: 'Avenir',
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
		fontFamily: 'Avenir',
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
			{
				firstName: 'Michael',
				lastName: 'Chung',
				isMe: true,
				picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/Michael.jpg',
			},
			{
				firstName: 'Evan',
				lastName: 'Lin',
				isMe: false,
				picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/Evan.jpg',
			},
			{
				firstName: 'Tessera',
				lastName: 'Chin',
				isMe: false,
				picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/Tessera.jpg',
			},
			{
				firstName: 'David',
				lastName: 'Morales',
				isMe: false,
				picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/David.JPG',
			},
		]

		var numMembers = members.length;

		this.props.currentTask.owner = members[Math.floor(Math.random() * numMembers)];
		this.props.addTask(this.props.currentTask);

		this.props.navigator.popToTop(0);
	}

	// small grammar correction
	dayOrDays(daysRemaining) {
		return daysRemaining <= 1 ? "day" : "days";
	}

	setNotes = (text) => {
		// console.log("NOTES:", text);
		this.props.currentTask.notes = text;
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
						{/*
						<TextInput
							style={styles.notes}
							autoCorrect={true}
							multiline={true}
							numberOfLines={6}
							onChangeText={this.setNotes}
							placeholder={'Add a note...'}
							value={this.state.text}
						/>
						*/}
						<NotesInput
							task={this.props.currentTask}
						/>
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