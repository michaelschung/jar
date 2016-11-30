import React from 'react';
import {
	Menu,
	StyleSheet,
	Text,
	View,
	NavigatorIOS,
	TouchableOpacity,
	Image,
} from 'react-native';

import TasksPage from '../jar/pages/TasksPage.js'
import JarPage from '../jar/pages/JarPage.js'

import SettingsPanel from './components/SettingsPanel.js'
import SideMenu from 'react-native-side-menu'

const { Component } = React;

const styles = StyleSheet.create({
	button: {
		position: 'absolute',
		top: 20,
		padding: 10,
	},
	caption: {
		fontSize: 20,
		fontWeight: 'bold',
		alignItems: 'center',
	},
	settingsContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	container: {
		flex: 1,
	},
});

class Button extends Component {
	handlePress(e) {
		if (this.props.onPress) {
			this.props.onPress(e);
		}
	}

	render() {
		return (
			<TouchableOpacity
				onPress={this.handlePress.bind(this)}
				style={this.props.style}>
				<Text>{this.props.children}</Text>
			</TouchableOpacity>
		);
	}
}

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: 'Michael',
			picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/Michael.jpg',
			isMe: true,
			isOpen: false,
			selectedItem: 'Contacts',
		};
	}

	jarPressed() {
		this.refs.nav.push({
			title: 'Jar',
			component: JarPage,
		});
		this.setState({isOpen: false,});
	}

	toggle() {
		console.log('Settings button pressed');
		this.setState({
			isOpen: !this.state.isOpen,
		});
	}

	updateMenuState(isOpen) {
		console.log('isOpen:', isOpen);
		this.setState({ isOpen, });
	}

	onMenuItemSelected = (item) => {
		console.log('onMenuItemSelected', this.onMenuItemSelected);
		this.setState({
			isOpen: false,
			selectedItem: item,
		});
	}

	Settings = () => {
		return this.state.isOpen ? (
			<SettingsPanel
				onItemSelected={this.onMenuItemSelected}
				user={this.state}
				jarPressed={() => this.jarPressed()}
				/>
		) : (
			null
		)
	}

	Navigator = () => {
		return (
			<NavigatorIOS
				ref='nav'
				barTintColor='#319bce'
				titleTextColor='#fff'
				tintColor='#fff'
				initialRoute={{
					component: TasksPage,
					title: 'Tasks Page',
					titleImage: require('./assets/jar_title.png'),
					rightButtonIcon: require('./assets/jar_logo_resized.png'),
					leftButtonIcon: require('./assets/settings_icon.png'),
					onRightButtonPress: () => this.jarPressed(),
					onLeftButtonPress: () => this.toggle(),
				}}
				style={styles.container}
			/>
		)
	}

	render() {
		console.log('rendering app');

		return (
			<SideMenu
				menu={this.Settings()}
				isOpen={this.state.isOpen}
				onChange={(isOpen) => this.updateMenuState(isOpen)}
				openMenuOffset={300} >
				{this.Navigator()}
			</SideMenu>
		);
	}
};

export default App;