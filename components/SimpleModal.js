
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
		backgroundColor: '#fff',
		borderRadius: 10,
		alignItems: 'center',
		minHeight: 50,
	},
	modalText: {
		color: '#319BCE',
		fontSize: 20,
		marginBottom: 10,
		marginTop: 10,
	},
	modalButton: {
		justifyContent: 'center',
		backgroundColor: '#319bce',
		marginBottom: 15,
		marginTop: 15,
		borderRadius: 10,
		minHeight: 40,
		minWidth: 100,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '500',    
	},
});

class SimpleModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: true,
		};
	}

	_removeModal = () => {
		this.props.removeModal();
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
							<Text style={styles.modalText}>{this.props.message}</Text>
							<TouchableOpacity
								onPress={this._removeModal}
								style={styles.modalButton} >
								<Text style={styles.buttonText}>OK</Text>
							</TouchableOpacity>
						</View>
					</TouchableOpacity>
				</Modal>
			</View>
		);
	}
}

export default SimpleModal;