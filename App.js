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

import TasksPage from './pages/TasksPage.js'
import JarPage from './pages/JarPage.js'

import HamburgerPanel from './components/HamburgerPanel.js'
import SideMenu from 'react-native-side-menu'

import ProfilePage from './pages/ProfilePage.js'

import * as firebase from 'firebase';
const database = firebase.database();

const { Component } = React;
const window = Dimensions.get('window');

var hamburgerUrl = 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/hamburger_cropped.png';
var jarUrl = 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/jar_transparent_resized.png';

var house = [
	{
		firstName: 'Michael',
		lastName: 'Chung',
		isMe: true,
		picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/Michael.jpg',
		totalTime: 0,
	},
	{
		firstName: 'Evan',
		lastName: 'Lin',
		isMe: false,
		picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/Evan.jpg',
		totalTime: 0,
	},
	{
		firstName: 'Tessera',
		lastName: 'Chin',
		isMe: false,
		picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/Tessera.jpg',
		totalTime: 0,
	},
	{
		firstName: 'David',
		lastName: 'Morales',
		isMe: false,
		picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/David.JPG',
		totalTime: 0,
	},
];

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

		this.jarAmount = 50.0
	}

	populateFirebase() {
		for(var user in house) {
			// console.log(house[user].firstName);
			database.ref('House/' + house[user].firstName).set({
				firstName: house[user].firstName,
				lastName: house[user].lastName,
				isMe: house[user].isMe,
				picURL: house[user].picURL,
				totalTime: house[user].totalTime,
			});
		}
	}

	setTaskName(userId, taskName) {
		firebase.database().ref(userId).set({
			taskName: taskName
		});
	}

	state = {
		isOpen: false,
		selectedItem: 'My House',
	}

	/* What to do if the Jar icon is pressed */
	jarPressed() {
		this.refs.nav.push({
			title: 'Jar',
			component: JarPage,
			passProps: {
				jarAmount: this.jarAmount,
				changeJarAmount: this.changeJarAmount,
			},
		});
	}

	changeJarAmount = (delta) => {
		this.jarAmount += delta;
	}

	/* Toggle the state of the HamburgerPanel (open or closed) */
	toggle() {
		console.log('Settings button pressed');
		this.setState({
			isOpen: !this.state.isOpen,
		});
	}

	/* Also toggles the state of the HamburgerPanel, but uses isOpen field to do so */
	updateMenuState(isOpen) {
		console.log('isOpen:', isOpen);
		this.setState({ isOpen, });
	}

	/* Determines which item in the menu is selected */
	onMenuItemSelected = (item) => {
		console.log('onMenuItemSelected', this.onMenuItemSelected);
		this.setState({
			isOpen: false,
			selectedItem: item,
		});
	}

	/* Returns the HamburgerPanel */
	Hamburger = () => {
		return (
			<HamburgerPanel
				onItemSelected={this.onMenuItemSelected}
				navigator={this.refs.nav}
				isOpen={this.state.isOpen}
				// Make sure that HamburgerPanel has reference to toggle() method
				// (must be passed as anonymous function to avoid automatic function call)
				toggle={() => this.toggle()} // OR:
				// updateMenuState={(isOpen) => this.updateMenuState()}
				jarPressed={() => this.jarPressed()}
				house={house}
				jarAmount={this.jarAmount}
				changeJarAmount={(delta) => this.changeJarAmount}
			/>
		)
	}

	/* Returns the NavigatorIOS */
	Navigator = () => {
		return (
			<NavigatorIOS
				ref='nav'
				barTintColor='#319bce'
				titleTextColor='#fff'
				tintColor='#fff'
				initialRoute={{
					component: TasksPage,
					title: 'Home',
					// component: ProfilePage,
					// title: 'Profile',
					passProps: {
						house: house,
						changeJarAmount: this.changeJarAmount,
					},
					// uncomment the next line for the Jar title logo
					// titleImage: require('./assets/jar_title.png'),
					/* WORDS */
					// leftButtonTitle: 'Settings',
					// rightButtonTitle: 'Jar',
					/* BUTTONS */
					rightButtonIcon: require('./assets/jar_transparent_resized.png'),
					leftButtonIcon: require('./assets/hamburger_cropped.png'),
					onRightButtonPress: () => this.jarPressed(),
					onLeftButtonPress: () => this.toggle(),
				}}
				style={styles.container}
			/>
		)
	}

	/* Render everything */
	render() {
		// console.log('rendering App');

		// this.populateFirebase();

		// this.setTaskName('Michael', 'Vacuum');

		return (
			<SideMenu
				disableGestures={this.state.isOpen?false:true}
				menu={this.Hamburger()}
				isOpen={this.state.isOpen}
				onChange={(isOpen) => this.updateMenuState(isOpen)}
				openMenuOffset={window.width*4/5} >
				{this.Navigator()}
			</SideMenu>
		);
	}
};

export default App;