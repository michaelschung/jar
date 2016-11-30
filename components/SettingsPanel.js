import React from 'react';
import {
	Dimensions,
	StyleSheet,
	ScrollView,
	View,
	Image,
	Text,
	TouchableOpacity,
	ListView,
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
		backgroundColor: 'white',
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
		left: 130,
		top: 40,
	},
	item: {
		color: 'red',
		fontSize: 14,
		fontWeight: '300',
		paddingTop: 5,
	},
	separator: {
	  	flex: 1,
	    height: .5,
	    backgroundColor: '#8E8E8E',
	    padding: 0
	},
	image: {
		flex: 1,
		width: 50,
		height: 50,
		left: 25,
		top: 25,
	},
});

var options = [
	{
		name: 'My House',
		image: require('../assets/myhouse_icon.png'),
	},
	{
		name: 'Profile',
		image: require('../assets/profile_icon.png'),
	},
	{
		name: 'Bank Account',
		image: require('../assets/bankaccount_icon.png'),
	},
	{
		name: 'Settings',
		image: require('../assets/settings_icon.png'),
	},
	{
		name: 'Logout',
		image: require('../assets/logout_icon.png'),
	},
];

class SettingsPanel extends Component {
	constructor(props) {
		super(props);

		this.list = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: this.list.cloneWithRows(options),
		};
	}

	static propTypes = {
		onItemSelected: React.PropTypes.func.isRequired,
	};

	renderIcon = (data) => {
		console.log("DATA: ", data.picURL);
		return (
			<Image source={ data.image } style={styles.image} />
		);
	}

	renderRow = (data) => {
		return (
			<TouchableOpacity onPress={() => this.onTaskPressed(data)}>
			  	<View style={styles.row}>
			  		{this.renderIcon(data)}
			    	<Text style={styles.taskName}>{data.name}</Text>
			  	</View>
			</TouchableOpacity>
		);
	}

	render() {
		console.log('rendering SettingsPanel');
		return (
			<ScrollView scrollsToTop={false} style={styles.menu}>
				<View style={styles.avatarContainer}>
					<Image
						style={styles.avatar}
						source={{ uri: this.props.user.picURL }} />
					<Text style={styles.name}>{this.props.user.name}</Text>
				</View>

				<ListView
					style={styles.list}
					dataSource={this.state.dataSource}
					renderRow={this.renderRow}
					renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} /> }
				/>
			</ScrollView>
		);
	}
};

export default SettingsPanel;