
import React, { Component } from 'react'
import TitleBodyButtonsModal from '../components/TitleBodyButtonsModal'
import Button from '../components/Button'
import { 
	View, 
	Text, 
	StyleSheet,
	Modal,
	TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
});

class ConfirmationModal extends Component {
	/*
	 * Expects following properties:
	 * 
	 * .title - string that will be used as title of modal
	 * .confirmText
	 * .confirmCallback
	 * .cancelText
	 * .cancelCallback
	 */
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: true,
		};
	}

	render() {

		var confirmButton = () => { return (<Button text={this.props.confirmText} color='#6BAC4E' size='medium' onPress={this.props.confirmCallback }/>) }
		var cancelButton = () => { return (<Button text={this.props.cancelText} color='#C55254' size='medium' onPress={this.props.cancelCallback }/>) }
		var body = () => {return (<View></View>)}

		return (
			<TitleBodyButtonsModal
				title={this.props.title}
				bodyView={body}
				buttonViews={[cancelButton, confirmButton]}
			/>
		);
	}
}

export default ConfirmationModal;