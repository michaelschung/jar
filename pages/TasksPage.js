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
	ListView
} from 'react-native';

var today = new Date();
var taskList = [{name:'Take out trash', owner:'Michael', completed:false, due:new Date().setDate(today.getDate() + 1), picUri:'./images/Michael.jpg'},
				{name:'Call the landlord', owner:'Evan', completed:false, due:new Date().setDate(today.getDate() + 3), picUri:'./images/Evan.jpg'}, ];


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  separator: {
  	flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
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

	static route = {
		navigationBar: {
			title: 'Tasks Screen',
		}
	}

	render() {
		return (
			<ListView
			  style={styles.container}
			  dataSource={this.state.dataSource}
			  renderRow={(data) => TaskRowItem(data)} 
			  renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />} />
		);
	}
}


export default TasksPage;


