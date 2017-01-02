'use strict';

import React, { Component } from 'react'
import TaskRowItem from '../components/TaskRowItem'
import CreatePage from '../pages/CreatePage'
import SimpleModal from '../components/SimpleModal'
import TitleBodyButtonsModal from '../components/TitleBodyButtonsModal'
import TransferRequestBody from '../components/TransferRequestBody'
import Button from '../components/Button'
import {
	Alert,
	Modal,
	NavigatorIOS,
	StyleSheet,
	Text,
	TextInput,
	TouchableHighlight,
	View,
	ActivityIndicator,
	Image,
	ListView,
	TouchableOpacity,
	SegmentedControlIOS,
	LayoutAnimation,
} from 'react-native';

import TaskDetailsPage from './TaskDetailsPage.js'

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBIC0SmV3VkB4wBQZ-24TlDyZT1bAMJW3Q",
  authDomain: "jar-backend.firebaseapp.com",
  databaseURL: "https://jar-backend.firebaseio.com",
  storageBucket: "jar-backend.appspot.com"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

var moment = require('moment');

var today = new Date();

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 62,
	},
	list: {
		flex: 1,
	},
	segmentedControl: {
		margin: 12, 
		backgroundColor: 'white',
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		padding: 12,
	},
	taskName: {
		marginLeft: 12,
		fontSize: 18,
		fontWeight: '500',
		fontFamily: 'Avenir',
	},
	photo: {
		height: 45,
		width: 45,
		borderRadius: 22.5,
	},
	transferPhoto: {
		height: 45,
		width: 45,
		borderRadius: 22.5,
		opacity: .5,
	},
	checkBox: {
		height: 45,
		width: 45,
		borderRadius: 22.5,
		backgroundColor: '#319bce',
	},
	checkBoxIcon: {
		height: 45,
		width: 45,
	},
	dueInText: {
		textAlign: 'right',
		flex: 1,
		fontSize: 16,
		fontWeight: '400',
		fontFamily: 'Avenir',
	},
	dueInTextUrgent: {
		textAlign: 'right',
		flex: 1,
		color: 'red',
		fontSize: 16,
		fontWeight: '400',
		fontFamily: 'Avenir',
	},
	separator: {
		flex: 1,
		height: .5,
		backgroundColor: '#8E8E8E',
		padding: 0
	},
	segmentSeparator: {
		flex: 1,
		maxHeight: .5,
		backgroundColor: '#8E8E8E',
		padding: .5
	},
	addButton: {
		marginBottom: 20,
		marginRight: 20,
		position: 'absolute',
		justifyContent: 'center',
		borderRadius: 40,
		minHeight: 50,
		minWidth: 50,
		width: 80,
		height: 80,
		bottom: 20,
		right: 20,
	},
	transferRequestButton: {
		position: 'absolute',
		opacity: 0,
		height: 60,
		width: 180,
		bottom: 0,
	},
	noTasksText: {
		position: 'absolute',
		left: 150,
		top: 138,
		color: '#979797',
		fontFamily: 'Avenir',
		fontSize: 18,
	},

});

