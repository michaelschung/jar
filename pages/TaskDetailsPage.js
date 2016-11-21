'use strict';

import React, { Component } from 'react'
import TaskRowItem from '../components/TaskRowItem'
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableHighlight,
	ActivityIndicator,
	Image,
	ListView,
	TouchableOpacity,
} from 'react-native';

var moment = require('moment');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 74,
    margin: 12,
  },
  taskName: {
  	fontSize: 24,
  },
  due: {
  	fontSize: 18,
  },
  detailsContainer: {
  	flex: 1,
  },
  buttonsContainer: {
  	flex: 1,
  	alignItems: 'center',
  },
  button: {
    backgroundColor: '#319bce',
    marginBottom: 7,
    borderRadius: 15,
    minHeight: 75,
    minWidth: 250,
  },
  buttonText: {
  	color: 'white',
  	alignSelf: 'center',
  	fontSize: 18,
  }
});

class TaskDetailsPage extends Component {
	constructor(props) {
    super(props);
    this.state = {renderPlaceholderOnly: true};
  }

	render() {
		console.log('rendering details page');
		var numDays = moment(this.props.due).fromNow();
		return (
			<View style={styles.container}>
				<View style={styles.detailsContainer}>
					<Text style={styles.taskName}>{this.props.name}</Text>
					<Text style={styles.due}>{numDays}</Text>
				</View>
				<View style={styles.buttonsContainer}>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Complete Task</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Transfer Task</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}


export default TaskDetailsPage;


