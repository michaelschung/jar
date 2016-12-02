'use strict';

import React, { Component } from 'react'
import SimpleModal from '../components/SimpleModal'
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
  	fontWeight: 'bold',
    fontFamily: 'Avenir',
  	marginBottom: 20
  },


  jarLogo: {
  	marginBottom: 55
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
    bottom: 5
  },

  buttonText: {

  	color: 'white',
  	alignSelf: 'center',
  	fontSize: 35,
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

	render() {
    var modal;
    if (this.state.showModal) {
      modal = (<SimpleModal message='Hold near reader to pay!' removeModal={this.removeModal} />);
    } else {
      modal = null;
    }
		console.log('rendering jar page');
		return (
			<View style={styles.container}>
				<Text style={styles.jarTotal}>$50</Text>
				<Image source={require('../assets/jar_logo.png')} 
						style={styles.jarLogo} />
				<TouchableOpacity onPress={() => this.onPressUseNow()} style={styles.useNowButton}>
					<Text style={styles.buttonText}>Use</Text>
				</TouchableOpacity>
        {modal}
			</View>
		);
	}
}


export default JarPage;


