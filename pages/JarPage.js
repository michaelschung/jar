'use strict';

import React, { Component } from 'react'
import {
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 74,
    margin: 12,
  },
});

class JarPage extends Component {
	constructor(props) {
    super(props);
    this.state = {renderPlaceholderOnly: true};
  }

	render() {
		console.log('rendering jar page');
		return (
			<View style={styles.container}>
				<Text>JAR PAGE</Text>
			</View>
		);
	}
}


export default JarPage;


