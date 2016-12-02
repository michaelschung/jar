
import React, { Component } from 'react'
import { 
	Text, 
	StyleSheet,
} from 'react-native';


class AvenirText extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Text style={{fontFamily:'Avenir', fontWeight:'bold'}}>{this.props.children}</Text>
		);
	}
}

export default AvenirText