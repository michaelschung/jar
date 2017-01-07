'use strict';

import React, { Component } from 'react'
import SimpleModal from '../components/SimpleModal'
import TitleBodyButtonsModal from '../components/TitleBodyButtonsModal'
import Button from '../components/Button'
import {
	Alert,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableHighlight,
	View,
} from 'react-native';

import * as firebase from 'firebase';
const database = firebase.database();
const ref = database.ref();

var jarBalance = 0;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingTop: 74,
		margin: 12,
	},

	jarTotal: {
		color: '#319bce',
		fontSize: 55,
		fontWeight: '500',
		fontFamily: 'Avenir',
		fontWeight: '500',
		marginBottom: 20
	},

	jarLogo: {
		marginBottom: 55,
	},

	useNowButton: {
		backgroundColor: '#319bce',
		justifyContent: 'center',
		marginBottom: 50,
		borderRadius: 10,
		minHeight: 50,
		minWidth: 50,
		height: 60,
		width: 250,
		bottom: 5,
	},

	buttonText: {
		color: 'white',
		alignSelf: 'center',
		fontSize: 35,
		fontWeight: '500',
		fontFamily: 'Avenir',
	}
});


class JarPage extends Component {
	constructor(props) {
		super(props);

		this.readJarAmount();

		this.state = {
			renderPlaceholderOnly: true,
			showReaderModal: false,
			showPayModal: false,
			jarAmount: jarBalance,
		};
	}

	readJarAmount() {
		ref.child('Jar/total').on('value', (snap) => {
			jarBalance = snap.val();
			this.setState({jarAmount: jarBalance});
		});
	}

	onPressUseNow = () => {
		this.setState({
			showReaderModal: true,
			timer: setTimeout(() => {
				clearTimeout(this);
				console.log("timer up");
				this.setState({
					showReaderModal: false,
					showPayModal: true,
				})
			}, 3000)
		});

	}

	removeModal = () => {
		this.setState({
			showReaderModal: false,
			showPayModal: false,
		});
	}


	getCancelButton = () => {
		return (
			<Button 
				text='Cancel' 
				color='#C55254' 
				size='medium' 
				onPress={() => {
					var timer = this.state.timer;
					clearTimeout(timer);
					this.setState({
					  showReaderModal: false,
					  showPayModal: false,
					})
				}}
			/>
		);
	}

	getAcceptButton = () => {
		return (
			<Button
				text='Pay'
				color='#6BAC4E'
				size='medium'
				onPress={()=>{
					// this.props.changeJarAmount(-17.59);
					ref.child('Jar/total').once('value').then(function(snap) {
						ref.child('Jar/total').set(snap.val() - 17.59);
					});
					// var oldAmount = this.state.jarAmount;
					this.setState({
						showPayModal: false,
						// jarAmount: oldAmount - 17.59,
					});

				}}
			/>
		);
	}

	getModalBody = () => {
		return (
			<View style={{flexDirection: 'column', alignSelf:'stretch'}}>
				<View style={{flexDirection: 'row', alignSelf: 'stretch'}}>
					<Image 
						source={{ uri: 'https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/12407728_866751810090890_1367792716_n.jpg?ig_cache_key=MTE3NTUzODc1NTgxNjQzOTM2Nw%3D%3D.2' }}
						style={{flex:1, height: 100}}
					/>
				</View>
				<Text style={{textAlign:'center', margin: 10, 'fontSize': 22, fontFamily: 'Avenir'}}>Teaspoon</Text>
				<Text style={{textAlign:'center', margin: 6, 'fontSize': 24, fontFamily: 'Avenir', color: '#319bce', fontWeight: '800'}}>$17.59</Text>
			</View>

		);
	}

	getReaderModalBody = () => {
		return (
			<View style={{alignItems:'center'}}>
				<Image 
					source={require('../assets/reader_icon.png')}
				/>
			</View>
		);
	}

	render() {
		console.log('rendering JarPage');

		return (
			<View style={styles.container}>
				<Text style={styles.jarTotal}>${jarBalance.toFixed(2)}</Text>
				<Image source={require('../assets/jar_logo.png')} style={styles.jarLogo} />
				<TouchableOpacity onPress={() => this.onPressUseNow()} style={styles.useNowButton}>
					<Text style={styles.buttonText}>Use</Text>
				</TouchableOpacity>
				<TitleBodyButtonsModal
					title='Pay with Jar!' 
					bodyView={this.getModalBody} 
					buttonViews={[this.getCancelButton, this.getAcceptButton]}
					visible={this.state.showPayModal}
				/>
				<TitleBodyButtonsModal
					title='Hold near reader to pay!' 
					bodyView={this.getReaderModalBody} 
					buttonViews={[this.getCancelButton]}
					visible={this.state.showReaderModal}
				/>
			</View>
		);
	}
}

export default JarPage;