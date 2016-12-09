'use strict';

import React, { Component } from 'react'
import {
	Alert,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

const styles = StyleSheet.create({
  	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
  	},
  	textPrompt: {
  		position: 'relative',
  		top: 150,
		color: 'black',
		fontSize: 30,
		fontWeight: 'bold',
		fontFamily: 'Avenir',
		marginBottom: 20,
  	},
  	profilePic: {
  		position: 'relative',
  		top: 100,
		width: 150,
		height: 150,
		borderRadius: 75,
  	},
  	name: {
  		position: 'relative',
  		top: 120,
  		fontSize: 22,
  		fontFamily: 'Avenir',
  		fontWeight: '500',
  		color: '#319bce',
  	},
});

class ProfilePage extends Component {
	constructor(props) {
		super(props);
	}

	getUser = () => {
		return this.props.house.filter(this.checkTaskIsMine);
	}

	checkTaskIsMine = (value) => {
		return value.isMe;
	}

	render() {
		console.log('rendering ProfilePage');
		return (
			<View style={styles.container}>
				<Image style={styles.profilePic} source={{ uri: this.getUser()[0].picURL }} />
				<Text style={styles.name}>{this.getUser()[0].firstName} {this.getUser()[0].lastName}</Text>
				<Text style={styles.textPrompt}>(Coming soon!)</Text>
			</View>
		);
	}
}

export default ProfilePage;