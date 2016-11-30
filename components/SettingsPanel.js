import React from 'react';
import {
	Dimensions,
	StyleSheet,
	ScrollView,
	View,
	Image,
	Text,
	TouchableOpacity,
} from 'react-native';

import JarPage from '../pages/JarPage.js'
import CreatePage from '../pages/CreatePage'

const { Component } = React;

const window = Dimensions.get('window');

const styles = StyleSheet.create({
	menu: {
		flex: 1,
		width: window.width,
		height: window.height,
		backgroundColor: '#319bce',
		padding: 20,
	},
	avatarContainer: {
		marginBottom: 20,
		marginTop: 20,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		flex: 1,
	},
	name: {
		position: 'absolute',
		left: 70,
		top: 20,
	},
	item: {
		color: 'red',
		fontSize: 14,
		fontWeight: '300',
		paddingTop: 5,
	},
});

class SettingsPanel extends Component {
	constructor(props) {
		super(props);
	}

	static propTypes = {
		onItemSelected: React.PropTypes.func.isRequired,
	};
	
	render() {
		console.log('rendering SettingsPanel');
		return (
			<ScrollView scrollsToTop={false} style={styles.menu}>
				<View style={styles.avatarContainer}>
					<Image
						style={styles.avatar}
						source={{ uri: this.props.user.picURL }} />
					<Text style={styles.name}>Your name</Text>
				</View>

				<Text
					/*onPress={() => this.props.onItemSelected('About')}*/
					onPress={() => this.props.navIOS({title: 'Jar', component: JarPage,})}
					style={styles.item}>
					Jar
				</Text>

				<Text
					onPress={() => this.props.navIOS({title: 'Task Name', component: CreatePage,})}
					style={styles.item}>
					Create
				</Text>
			</ScrollView>
		);
	}
};

export default SettingsPanel;