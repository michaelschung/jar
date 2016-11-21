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
var taskList = [{name:'Take out trash', owner:'Michael', completed:false, due:new Date().setDate(today.getDate() + 1), picUri:'./images/Michael.jpg'},
				{name:'Call the landlord', owner:'Evan', completed:false, due:new Date().setDate(today.getDate() + 3), picUri:'./images/Evan.jpg'}, ];


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

	renderRow = (data) => {
		var numDays = moment(data.due).fromNow();
		return (
			<TouchableOpacity onPress={() => this.onTaskPressed(data)}>
			  <View style={styles.row}>
			    <Image source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }} style={styles.photo} />
			    <Text style={styles.taskName}>{data.name}</Text>
			    <Text style={styles.due}>{numDays}</Text>
			  </View>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<ListView
			  dataSource={this.state.dataSource}
			  renderRow={this.renderRow}  
			  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
			 />
		);
	}
}

export default TasksPage;


