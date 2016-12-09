'use strict';

import React, { Component } from 'react'
import TaskRowItem from '../components/TaskRowItem'
import NotesInput from '../components/NotesInput'
import SimpleModal from '../components/SimpleModal'
import ConfirmationModal from '../components/ConfirmationModal'
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	ScrollView,
	TouchableHighlight,
	TouchableWithoutFeedback,
	ActivityIndicator,
	Image,
	ListView,
	TouchableOpacity,
	Keyboard,
	LayoutAnimation,
} from 'react-native';

var moment = require('moment');
const dismissKeyboard = require('dismissKeyboard');

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		flex: 1,
		paddingTop: 74,
		margin: 12,
	},

	/* Styling for details */
	taskName: {
		fontSize: 24,
		fontFamily: 'Avenir',
	},
	detailsContainer: {
		minHeight: 50,
		marginTop: 20,
		flexDirection: 'row',
	},
	detailsTopContainer: {
		justifyContent: 'space-between',
		flexWrap: 'nowrap',
		flexDirection: 'row',
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
		fontSize: 28,
		fontWeight: '500',
		fontFamily: 'Avenir',
	},
	label: {
		textAlign: 'left',
		fontSize: 20,
		fontWeight: '500',
		fontFamily: 'Avenir',
	},
	dueAndTimeContainer: {
		flex: 1,
		position: 'absolute',
		width: 170, /* Hard coded for now */
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
		fontWeight: '400',
		fontFamily: 'Avenir',
	},
	dueInTextUrgent: {
		color: 'red',
		textAlign: 'right',
		fontSize: 20,
		fontWeight: '400',
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
		fontWeight: '400',
		fontFamily: 'Avenir',
	},
	taskOwnerImageContainer: {
		marginLeft: 15,
		flexDirection: 'column',
		alignItems: 'flex-end',
	},
	ownerImage: {
		marginRight: 20,
		height: 100,
		width: 100,
		borderRadius: 50,
	},
	transferImage: {
		marginRight: 20,
		height: 100,
		width: 100,
		borderRadius: 50,
		opacity: .5,
	},
	taskStatusContainer: {
		height: 100,
		width: 100,
		marginTop: 5,
		marginRight: 6,
	},
	status: {
		color: '#f0ad4e',
		fontSize: 18,
		fontWeight: '500',
	},


	/* Styling for notes */
	notesContainer: {
		marginTop: -20,
		marginLeft: 20,
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

	bottomPortionContainer: {
		minHeight: 200,
	},

	/* Styling for buttons */
	buttonsContainer: {
		marginTop: 20,
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
	warnButton: {
		backgroundColor: '#f0ad4e',
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
		fontWeight: '600',
		fontFamily: 'Avenir',
	},
	carouselCancel: {
		justifyContent: 'center',
	},
	carouselCancelButton: {
		height: 17,
		width: 17,
	},
	cancelText: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		fontFamily: 'Avenir',
	},
	carouselScrollView: {
		height: 50,
		margin: 10, 
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
	userName: {
		fontWeight: '500',
		fontFamily: 'Avenir',
	},
	notes: {
		height: 120,
		color: '#8F8E94',
		fontSize: 16,
		fontFamily: 'Avenir',
	},
});




/* Transfer users carousel component */
class TransferToCarousel extends Component {
	constructor(props) {
		super(props);
		/* Construct list of possible users to transfer task to */
		this.transferToList = props.house.filter((user)=>!user.isMe);
	}

	/* Render modal stating transfer request was sent */
	_onPressTransferIcon = (userData) => {
		/* Show modal (done in TaskDetailsPage component)*/
		this.props.showModal(userData)
	}

