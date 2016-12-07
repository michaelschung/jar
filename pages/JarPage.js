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
		this.state = {
			renderPlaceholderOnly: true,
			showModal: false
		};
	}

	onPressUseNow = () => {
		this.setState({
			showModal: true,
		});
	}

	removeModal = () => {
		this.setState({
			showModal: false,
		});
	}


  getCancelButton = () => {
    return (
      <Button 
        text='Cancel' 
        color='#C55254' 
        size='medium' 
        onPress={()=>{this.setState({
          showModal: false
        })}}
      />
    );
  }

  getAcceptButton = () => {
    return (
      <Button
        text='Pay'
        color='#6BAC4E'
        size='medium'
        onPress={()=>{this.setState({
          showModal: false
        })}}
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

	render() {
		console.log('rendering JarPage');

		var modal;
		if (this.state.showModal) {
			modal = (<TitleBodyButtonsModal
				title='Pay with Jar!' 
				bodyView={this.getModalBody} 
				buttonViews={[this.getCancelButton, this.getAcceptButton]}
				visible={true}
    		/>);
		} else {
			modal = null;
		}

		return (
			<View style={styles.container}>
				<Text style={styles.jarTotal}>$50</Text>
				<Image source={require('../assets/jar_logo.png')} style={styles.jarLogo} />
				<TouchableOpacity onPress={() => this.onPressUseNow()} style={styles.useNowButton}>
					<Text style={styles.buttonText}>Use</Text>
				</TouchableOpacity>
				{modal}
			</View>
		);
	}
}

export default JarPage;