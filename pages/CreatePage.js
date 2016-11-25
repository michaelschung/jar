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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 74,
    paddingLeft: 40,
    marginTop: 80
  },

  textPrompt: {
  	color: 'black',
  	fontSize: 30,
  	fontWeight: 'bold',
  	marginBottom: 20
  },

  textInput: {
  	height: 30,
  	width: 300,
  	fontSize: 20,
  }

});


class CreatePage extends Component {
	constructor(props) {
	    super(props);
	    this.state = {renderPlaceholderOnly: true};
	}

	onPressUseNow = () => {
		Alert.alert("Hold near reader to pay!");
	}

	render() {
		console.log('rendering jar page');
		return (
			<View style={styles.container}>
				<Text style={styles.textPrompt}>What's the task?</Text>
				<View style={{borderBottomColor: '#d3d3d3', borderBottomWidth: 1}}>
					<TextInput
				    	style={styles.textInput}
				    	multiline={false}
				    	onChangeText={(text) => this.setState({text})}
				    />
				</View>
				
			</View>

		);
	}
}


export default CreatePage;


