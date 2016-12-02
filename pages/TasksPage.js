'use strict';

import React, { Component } from 'react'
import TaskRowItem from '../components/TaskRowItem'
import CreatePage from '../pages/CreatePage'
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
			modalVisible: false
		};
	}

	setModalVisible(visible) {
    	this.setState({modalVisible: visible});
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
		// this.setModalVisible(true);
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
	}

	cancelTransfer = (task) => {
		task.isAwaitingTransfer = null;
		this.updateDataSource();
	}

	acceptTransferRequest = (task) => {
		task.owner = this.props.house.filter((value) => value.isMe)[0];
		task.isAwaitingTransfer = null;
		this.updateDataSource();
		// send a notification to transfer requester
	}

	renderIcon = (data) => {
		if (data.owner.isMe) {
			if (!data.isAwaitingTransfer)
				return (
					<TouchableOpacity onPress={() => this.onTaskCompleted(data)}>
						<Image source={data.completed ? require('../assets/checked.png') : require('../assets/unchecked.png')} 
							style={styles.checkBoxIcon} />
					</TouchableOpacity>
				);
			else {
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
		// var button1 = () => { return (<Button text='Deny' color='#C55254' size='medium' onPress={()=>{console.log('deny pressed')}}/>) }
		// var button2 = () => { return (<Button text='Accept' color='#6BAC4E' size='medium' onPress={()=>{console.log('accept pressed')}}/>) }
		// var task = {
		// 	name:'Call the landlord', 
		// 	owner: {name: 'Evan', picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/Evan.jpg'}, 
		// 	completed:false, 
		// 	due:new Date().setDate(today.getDate() + 3), 
		// 	timeToComplete: '15 min'
		// }
		// var body = () => { return (<TransferRequestBody fromName='Evan' task={task} />) }
		// console.log('rendering task page');
		return (
			<View style={styles.container}>					
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
				<TouchableOpacity onPress={() => this.onCreatePressed() }>
					<Image style={styles.button} source={require('../assets/create_task_button.png')} />
				</TouchableOpacity>
				{/*<TitleBodyButtonsModal title='Transfer request from:' bodyView={body} buttonViews={[button1, button2]} />*/}
			</View>
		);
	}
}

export default TasksPage;