	renderUser = (userData, index) => {
		return (
			<View key={index}>
				<TouchableOpacity onPress={() => this._onPressTransferIcon(userData)}>
					<View style={styles.userContainer}>
						<Image source={{ uri: userData.picURL }} style={styles.userImage} />
						<Text style={styles.userName}>{userData.firstName}</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	};

	render() {
		return (
			<ScrollView 
				automaticallyAdjustContentInsets={false}
				alwaysBounceHorizontal={false} 
				horizontal={true}
				centerContent = {true}
				style={styles.carouselScrollView} >
				{this.transferToList.map(this.renderUser)}
			</ScrollView>
		);
	}
}


class TaskDetailsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			renderPlaceholderOnly: true,
			selectingTransfer: false,
			showModal: false,
			showMessage: false,
			showConfirmTransferModal: false,
			showConfirmCompleteModal: false,
			showConfirmCancelTransferModal: false,
			showConfirmCompleteModal: false,
			showTransferSentMessage: false,
			showTaskCompletedMessage: false,
			transferSent: this.props.task.isAwaitingTransfer,
			disableComplete: (this.props.task.isAwaitingTransfer || this.props.task.completed),
			taskCompleted: this.props.task.completed,
			showFullTaskName: false,
			notes: '',
		};
	}

	trunc = (str, n) => {
        return str.substr(0,n-1)+(str.length>=n?'...':'');
    }

	componentWillUpdate() {
		LayoutAnimation.easeInEaseOut();
	}

	/* Toggle showing all of task name */
	onPressTaskName = () => {
		this.setState((state) => ({
			showFullTaskName: !this.state.showFullTaskName,
		}));
	}

	/* For rendering transfer carousel when transfer button pressed */
	_onPressTransfer = () => {
		this.setState((state) => ({       
			selectingTransfer: true,
		}));
	}

	/* For removing transfer carousel and rendering buttons when cancel is pressed */
	_onPressCancelTransfer = () => {
		this.setState((state) => ({
			selectingTransfer: false,
		}));
	}

	/* For showing 'confirm transfer request' modal when transfer icon is pressed */
	_onPressTransferIcon = (userData) => {
		this.setState((state) => ({
			showModal: true,
			showMessage: false,
			showConfirmTransferModal: true,
			transferSentTo: userData,
		}));
	}

	/* transfer request confirmed */
	_onConfirmTransferModal = () => {
		this.setState((state) => ({
			selectingTransfer: false,
			showModal: false,
			showMessage: true,
			showConfirmTransferModal: false,
			showTaskTransferedMessage: true,
			transferSentTo: this.state.transferSentTo,
			transferSent: true,
			disableComplete: true,
		}));
		this.props.requestTransfer(this.props.task, this.state.transferSentTo);
	}

	/* For canceling transfer */
	_onPressCancelTransferRequest = () => {
		this.setState((state) => ({
			showModal: true,
			showConfirmCancelTransferModal: true,
		}));
	}

	/* For confirming to cancel transfer request */
	_onConfirmCancelTransferRequest = () => {
		this.setState((state) => ({
			showModal: false,
			showMessage: true,
			showConfirmCancelTransferModal: false,
			showTransferCanceledMessage: true,
			transferSent: false,
			disableComplete: false,
		}));
		this.props.cancelTransfer(this.props.task);
	}

	/* For showing "Task completed" modal */
	_onPressCompleteTask = () => {
		this.setState((state) => ({
			showModal: true,
			showConfirmCompleteModal: true,
		}));
	}

	/* For confirming completion of task */
	_onConfirmCompleteTask = () => {
		this.setState((state) => ({
			showModal: false,
			showConfirmCompleteModal: false,
			disableComplete: true,
			taskCompleted: true,
		}));

		/*
		  Set task as completed for other pages
		*/
		this.props.taskCompleted(this.props.task);
	}

	/* For removing modal */
	_onDismissModal = () => {
		this.setState((state) => ({
			showModal: false,
			showConfirmTransferModal: false,
			showConfirmCompleteModal: false,
			showConfirmCancelTransferModal: false,
			showConfirmCompleteModal: false,
		}));
	}

	setNotes = (text) => {
		// console.log("NOTES:", text);
		this.props.task.notes = text;
	}

	getPlaceholderNotes() {
		return this.props.task.notes == '' ? 'Add a note...' : this.props.task.notes;
	}

	getDefaultNotes() {
		return this.props.task.notes == '' ? '' : this.props.task.notes;
	}

	/* Transfer button */
	TransferButton = () => {
		if (this.state.taskCompleted) {
			return (
				<View style={[styles.button, styles.disabledButton]} >
					<Text style={styles.buttonText}>Transfer Task</Text>
				</View>
			)
		}
		return this.state.transferSent ? (
			<TouchableOpacity style={[styles.button, styles.warnButton]} onPress={this._onPressCancelTransferRequest} >
				<Text style={styles.buttonText}>Cancel Transfer</Text>
			</TouchableOpacity>
		) : (
			<TouchableOpacity style={styles.button} onPress={this._onPressTransfer} >
				<Text style={styles.buttonText}>Transfer Task</Text>
			</TouchableOpacity>
		)
	}

	/* Complete button */
	CompleteButton = () => {
		return this.state.disableComplete ? (
			this.state.taskCompleted ? (
				<View style={[styles.button, styles.disabledButton]} >
					<Text style={styles.buttonText}>Task Completed</Text>
				</View>
			) : (
				<View style={[styles.button, styles.disabledButton]} >
					<Text style={styles.buttonText}>Complete Task</Text>
				</View>
			)
		) : (
			<TouchableOpacity style={styles.button} onPress={this._onPressCompleteTask} >
				<Text style={styles.buttonText}>Complete Task</Text>
			</TouchableOpacity>
		)
	}

	/* Action buttons */
	ActionButtons = () => {
		return (
			<View style={styles.buttonsContainer}>
				{this.TransferButton()}
				{this.CompleteButton()}
			</View>
		)
	}

	/* Bottom of page */
	BottomPortion = () => {
		if (this.props.task.owner.isMe) {
			return (
				this.state.selectingTransfer ?
				this.Carousel() :
				this.ActionButtons()
			)
		}
	}

	/* Carousel */
	Carousel = () => {
		return (
			<View style={styles.carousel}>
				<View style={styles.carouselHeader}>
					<Text style={styles.carouselHeaderText}>Transfer to...</Text>
					<TouchableOpacity style={styles.carouselCancel} onPress={this._onPressCancelTransfer}>
						<Image style={styles.carouselCancelButton} source={require('../assets/x.png')}/>
					</TouchableOpacity>
				</View>
				<TransferToCarousel showModal={this._onPressTransferIcon} house={this.props.house}></TransferToCarousel>
			</View>
		)
	}

	render() {
		var numDays = moment(this.props.task.due).fromNow();
		/* Get number of days between now and due date */
		var dueDate = new Date(this.props.task.due)
		var now = new Date()
		var timeDiff = Math.abs(now.getTime() - dueDate.getTime())
		var daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

		/* 
			Determine whether to show modal or not 
			And define modal to show
		*/
		var modal;
		if (this.state.showModal) {
			/* Modal properties */
			var title, confirmText, confirmCallback, cancelText, cancelCallback;
			confirmText = 'Confirm';
			cancelText = 'Cancel';
			cancelCallback = this._onDismissModal;
			if (this.state.showConfirmTransferModal) {
				title = 'Transfer task to ' + this.state.transferSentTo.firstName +'?';
				confirmCallback = this._onConfirmTransferModal;
			} else if (this.state.showConfirmCompleteModal) {
				title = 'Complete task?';
				confirmCallback = this._onConfirmCompleteTask;
			} else if (this.state.showConfirmCancelTransferModal) {
				title = 'Cancel task transfer?';
				confirmCallback = this._onConfirmCancelTransferRequest;
			}

			modal = (
				<ConfirmationModal
					title={title}
					confirmText={confirmText}
					confirmCallback={confirmCallback}
					cancelText={cancelText}
					cancelCallback={cancelCallback}
				/>
			);
		} else {
			modal = null;
		}

		return (
			<TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
				<View style={styles.container}>
					{/* Details about task */}
					<View style={styles.detailsContainer}>
						<View style={styles.textDetailsContainer}>
							<View style={styles.detailsTopContainer}>
								<View>
									<TouchableWithoutFeedback 
										onPress={this.onPressTaskName} >
										{
											this.state.showFullTaskName ? 
											<View style={styles.taskNameTextContainer}><Text style={styles.taskNameText}>{this.props.task.name}</Text></View>
											:
											<View style={[styles.taskNameTextContainer, {maxWidth: 180}]}><Text style={styles.taskNameText}>{this.trunc(this.props.task.name, 15)}</Text></View>
										}
									</TouchableWithoutFeedback>
									<View style={styles.dueAndTimeContainer}>
										<View style={styles.dueInTextContainer}>
											<Text style={styles.label}>Due: </Text>
											{/* Use urgent style if task is due within 24 hours (1 day) */}
											<Text style={daysLeft > 1 ? styles.dueInText : styles.dueInTextUrgent}>{numDays}</Text>
										</View>
										<View style={styles.timeToCompleteTextContainer}>
											<Text style={styles.label}>Will Take: </Text>
											<Text style={styles.timeToCompleteText}>{this.props.task.timeToComplete}</Text>
										</View>
									</View>
								</View>
								<View style={styles.taskOwnerImageContainer}>
									<Image 
										source={{ uri: this.props.task.isAwaitingTransfer ? this.props.task.isAwaitingTransfer.picURL : this.props.task.owner.picURL }} 
										style={this.props.task.isAwaitingTransfer ? styles.transferImage : styles.ownerImage}
									/>
									<View style={styles.taskStatusContainer}> 
										{
											this.props.task.isAwaitingTransfer ?
											(<Text style={styles.status}>Awaiting Transfer</Text>) :
											null
										}
									</View>
								</View>
							</View>
							
						</View>
					</View>

					{/* Notes */}
					<View style={styles.notesContainer}>
						<Text style={styles.label}>Notes:</Text>
						<TextInput
							style={styles.notes}
							autoCorrect={true}
							multiline={true}
							numberOfLines={6}
							defaultValue={this.getDefaultNotes()}
							onChangeText={this.setNotes}
							placeholder={this.getPlaceholderNotes()}
							value={this.state.text}
						/>
					</View>

					<View style={styles.separator}></View>

					{/* Action buttons, carousel, or nothing (depending on state of page and task owner) */}
					<View style={styles.bottomPortionContainer}>
						{
							this.BottomPortion()
						}
					</View>

					{/* Show modal if transfer request was sent */}
					{
						modal
					}

				</View>
			</TouchableWithoutFeedback>
		);
	}
}

export default TaskDetailsPage;