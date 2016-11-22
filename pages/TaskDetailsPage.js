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
    flexDirection: 'column',
    flex: 1,
    paddingTop: 74,
    margin: 12,
  },
  taskName: {
  	fontSize: 24,
  },
  detailsContainer: {
    marginTop: 20,
    flexDirection: 'row',
  	flex: 2,
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
  buttonsContainer: {
  	flex: 1,
  	alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#319bce',
    marginBottom: 7,
    borderRadius: 15,
    minHeight: 75,
    minWidth: 250,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '500',
  	color: 'white',
  	alignSelf: 'center',
  	fontSize: 24,
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
    /* Get number of days between now and due date */
    var dueDate = new Date(this.props.due)
    var now = new Date()
    var timeDiff = Math.abs(now.getTime() - dueDate.getTime())
    var daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log(daysLeft)

		return (
			<View style={styles.container}>
        {/* Details about task */}
				<View style={styles.detailsContainer}>
          <View style={styles.textDetailsContainer}>
            <View style={styles.taskNameTextContainer}>
              <Text style={styles.taskNameText}>{this.props.name}</Text>
            </View>
            <View style={styles.dueAndTimeContainer}>
              <View style={styles.dueInTextContainer}>
                <Text style={styles.label}>Due:</Text>
                {/* Use urgent style if task is due within 24 hours (1 day) */}
                <Text style={daysLeft > 1 ? styles.dueInText : styles.dueInTextUrgent}>{numDays}</Text>
              </View>
              <View style={styles.timeToCompleteTextContainer}>
                <Text style={styles.label}>Will Take:</Text>
                <Text style={styles.timeToCompleteText}>5 min</Text>
              </View>
            </View>
          </View>
          <View style={styles.taskOwnerImageContainer}>
            <Image source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }} style={styles.ownerImage} />
          </View>
				</View>

        {/* Action buttons */}
				<View style={styles.buttonsContainer}>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Transfer Task</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>Complete Task</Text>
					</TouchableOpacity>
				</View>

			</View>
		);
	}
}


export default TaskDetailsPage;


