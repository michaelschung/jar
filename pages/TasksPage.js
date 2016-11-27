'use strict';

import React, { Component } from 'react'
import TaskRowItem from '../components/TaskRowItem'
import CreatePage from '../pages/CreatePage'
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
var taskList = [
	{
		name:'Take out trash', 
		owner: {name: 'Michael', picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/Michael.jpg'},
		isMyTask: true, 
		completed:false, 
		due:new Date().setDate(today.getDate() + 1), 
		timeToComplete: '5 min'
	},
	{
		name:'Call the landlord', 
		owner: {name: 'Evan', picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/Evan.jpg'}, 
		completed:false, 
		due:new Date().setDate(today.getDate() + 3), 
		timeToComplete: '15 min'
	},
	{
		name:'Clean room',
		owner: {name: 'David', picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/David.JPG'}, 
		completed:false, 
		due:new Date().setDate(today.getDate() + 4), 
		timeToComplete: '30 min' 
	}, 
];
/* 
	Task object
		name: name of the task
		isMyTask: boolean True if task assigned to current user
		owner: {name: username of owner, picURL: user's icon URL (from website)}
		completed: boolean True if task has been completed
		due: JS Date object representing the day the task is due
		timeToComplete: string representing expected time to complete task
*/

const styles = StyleSheet.create({
  container: {
  	flex: 1,
  	paddingTop: 62,
  },
  modal: {

  },
  segmentedControl: {
  	margin: 12, 
  	backgroundColor: 'white'
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
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
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
  due: {
    textAlign: 'right',
    flex: 1,
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
    backgroundColor: '#319bce',
    marginBottom: 20,
    marginRight: 20,
    position: 'absolute',
    justifyContent: 'center',
    borderRadius: 35,
    minHeight: 50,
    minWidth: 50,
    width: 70,
    height: 70,
    bottom: 10,
    right: 10,
  },
  buttonText: {
  	color: 'white',
  	alignSelf: 'center',
  	marginBottom: 5,
  	fontSize: 50
  }
});

class TasksPage extends Component {
	constructor(props) {
		super(props);

		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: this.ds.cloneWithRows(taskList),
			taskView: 'All Tasks',
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
				taskList : taskList.filter(this.checkTaskIsMine))
		});
	}

	onTaskPressed = (taskItem) => {
		this.props.navigator.push({
			title: 'Task Details',
			component: TaskDetailsPage,
			passProps: {taskCompleted: this.onTaskCompleted, task: taskItem},
		});
	}

	onCreatePressed = () => {
		// this.setModalVisible(true);
		this.props.navigator.push({
			title: 'Task Name',
			component: CreatePage,
			passProps: {addTask: this.addTask, currentTask: {}}
		})
	}

	checkTaskIsMine = (value) => {
		return value.isMyTask;
	}

	onSegmentChanged = (value) => {
		this.setState({
			dataSource: this.ds.cloneWithRows(value === "All Tasks" ? 
				taskList : taskList.filter(this.checkTaskIsMine)),
			taskView: value,
		});
	}

	addTask = (task) => {
		taskList.push(task);
		// double check to see this works
		this.setState({
			dataSource: this.ds.cloneWithRows(taskList)
		});
	}

	renderIcon = (data) => {
		if (data.isMyTask) {
			return (
				<TouchableOpacity onPress={() => this.onTaskCompleted(data)}>
					<Image source={data.completed ? require('../assets/checked.png') : require('../assets/unchecked.png')} 
						style={styles.checkBoxIcon} />
				</TouchableOpacity>
			);
		} else {
			return (
				<Image source={{ uri: data.owner.picURL }} style={styles.photo} />
			);
		}

	}

	renderRow = (data) => {
		var numDays = moment(data.due).fromNow();
		return (
			<TouchableOpacity onPress={() => this.onTaskPressed(data)}>
			  <View style={styles.row}>
			  	{this.renderIcon(data)}
			    <Text style={styles.taskName}>{data.name}</Text>
			    <Text style={styles.due}>{numDays}</Text>
			  </View>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View style={styles.container}>					
				<View style={{backgroundColor:'white'}}>
					<SegmentedControlIOS 
						style={styles.segmentedControl}
						values={["All Tasks", "My Tasks"]} 
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
				<TouchableOpacity style={styles.addButton} onPress={() => this.onCreatePressed() }>
					<Text style={styles.buttonText}>+</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default TasksPage;

