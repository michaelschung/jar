'use strict';

import React, { Component } from 'react'
import {
	Alert,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	Keyboard,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

import DeadlinePage from '../pages/DeadlinePage'

const dismissKeyboard = require('dismissKeyboard');

const styles = StyleSheet.create({
	container: {
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingTop: 85,
		paddingLeft: 40,
		marginTop: 80,
	},

	textPrompt: {
		color: 'black',
		fontSize: 30,
		fontWeight: '500',
		fontFamily: 'Avenir',
		marginBottom: 20,
	},

	textInput: {
		height: 30,
		width: 300,
		fontSize: 20,
		fontWeight: '400',
		fontFamily: 'Avenir',
	},

	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 290,
	},

	backButton: {
		borderColor: '#319bce',
		borderWidth: 1,
		justifyContent: 'center',
		top: 50,
		marginBottom: 0,
		borderRadius: 10,
		minHeight: 50,
		minWidth: 50,
		height: 40,
		width: 100,
		alignSelf: 'flex-start'
	},

	nextButton: {
		borderColor: '#319bce',
		borderWidth: 1,
		justifyContent: 'center',
		top: 50,
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
		color: '#319bce',
		alignSelf: 'center',
		fontSize: 25,
		marginTop: 9,
		fontWeight: '500',
		fontFamily: 'Avenir',
	}
});


class CreatePage extends Component {
	constructor(props) {
		super(props);
		this.state = {renderPlaceholderOnly: true, text: ''};
	}

	onPressBack() {
		this.props.navigator.pop()
	}

	onPressNext() {

		this.props.currentTask.name = this.state.text;
		this.props.currentTask.completed = false;

		this.props.navigator.push({
			title: 'Deadline',
			component: DeadlinePage,
			passProps: {addTask: this.props.addTask, currentTask: this.props.currentTask},
			leftButtonTitle: 'Cancel',
			onLeftButtonPress: () => this.props.navigator.popToTop(0)
		});
	}

	render() {
		console.log('rendering CreatePage');
		return (
			<TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
				<View style={styles.container}>

					<Text style={styles.textPrompt}>What's the task?</Text>
					<View style={{borderBottomColor: '#d3d3d3', borderBottomWidth: 1}}>
						<TextInput
							autoCorrect={true}
							style={styles.textInput}
							multiline={false}
							onChangeText={(text) => this.setState({text})}
						/>
					</View>

					<View style={styles.buttonContainer}>

						<TouchableOpacity style={styles.backButton} onPress={() => this.onPressBack()}>
							<Text style={styles.buttonText}>Back</Text>
						</TouchableOpacity>


						<TouchableOpacity style={styles.nextButton} onPress={() => this.onPressNext()}>
							<Text style={styles.buttonText}>Next</Text>
						</TouchableOpacity>

					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

export default CreatePage;