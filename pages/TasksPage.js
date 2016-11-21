'use strict';

import React, { Component } from 'react'
import TaskRowItem from '../components/TaskRowItem'
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	ActivityIndicator,
	Image,
	ListView,
	TouchableOpacity,
} from 'react-native';

import TaskDetailsPage from './TaskDetailsPage.js'

var moment = require('moment');

var today = new Date();
var taskList = [{name:'Take out trash', isMyTask: true, completed:false, due:new Date().setDate(today.getDate() + 1)},
				{name:'Call the landlord', owner: {name: 'Evan', picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/Evan.jpg'}, completed:false, due:new Date().setDate(today.getDate() + 3)}, 
				{name:'Clean room', owner: {name: 'David', picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/David.JPG'}, completed:false, due:new Date().setDate(today.getDate() + 4)}, ];


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
  }
});

class TasksPage extends Component {
	constructor(props) {
		super(props);

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows(taskList),
		};
	}

	onTaskPressed = (taskItem) => {
		this.props.navigator.push({
			title: 'Task Details',
			component: TaskDetailsPage,
			passProps: taskItem,
		});
	}

	renderIcon = (data) => {
		if (data.isMyTask) {
			return (
				<TouchableOpacity style={styles.checkBox} />
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
			<View style={{flex: 1}}>
				<ListView
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


