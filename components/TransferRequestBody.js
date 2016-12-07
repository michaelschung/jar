
import React, { Component } from 'react'
import { 
	View, 
	Text, 
	StyleSheet,
	TextInput,
  Image,
	 } from 'react-native';

var moment = require('moment');

const styles = StyleSheet.create({
	/* From user name */
	senderName: {
		textAlign: 'center',
		fontSize: 22,
		margin: 10,
    fontFamily: 'Avenir',
	},

	/* Task name */
	taskName: {
		textAlign: 'center',
		fontSize: 22,
		fontWeight: '700',
		margin: 10,
    fontFamily: 'Avenir',
	},

	/* Details */
	label: {
		textAlign: 'left',
		fontSize: 20,
    fontFamily: 'Avenir',
	},
	detailsContainer: {
		flexDirection: 'column',
		margin: 10,
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
});

class TransferRequestBody extends Component {
  /*
   * Expects the following properties:
   *
   * .task - object representing task being transfered
   *    Should contain 'name', 'due', and 'timeToComplete' fields
   */
  constructor(props) {
    super(props);
  }


	render() {
		console.log('rendering TransferRequestBody');
		var numDays = moment(this.props.task.due).fromNow();
		/* Get number of days between now and due date */
		var dueDate = new Date(this.props.task.due)
		var now = new Date()
		var timeDiff = Math.abs(now.getTime() - dueDate.getTime())
		var daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

		return (
			<View>
				{/* Name of user who sent request */}
        <View style={{flexDirection: 'column', margin: 10, alignItems: 'center'}}>
          <Image source={{ uri: this.props.task.owner.picURL }} style={{height: 70, width: 70, borderRadius: 35, marginBottom: 5}} />
          <Text style={{fontSize: 18, fontWeight: '500', fontFamily: 'Avenir'}}>{this.props.task.owner.firstName}</Text>
        </View>
				{/* Task name */}
				<Text style={styles.taskName}>{this.props.task.name}</Text>

				{/* Task details */}
				<View style={styles.detailsContainer}>
					<View style={styles.dueInTextContainer}>
						<Text style={styles.label}>Due:</Text>
						{/* Use urgent style if task is due within 24 hours (1 day) */}
						<Text style={daysLeft > 1 ? styles.dueInText : styles.dueInTextUrgent}> {numDays}</Text>
					</View>
					<View style={styles.timeToCompleteTextContainer}>
						<Text style={styles.label}>Will Take:</Text>
						<Text style={styles.timeToCompleteText}>{this.props.task.timeToComplete}</Text>
					</View>
				</View>
			</View>
		);
	}
}

export default TransferRequestBody;