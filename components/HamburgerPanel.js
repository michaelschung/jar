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
	NavigatorIOS,
} from 'react-native';

import JarPage from '../pages/JarPage.js'
import CreatePage from '../pages/CreatePage'
import MyHousePage from '../pages/MyHousePage'
import ProfilePage from '../pages/ProfilePage'
import BankAccountPage from '../pages/BankAccountPage'
import SettingsPage from '../pages/SettingsPage'

const { Component } = React;

const window = Dimensions.get('window');

const styles = StyleSheet.create({
	menu: {
		flex: 1,
		width: window.width,
		height: window.height,
		backgroundColor: 'white',
	},
	avatarContainer: {
		backgroundColor: '#319bce',
		width: window.width,
		height: 170,
	},
	avatar: {
		marginLeft: 20,
		marginTop: 35,
		width: 120,
		height: 120,
		borderRadius: 60,
	},
	name: {
		color: 'white',
		fontSize: 20,
		position: 'absolute',
		left: 160,
		top: 70,
	},
	list: {
		zIndex: -100,
	},
	row: {
		width: window.width,
		height: 60,
	},
	optionTitle: {
		color: '#319bce',
		fontSize: 20,
		fontWeight: '300',
		position: 'absolute',
		left: 85,
		top: 19,
	},
	image: {
		marginLeft: 15,
		width: 40,
		height: 40,
		top: 10,
	},
	separator: {
	  	flex: 1,
	    height: 1,
	    backgroundColor: '#8E8E8E',
	    padding: 0
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

class HamburgerPanel extends Component {
	constructor(props) {
		super(props);

		this.list = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: this.list.cloneWithRows(options),
		};
	}

	// no idea what this variable is for. everything seems to work fine without it, but
	// I'm leaving it here just in case.

	// static propTypes = {
	// 	onItemSelected: React.PropTypes.func.isRequired,
	// };

	/* Use the name of the selected option to determine which page to display next */
	fetchOption = (dataName) => {
		var nextComponent;

		switch(dataName) {
			case 'My House':
				nextComponent = MyHousePage;
				break;
			case 'Profile':
				nextComponent = ProfilePage;
				break;
			case 'Bank Account':
				nextComponent = BankAccountPage;
				break;
			case 'Settings':
				nextComponent = SettingsPage;
				break;
			case 'Logout':
				nextComponent = CreatePage;
				break;
			default:
				nextComponent = TasksPage;
		}
		return {
			title: dataName,
			component: nextComponent,
		};
	}

	MyHouse = () => {
		return (
			<MyHousePage
				user={this.props.user}

			/>
		)
	}

	/* When an option is pressed, navigate to the proper page */
	onOptionPressed = (data) => {
		this.props.navigator.push(this.fetchOption(data.name));
		// close the settings menu
		this.props.toggle(); // OR:
		// this.props.updateMenuState(this.props.isOpen);
	}

	getUser = () => {
		return this.props.house.filter(this.checkTaskIsMine);
	}

	checkTaskIsMine = (value) => {
		return value.isMe;
	}

	/* Grab the proper icon to display, based on the image stored in data */
	renderIcon = (data) => {
		return (
			<Image source={ data.image } style={styles.image} />
		);
	}

	/* Render each row according to the data point (coming from the variable called 'options') */
	renderRow = (data) => {
		return (
			<TouchableOpacity onPress={() => this.onOptionPressed(data)}>
			  	<View style={styles.row}>
			  		{this.renderIcon(data)}
			    	<Text style={styles.optionTitle}>{data.name}</Text>
			  	</View>
			</TouchableOpacity>
		);
	}

	/* Render everything in the HamburgerPanel. */
	render() {
		console.log('rendering HamburgerPanel');
		return (
			<ScrollView scrollEnabled={false} scrollsToTop={false} style={styles.menu}>
				<View style={styles.avatarContainer}>
					<Image
						style={styles.avatar}
						source={{ uri: this.getUser()[0].picURL }} />
					<Text style={styles.name}>
						{this.getUser()[0].firstName}{'\n'}
						{this.getUser()[0].lastName}
					</Text>
				</View>

				<View style={styles.separator} />
				<ListView
					scrollEnabled={false}
					style={styles.list}
					dataSource={this.state.dataSource}
					renderRow={this.renderRow}
					renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} /> }
				/>
			</ScrollView>
		);
	}
};

export default HamburgerPanel;