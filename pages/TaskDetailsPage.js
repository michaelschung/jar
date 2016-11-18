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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

class TaskDetailsPage extends Component {

	render() {
		return (
			<View><Text>TEST PAGE</Text></View>
		);
	}
}


export default TaskDetailsPage;


