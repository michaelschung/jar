'use strict';

import React, { Component } from 'react'
import TaskRowItem from '../components/TaskRowItem'
import {
	Menu,
	StyleSheet,
	Text,
	TextInput,
	View,
	ActivityIndicator,
	Image,
	ListView,
	TouchableOpacity,
	SegmentedControlIOS,
} from 'react-native';

import SideMenu from 'react-native-side-menu';

import TaskDetailsPage from './TaskDetailsPage.js'
import SettingsPanel from '../components/SettingsPanel'

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
	padding: 0
  },
  addButton: {
	backgroundColor: '#319bce',
	marginBottom: 7,
	borderRadius: 25,
	minHeight: 50,
	minWidth: 50,
  },
  buttonText: {
	color: 'white',
	alignSelf: 'center',
	fontSize: 18,
  },
  hamburger: {
  	width: 100,
  	height: 100,
  	backgroundColor: 'black',
  }
});

class TasksPage extends React.Component {
	constructor(props) {
		super(props);

		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: this.ds.cloneWithRows(taskList),
			taskView: 'All Tasks',
		};
	}

	onCheckboxPressed = (taskItem) => {
		taskItem.completed = !taskItem.completed;
		if (this.state.taskView === "All Tasks") {
			this.setState({
				dataSource: this.ds.cloneWithRows(taskList)
			});
		} else {
			this.setState({
				dataSource: this.ds.cloneWithRows(taskList.filter(this.checkTaskIsMine))
			})
		}

	}

	onTaskPressed = (taskItem) => {
		this.props.navigator.push({
			title: 'Task Details',
			component: TaskDetailsPage,
			passProps: {task: taskItem},
		});
	}

	checkTaskIsMine = (value) => {
		return value.isMyTask;
	}

	onSegmentChanged = (value) => {
		if (value === 'My Tasks') {
			this.setState({
				dataSource: this.ds.cloneWithRows(taskList.filter(this.checkTaskIsMine)),
				taskView: value,
			});
		} else {
			this.setState({
				dataSource: this.ds.cloneWithRows(taskList),
				taskView: value,
			});
		}
	}

	renderIcon = (data) => {
		if (data.isMyTask) {
			return (
				<TouchableOpacity onPress={() => this.onCheckboxPressed(data)}>
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

	render(data) {
		const menu = () => { return (<Menu navigator={navigator} />) }
		return (
			<View style={{flex: 1, paddingTop: 62}}>
				{ /*
				<SideMenu menu={menu}>
					<SettingsPanel/>
				</SideMenu>
				*/ }

				<View style={{margin: 12, backgroundColor: 'white'}}>
					{ /* THIS WAS MICHAEL TESTING IMAGE INSERTION. PLEASE LEAVE ALONE FOR NOW.
					<Image source={require('../assets/hamburger.png')} 
						style={styles.hamburger} />
					*/ }
					<SegmentedControlIOS 
						values={["All Tasks", "My Tasks"]} 
						selectedIndex={0} 
						tintColor='#319bce'
						onValueChange={this.onSegmentChanged}/>
				</View>
				<View style={styles.segmentSeparator} />
				<ListView
					style={{marginTop: -64, zIndex: -100}}
					dataSource={this.state.dataSource}
					renderRow={this.renderRow}  
					renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} /> }/>
				<TouchableOpacity style={styles.addButton}>
					<Text style={styles.buttonText}>+</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default TasksPage;