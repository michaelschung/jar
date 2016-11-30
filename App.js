import React from 'react';
import {
	Menu,
	StyleSheet,
	Text,
	View,
	NavigatorIOS,
	TouchableOpacity,
	Image,
	Dimensions,
} from 'react-native';

import TasksPage from '../jar/pages/TasksPage.js'
import JarPage from '../jar/pages/JarPage.js'

import SettingsPanel from './components/SettingsPanel.js'
import SideMenu from 'react-native-side-menu'

const { Component } = React;
const window = Dimensions.get('window');

const styles = StyleSheet.create({
	button: {
		position: 'absolute',
		top: 20,
		padding: 10,
	},
	container: {
		flex: 1,
		borderLeftWidth: 1,
		borderColor: '#8E8E8E',
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
			firstname: 'Michael',
			lastname: 'Chung',
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
		return (
			<SettingsPanel
				onItemSelected={this.onMenuItemSelected}
				user={this.state}
				navigator={this.refs.nav}
				isOpen={this.state.isOpen}
				updateMenuState={(isOpen) => this.updateMenuState()}
			/>
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
					rightButtonIcon: require('./assets/jar_transparent_resized.png'),
					leftButtonIcon: require('./assets/hamburger_cropped.png'),
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
				openMenuOffset={window.width*4/5} >
				{this.Navigator()}
			</SideMenu>
		);
	}
};

export default App;