class TasksPage extends Component {
	constructor(props) {
		super(props);

		/* 
			Task object
				name: name of the task
				owner: user object from house
				completed: boolean True if task has been completed
				due: JS Date object representing the day the task is due
				timeToComplete: string representing expected time to complete task
				isAwaitingTransfer: user object to whom we requested a transfer, 
					or null if no transfer is requested
		*/

		this.taskList = [];

		// this.ogTaskList = [
		// 	{
		// 		name:'Take out trash', 
		// 		owner: props.house[0],
		// 		completed:false, 
		// 		due:new Date().setDate(today.getDate() + 1),
		// 		timeToComplete: '5 min',
		// 		notes: '',
		// 	},
		// 	{
		// 		name: 'Vacuum',
		// 		owner: props.house[0],
		// 		completed:false,
		// 		due:new Date().setMinutes(today.getMinutes() + 2),
		// 		timeToComplete: '15 min',
		// 		notes: '',
		// 	},
		// 	{
		// 		name:'Call the landlord', 
		// 		owner: props.house[1], 
		// 		completed:false, 
		// 		due:new Date().setDate(today.getDate() + 3),
		// 		timeToComplete: '15 min',
		// 		notes: '',
		// 	},
		// 	{
		// 		name:'Clean room',
		// 		owner: props.house[3], 
		// 		completed:false, 
		// 		due:new Date().setDate(today.getDate() + 4),
		// 		timeToComplete: '30 min',
		// 		notes: '',
		// 	},
		// 	{
		// 		name:'Wash dishes',
		// 		owner: props.house[2],
		// 		completed:false,
		// 		due:new Date().setMinutes(today.getMinutes() + 12),
		// 		timeToComplete: '15 min',
		// 		notes: '',
		// 	},
		// ];

		// this.populateFirebase();

		this.state = {
			taskView: 'My Tasks',
			transferResponseModalVisible: false,
			transferRequestModalVisible: false,
			taskAssignedModalVisible: false,
			deadlineModalVisible: false,
			nextTask: '',
			timerMap: new Map(),
			deadlineTimer: -1,
			// ---------------------------IMPORTANT---------------------------
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			})
		};

		this.tasksRef = database.ref().child('Tasks');

		this.listenForTasks(this.tasksRef);
	}

	listenForTasks(tasksRef) {
		tasksRef.on('value', (snap) => {
			// var taskList = [];
			snap.forEach((child) => {
				this.taskList.push({
					name: child.val().name,
					owner: child.val().owner,
					completed: child.val().completed,
					due: child.val().due,
					timeToComplete: child.val().timeToComplete,
					notes: child.val().notes,
				});
			});

			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.taskList.filter(this.checkTaskIsMine))
			});

			this.sortTaskList();
		});
	}

	// componentDidMount() {
	// 	this.listenForTasks(this.tasksRef);
	// }

	// adds initial tasks to database
	populateFirebase() {
		for(var task in this.ogTaskList) {
			// console.log(task);
			database.ref('Tasks/' + task).set({
				name: this.ogTaskList[task].name,
				owner: this.ogTaskList[task].owner,
				completed: this.ogTaskList[task].completed,
				due: this.ogTaskList[task].due,
				timeToComplete: this.ogTaskList[task].timeToComplete,
				notes: this.ogTaskList[task].notes,
			});
		}
	}

	sortTaskList = () => {

		this.taskList.sort((value1, value2) => {
			// console.log(value1.due);
			// console.log(value2.due);
			if (value1.due > value2.due.getTime)
				return 1;
			if (value1.due < value2.due)
				return -1;
			return 0;
		});

		for (var i = 0; i < this.taskList.length; i++) {
			var task = this.taskList[i];

			var today = new Date();

			if (this.state.deadlineTimer != -1)
				clearTimeout(this.state.deadlineTimer);

			if (task.owner.isMe && !task.completed && task.due > today) {
				// check for completed task
				var timeLeft = (task.due - today)
				this.state.deadlineTimer = 

					setTimeout(() => {
						this.setNextTask('The deadline for "' +  task.name + '" has passed. You will be charged $1.');
						this.setDeadlineModalVisibility(true);
						this.props.changeJarAmount(+1);
						clearTimeout(this);
						this.sortTaskList();
						this.updateDataSource()
					}, timeLeft)

				break;
			}
		}
	}

	trunc = (str, n) => {
          return str.substr(0,n-1)+(str.length>n?'...':'');
    }

	componentWillUpdate() {
		 LayoutAnimation.easeInEaseOut();
	}

	setDeadlineTimer = (id) => {
		this.setState({deadlineTimer: id});
	}

	setTransferResponseModalVisibility = (visible) => {
    	this.setState({transferResponseModalVisible: visible});
  	}

  	setTransferRequestModalVisibility = (visible) => {
  		this.setState({transferRequestModalVisible: visible});
  	}

  	setTaskAssignedModalVisibility = (visible) => {
  		this.setState({taskAssignedModalVisible: visible});	
  	}

  	setDeadlineModalVisibility = (visible) => {
  		this.setState({deadlineModalVisible: visible});
  	}

  	setNextTask = (task) => {
  		this.setState({nextTask: task});
  	}


  	getTransferResponseSender = () => {
  			var task = this.taskList.filter((value) => value.isAwaitingTransfer)[0];
  			if (!task) {
  				return null;
  			}
  			return task.isAwaitingTransfer.firstName + ' accepted your transfer request!';
  	}
  	

	setTransferRequestModalVisibility = (visible) => {
		this.setState({transferRequestModalVisible: visible});
	}

	setTaskAssignedModalVisibility = (visible) => {
		this.setState({taskAssignedModalVisible: visible});
	}

	getTransferResponseSender = () => {
			var task = this.taskList.filter((value) => value.isAwaitingTransfer)[0];
			if (!task) {
				return null;
			}
			return task.isAwaitingTransfer.firstName + ' accepted your transfer request!';
	}
	
	onTaskCompleted = (taskItem) => {
		taskItem.completed = !taskItem.completed;
		var timer = this.state.timerMap.get(taskItem);
		var taskPage = this;
		var map = this.state.timerMap;
		if (timer) {
			// timer has been set already, so clear it and uncheck box
			clearTimeout(timer);

			map.delete(taskItem);
			this.setState({
				timerMap: map,
			});
		} else {
			// set timer to remove task
			map.set(taskItem, setTimeout(() => {
					console.log("timer up");
					var index = taskPage.taskList.indexOf(taskItem);
					taskPage.taskList.splice(index, 1);
					clearTimeout(this);
					taskPage.updateDataSource();
					console.log('task completed timer up');
				}, 5000)
			);
			this.setState({
				timerMap: map,
			})

		}
		this.sortTaskList();
		this.updateDataSource();
	}

	onTaskPressed = (taskItem) => {
		this.props.navigator.push({
			title: 'Task Details',
			component: TaskDetailsPage,
			passProps: {
				taskCompleted: this.onTaskCompleted, 
				task: taskItem,
				requestTransfer: this.requestTransfer,
				cancelTransfer: this.cancelTransfer,
				house: this.props.house,
			},
		});
	}

	onCreatePressed = () => {
		this.props.navigator.push({
			title: 'Task Name',
			component: CreatePage,
			passProps: {
				addTask: this.addTask,
				currentTask: {notes: '',}
			},
			leftButtonTitle: 'Cancel',
			onLeftButtonPress: () => this.props.navigator.popToTop(0)
		})
	}

	checkTaskIsMine = (value) => {
		return value.owner.isMe;
	}

	onSegmentChanged = (value) => {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(value === "All Tasks" ? 
				this.taskList : this.taskList.filter(this.checkTaskIsMine)),
			taskView: value,
		});
	}

	updateDataSource = () => {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(this.state.taskView === "All Tasks" ? 
				this.taskList : this.taskList.filter(this.checkTaskIsMine)),
		});
	}

	addTask = (task) => {
		// Show 'task assigned to' modal
		console.log(task)
		this.setTaskAssignedModalVisibility(true);
		this.lastAddedTask = task;
		this.taskList.push(task);
		this.sortTaskList();
		this.updateDataSource();
	}

	requestTransfer = (task, user) => {
		task.isAwaitingTransfer = user;
		this.updateDataSource();

		/* Set timer to show transfer modal */
		console.log('booom');
		var showModal = setTimeout(() => {
			console.log("timer up");
			this.setTransferResponseModalVisibility(true);
			clearTimeout(this);
			console.log('passed timer');
		}, 5000);
	}

	cancelTransfer = (task) => {
		task.isAwaitingTransfer = null;
		this.updateDataSource();
		this.setTransferResponseModalVisibility(false);
	}

	dismissTransferResponseModal = () => {
		console.log('dismiss transfer response modal');
		this.setTransferResponseModalVisibility(false);
		var task = this.taskList.filter((value) => value.isAwaitingTransfer)[0]
		task.owner = task.isAwaitingTransfer;
		task.isAwaitingTransfer = null;
		this.updateDataSource();
	}

	dismissTaskAssignedModal = () => {
		this.setTaskAssignedModalVisibility(false);
	}

	dismissDeadlineModal = () => {
		this.setDeadlineModalVisibility(false);
	}

	acceptTransferRequest = () => {
		console.log('accepting transfer')
		var task = this.state.taskRequestingTransfer;
		var newTask = {};
		console.log(task)
		newTask = Object.assign(newTask, task);
		console.log(newTask);
		newTask.owner = this.props.house.filter((value) => value.isMe)[0];
		var index = this.taskList.indexOf(task);
		this.taskList.splice(index, 1);
		this.taskList.push(newTask);

		this.sortTaskList();

		this.updateDataSource();
		// TODO: send a notification to transfer requester here 
		this.setState({
			taskRequestingTransfer: null,
			transferRequestModalVisible: false,

		})
	}

	denyTransferRequest = () => {
		this.setState({
			taskRequestingTransfer: null,
			transferRequestModalVisible: false});
	}

	simulateTransferRequestNotification = () => {
		console.log('transfer request from ');
		// pick a task (not yours) to simulate getting a request from
		var notMyTasks = this.taskList.filter((task) => !(task.owner.isMe));
		if (notMyTasks.length === 0) {
			return;
		}
		var index = Math.floor(Math.random() * (notMyTasks.length))
		console.log(index);
		console.log('getting transfer request for task: ' + notMyTasks[index]);
		this.setState({
			taskRequestingTransfer: notMyTasks[index],
			transferRequestModalVisible: true
		});
	}

	getRequestModalBody = () => {
		return (<TransferRequestBody task={this.state.taskRequestingTransfer} />);
	}

	getTaskAssignedBody = () => {
		if (this.state.taskAssignedModalVisible) {
			return (
				<View style={{flexDirection: 'column', margin: 10, alignItems: 'center'}}>
					<Image source={{ uri: this.lastAddedTask.owner.picURL }} style={{height: 70, width: 70, borderRadius: 35, marginBottom: 5}} />
					<Text style={{fontSize: 15, fontWeight: '500', fontFamily: 'Avenir'}}>{this.lastAddedTask.owner.firstName}</Text>
				</View>
			)
		}
	}

	getRequestModalButtonDeny = () => {
		return (
			<Button 
				text='Deny' 
				color='#C55254' 
				size='medium' 
				onPress={()=>{this.denyTransferRequest()}}
			/>
		);
	}

	getRequestModalButtonAccept = () => {
		return (
			<Button
				text='Accept'
				color='#6BAC4E'
				size='medium'
				onPress={() => {
					this.acceptTransferRequest();
				}}
			/>
		);
	}

	getTaskAssignedButtonOK = () => {
		return (
			<Button
				text='OK'
				color='#319bce'
				size='medium'
				onPress={() => {
					this.dismissTaskAssignedModal();
				}}
			/>
		);
	}

	noTasks = () => {
		// console.log('LENGTH IS ZERO:', this.taskList.filter(this.checkTaskIsMine).length == 0);
		var noTasks = false;
		if (this.state.taskView == 'My Tasks') {
			noTasks = this.taskList.filter(this.checkTaskIsMine).length == 0
		} else {
			noTasks = this.taskList.length == 0
		}

		if(noTasks) {
			return (
				<Text style={styles.noTasksText}>No Tasks!</Text>
			)
		}
	}

	renderIcon = (data) => {
		// console.log('UPDATING icon');
		if (data.owner.isMe) {
			if (!data.isAwaitingTransfer)
				return (
					<TouchableOpacity onPress={() => this.onTaskCompleted(data)}>
						<Image source={data.completed ? require('../assets/checked.png') : require('../assets/unchecked.png')} 
							style={styles.checkBoxIcon} />
					</TouchableOpacity>
				);
			else {
				console.log('awaiting transfer icon');
				return (
					<Image source={{ uri: data.isAwaitingTransfer.picURL }} style={styles.transferPhoto} />
				);
			}
		} else {
			return (
				<Image source={{ uri: data.owner.picURL }} style={styles.photo} />
			);
		}
	}

	renderRow = (data) => {
		var daysUntil = moment(data.due).fromNow();
		var now = new Date()
		var timeDiff = Math.abs(now.getTime() - data.due)
		var daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
		return (
			<TouchableOpacity onPress={() => this.onTaskPressed(data)}>
			  <View style={styles.row}>
				{this.renderIcon(data)}
				<Text style={styles.taskName}>{this.trunc(data.name, 18)}</Text>
				<Text style={daysLeft > 1 ? styles.dueInText : styles.dueInTextUrgent}>{daysUntil}</Text>

			  </View>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View 
				style={styles.container}
				accessible={true}
				onMagicTap={this.simulateTransferRequest}>					
				<View style={{backgroundColor:'white'}}>
					<SegmentedControlIOS 
						style={styles.segmentedControl}
						values={["My Tasks", "All Tasks"]} 
						selectedIndex={0} 
						tintColor='#319bce'
						onValueChange={this.onSegmentChanged}/>
				</View>
				<View style={styles.segmentSeparator} />
				<ListView
					style={styles.list}
					dataSource={this.state.dataSource}
					renderRow={this.renderRow}  
					renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} /> }
					enableEmptySections={true}
					automaticallyAdjustContentInsets={false}
				/>
				{this.noTasks()}
				<TouchableOpacity
					style={styles.transferRequestButton}
					onPress={() => this.simulateTransferRequestNotification()}>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.onCreatePressed() }>
					<Image style={styles.addButton} source={require('../assets/create_task_button.png')} />
				</TouchableOpacity>
				<SimpleModal 
					message={this.getTransferResponseSender()}
					removeModal={() => {this.dismissTransferResponseModal()}}
					visible={this.state.transferResponseModalVisible}/>
				<SimpleModal 
					message={this.state.nextTask}
					removeModal={() => {this.dismissDeadlineModal()}}
					visible={this.state.deadlineModalVisible}/>
				<TitleBodyButtonsModal 
					title='Transfer request from:' 
					bodyView={this.getRequestModalBody} 
					buttonViews={[this.getRequestModalButtonDeny, this.getRequestModalButtonAccept]}
					visible={this.state.transferRequestModalVisible} />
				<TitleBodyButtonsModal
					title='Task assigned to:'
					bodyView={this.getTaskAssignedBody}
					buttonViews={[this.getTaskAssignedButtonOK]}
					visible={this.state.taskAssignedModalVisible} />
			</View>
		);
	}
}

export default TasksPage;