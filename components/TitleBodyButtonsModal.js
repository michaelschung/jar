
import React, { Component } from 'react'
import { 
	View, 
	Text, 
	StyleSheet,
	Modal,
	TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
	modalContainer: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		flex: 1,
		justifyContent: 'center',
		padding: 20,
	},
	innerModalContainer: {
		flexDirection: 'column',
		backgroundColor: '#fff',
		borderRadius: 10,
		justifyContent: 'center',
		minHeight: 50,
	},
	modalTitle: {
		fontSize: 20,
		marginBottom: 10,
		marginTop: 20,
		textAlign: 'center',
	},
	modalBodyContainer: {
		alignItems: 'center',
		margin: 10,
	},
	modalButtonsContainer: {
		justifyContent: 'center',
		flexDirection: 'row',
		marginBottom: 20,
	},
	buttonContainer: {
		margin: 5,
	},
});

class TitleBodyButtonsModal extends Component {
	/*
	 * Expects following properties:
	 * 
	 * .title - string that will be used as title of modal
	 * .bodyView - function that returns a view that should be used as body of modal
	 * .buttonViews - array of functions that return button components to be used
	 *		Buttons should be Touchable_ views and already have an onPressed action		
	 *
	 *    Note that buttons may look wacky due to styling. To be safe, only define buttons'
	 *    shape, color, and text; margin will be added here.
	 *
	 * .removeModal - optional callback function called when modal is pressed
	 */
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: true,
		};
	}

	_removeModal = () => {
		if (this.props.removeModal) {
			this.props.removeModal();
		}
	}

	renderButtons = () => {
		var buttons = this.props.buttonViews.map((render, index) => {
								return (
									<View key={index} style={styles.buttonContainer}>
										{render()}
									</View>
								);
							});

		return (
			<View style={styles.modalButtonsContainer}>
				{
					buttons
				}
			</View>
		);
	}

	render() {
		return (
			<View>
				<Modal
					animationType={'fade'}
					transparent={true}
					visible={this.state.modalVisible}
					supportedOrientations={['portrait']}
					>
					<TouchableOpacity style={styles.modalContainer} onPress={this._removeModal} >
						<View style={styles.innerModalContainer}>
							{/* Title */}
							<Text style={styles.modalTitle}>{this.props.title}</Text>

							{/* Body */}
							<View style={styles.modalBodyContainer}>
								{
									this.props.bodyView()
								}
							</View>

							{/* Buttons */}
							{
								this.renderButtons()
							}

						</View>
					</TouchableOpacity>
				</Modal>
			</View>
		);
	}
}

export default TitleBodyButtonsModal;