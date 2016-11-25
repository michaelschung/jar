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
	}

	jarPressed() {
		this.refs.nav.push({
			title: 'Jar',
			component: JarPage,
		})
	}

	state = {
		isOpen: false,
		selectedItem: 'About',
	};

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
		console.log('onMenuItemSelected');
		this.setState({
			isOpen: false,
			selectedItem: item,
		});
	}

	Settings = () => {
		return this.state.isOpen ? (
			<SettingsPanel onItemSelected={this.onMenuItemSelected} />
		) : (
			null
		)
	}

	render() {
		console.log('rendering app');
		const menu = () => { <Menu onItemSelected={this.onMenuItemSelected} /> };

		return (
			<SideMenu
				menu={menu}
				isOpen={this.state.isOpen}
				onChange={(isOpen) => this.updateMenuState(isOpen)}
				openMenuOffset={300} >
				<NavigatorIOS
					ref='nav'
					barTintColor='#319bce'
					titleTextColor='#fff'
					tintColor='#fff'
					initialRoute={{
						component: TasksPage,
						title: 'Tasks Page',
						rightButtonTitle: 'Jar',
						leftButtonTitle: 'Settings',
						onRightButtonPress: () => this.jarPressed(),
						onLeftButtonPress: () => this.toggle(),
					}}
					style={styles.container}
				/>
				{this.Settings()}
			</SideMenu>
		);
	}
};

export default App;