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

var moment = require('moment');

var today = new Date();

const styles = StyleSheet.create({
  container: {
  	flex: 1,
  	paddingTop: 62,
  },
  modal: {

  },
  segmentedControl: {
  	margin: 12, 
  	backgroundColor: 'white',
  },
  list: {
  	marginTop: -64, 
  	zIndex: -100
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  taskName: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Avenir',
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  transferPhoto: {
  	height: 40,
  	width: 40,
  	borderRadius: 20,
  	opacity: .5,
  },
  checkBox: {
  	height: 40,
  	width: 40,
  	borderRadius: 20,
  	backgroundColor: '#319bce',
  },
  checkBoxIcon: {
  	height: 40,
  	width: 40,
  },
  dueInText: {
    textAlign: 'right',
    flex: 1,
    fontFamily: 'Avenir',
  },
  dueInTextUrgent: {
    textAlign: 'right',
    flex: 1,
    color: 'red',
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
  button: {
    marginBottom: 20,
    marginRight: 20,
    position: 'absolute',
    justifyContent: 'center',
    borderRadius: 35,
    minHeight: 50,
    minWidth: 50,
    width: 80,
    height: 80,
    bottom: 20,
    right: 20,
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

		this.taskList = [
			{
				name:'Take out trash', 
				owner: props.house[0],
				completed:false, 
				due:new Date().setDate(today.getDate() + 1), 
				timeToComplete: '5 min'
			},
			{
				name:'Vacuum',
				owner: props.house[0],
				completed:false,
				due:new Date().setMinutes(today.getMinutes() + 30),
				timeToComplete: '15 min'
			},
			{
				name:'Call the landlord', 
				owner: props.house[1], 
				completed:false, 
				due:new Date().setDate(today.getDate() + 3), 
				timeToComplete: '15 min'
			},
			{
				name:'Clean room',
				owner: props.house[3], 
				completed:false, 
				due:new Date().setDate(today.getDate() + 4), 
				timeToComplete: '30 min' 
			},
		];

		this.taskList.sort((value1, value2) => {
			console.log(value1.due);
			console.log(value2.due);
			if (value1.due > value2.due.getTime)
				return 1;
			if (value1.due < value2.due)
				return -1;
			return 0;
		});


		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: this.ds.cloneWithRows(this.taskList.filter(this.checkTaskIsMine)),
			taskView: 'My Tasks',
			transferResponseModalVisible: false,
			transferRequestModalVisible: false,
		};
	}

	componentWillUpdate() {
		 LayoutAnimation.easeInEaseOut();
	}

	setTransferResponseModalVisibility = (visible) => {
    	this.setState({transferResponseModalVisible: visible});
  	}

  	setTransferRequestModalVisibility = (visible) => {
  		this.setState({transferRequestModalVisible: visible});
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
		this.setState({
			dataSource: this.ds.cloneWithRows(this.state.taskView === "All Tasks" ? 
				this.taskList : this.taskList.filter(this.checkTaskIsMine))
		});
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
				currentTask: {}
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
			dataSource: this.ds.cloneWithRows(value === "All Tasks" ? 
				this.taskList : this.taskList.filter(this.checkTaskIsMine)),
			taskView: value,
		});
	}

	updateDataSource = () => {
		this.setState({
			dataSource: this.ds.cloneWithRows(this.state.taskView === "All Tasks" ? 
				this.taskList : this.taskList.filter(this.checkTaskIsMine)),
		});
	}

	addTask = (task) => {
		this.taskList.push(task);
		// double check to see this works
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

	renderIcon = (data) => {
		console.log('UPDATING icon');
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
			    <Text style={styles.taskName}>{data.name}</Text>
			    <Text style={daysLeft > 1 ? styles.dueInText : styles.dueInTextUrgent}>{daysUntil}</Text>

			  </View>
			</TouchableOpacity>
		);
	}

	render() {
		console.log('modal visible? ' + this.state.transferResponseModalVisible)
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
				  	renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} /> }/>
				<Button
					style={{position: 'absolute'}}
					onPress={this.simulateTransferRequestNotification}
					size='medium'
					color='white'
					text='click to receive request notification'/>
				<TouchableOpacity onPress={() => this.onCreatePressed() }>
					<Image style={styles.button} source={require('../assets/create_task_button.png')} />
				</TouchableOpacity>
				<SimpleModal 
					message={this.getTransferResponseSender()}
					removeModal={() => {this.dismissTransferResponseModal()}}
					visible={this.state.transferResponseModalVisible}/>
				<TitleBodyButtonsModal 
					title='Transfer request from:' 
					bodyView={this.getRequestModalBody} 
					buttonViews={[this.getRequestModalButtonDeny, this.getRequestModalButtonAccept]}
					visible={this.state.transferRequestModalVisible} />

			</View>
		);
	}
}

export default TasksPage;

