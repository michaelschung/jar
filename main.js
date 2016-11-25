import Exponent from 'exponent';
import React from 'react';
import {
	Menu,
	StyleSheet,
	Text,
	View,
	NavigatorIOS
} from 'react-native';

import TasksPage from '../jar/pages/TasksPage.js'
import JarPage from '../jar/pages/JarPage.js'

import SettingsPanel from './components/SettingsPanel.js'
import SideMenu from 'react-native-side-menu';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	jarPressed() {
		this.refs.nav.push({
			title: 'Jar',
			component: JarPage,
		})
	}

	settingsPressed = () => {
		// this.refs.nav.push({
		// 	title: 'Settings',
		// 	component: SettingsPanel,
		// })
		this.isOpen = {true}
	}

	Settings = () => {
		console.log(SettingsPanel.isOpen);
		// console.log('lalala');
		// var temp = SettingsPanel.isOpen;
		// SettingsPanel.isOpen = {false};
		// console.log(temp);
	}

	render() {
		console.log('rendering main');
		const menu = () => { <Menu onItemSelected={this.onMenuItemSelected} /> };
		// var settings;
		// if(SettingsPanel.isOpen) {
		//   settings = (<SettingsPanel isOpen={false}></SettingsPanel>);
		// // } else {
		// //   settings = null;
		// }
		return (
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
					onLeftButtonPress: () => this.settingsPressed(),
				}}
				style={styles.container}
				>
				
				{
					this.Settings()
				}
			</NavigatorIOS>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

Exponent.registerRootComponent(App);