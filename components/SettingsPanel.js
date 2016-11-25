
import React, { Component } from 'react'
import {
	View, 
	Text, 
	StyleSheet,
	Image,
	TouchableHighlight,
} from 'react-native';
import TaskDetailsPage from '../pages/TaskDetailsPage.js'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
		flexDirection: 'row',
		alignItems: 'center',
	},
	welcome: {
		padding: 12,
		fontSize: 14,
		color: 'red',
	},
	instructions: {
		fontSize: 14,
		textAlign: 'left',
	},
	due: {
		flex: 1,
		textAlign: 'right',
	},
});

class SettingsPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
		};
	}

	render() {
		console.log('rendering SettingsPanel');
		return (
			<View style={styles.container}>
				<Text>
					<Text style={styles.welcome}>
						Welcome to React Native!{'\n'}
					</Text>
					<Text style={styles.instructions}>
						To get started, edit index.ios.js{'\n'}
					</Text>
					<Text style={styles.instructions}>
						Press Cmd+R to reload,{'\n'}
						Cmd+Control+Z for dev menu
					</Text>
				</Text>
			</View>
		);
	}
}

export default SettingsPanel;