'use strict';

import React, { Component } from 'react'
import TaskRowItem from '../components/TaskRowItem'
import NotesInput from '../components/NotesInput'
import SimpleModal from '../components/SimpleModal'
import {
	StyleSheet,
	Text,
	TextInput,
	View,
  ScrollView,
	TouchableHighlight,
  TouchableWithoutFeedback,
	ActivityIndicator,
	Image,
	ListView,
	TouchableOpacity,
  Keyboard,
  LayoutAnimation,
} from 'react-native';

var moment = require('moment');
const dismissKeyboard = require('dismissKeyboard');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    paddingTop: 74,
    margin: 12,
  },

  /* Styling for details */
  taskName: {
  	fontSize: 24,
  },
  detailsContainer: {
    marginTop: 20,
    flexDirection: 'row',
  	flex: 1,
  },
  textDetailsContainer: {
    marginLeft: 20,
    flexDirection: 'column',
    flex: 1
  },
  taskNameTextContainer: {
    marginTop: 15,
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  taskNameText: {
    fontSize: 24,
    fontWeight: '500',
  },
  label: {
    textAlign: 'left',
    fontSize: 20,
  },
  dueAndTimeContainer: {
    flexDirection: 'column',
  },
  dueInTextContainer: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginBottom: 3,
  },
  dueInText: {
    color: '#319bce',
    textAlign: 'right',
    fontSize: 20,
  },
  dueInTextUrgent: {
    color: 'red',
    textAlign: 'right',
    fontSize: 20,
  },
  timeToCompleteTextContainer: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginTop: 3,
  },
  timeToCompleteText: {
    textAlign: 'right',
    fontSize: 20,
  },
  taskOwnerImageContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  ownerImage: {
    marginRight: 20,
    height: 100,
    width: 100,
    borderRadius: 50,
  },

  /* Styling for notes */
  notesContainer: {
    marginTop: -20,
    marginLeft: 20,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  /* Styling for separator */
  separator: {
    borderBottomWidth: 2,
    borderBottomColor: '#C7C7CD',
    marginLeft: 20,
    marginRight: 20,
  },

  /* Styling for buttons */
  buttonsContainer: {
    marginTop: 20,
  	flex: 1,
  	alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#319bce',
    marginBottom: 15,
    borderRadius: 15,
    minHeight: 75,
    minWidth: 250,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '500',
  	color: 'white',
  	alignSelf: 'center',
  	fontSize: 24,
  },

  /* Styling for carousel */
  carousel: {
    flex: 1,
    flexDirection: 'column',
    margin: 20,
  },
  carouselHeader: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  carouselHeaderText: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '900',
  },
  carouselCancel: {
    justifyContent: 'center',
  },
  carouselCancelButton: {
    alignItems: 'center',
    backgroundColor: '#D8D8D8',
    height: 30,
    width: 30,
    borderWidth: 1,
    borderRadius: 60,
  },
  cancelText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  carouselScrollView: {
    height: 50,
    margin: 20,
  },
  userContainer: {
    flexDirection: 'column',
    margin: 10,
    alignItems: 'center',
  },
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  userName: {},

});


/* Array of users */
var users = [
  {
    name: 'Michael', 
    picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/Michael.jpg',
    isMe: true, 
  },
  {
    name: 'Evan', 
    picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/Evan.jpg',
    isMe: false,
  },
  {
    name: 'David', 
    picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/David.JPG', 
    isMe: false,
  },
  {
    name: 'Tessera', 
    picURL: 'http://web.stanford.edu/class/cs147/projects/Home/Jar/images/Tessera.jpg', 
    isMe: false,
  }, 
];


/* Transfer users carousel component */
class TransferToCarousel extends Component {
  constructor(props) {
    super(props);
    /* Construct list of possible users to transfer task to */
    this.transferToList = users.filter((user)=>!user.isMe);
  }

  /* Render modal stating transfer request was sent */
  _onPressTransferIcon = (userData) => {
    /* Show modal (done in TaskDetailsPage component)*/
    this.props.showModal(userData)
  }

  renderUser = (userData, index) => {
    return (
      <View key={index}>
        <TouchableOpacity onPress={() => this._onPressTransferIcon(userData)}>
          <View style={styles.userContainer}>
            <Image source={{ uri: userData.picURL }} style={styles.userImage} />
            <Text style={styles.userName}>{userData.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <ScrollView 
        automaticallyAdjustContentInsets={false}
        alwaysBounceHorizontal={true} 
        horizontal={true}
        centerContent = {false}
        style={styles.carouselScrollView} >
        {this.transferToList.map(this.renderUser)}
      </ScrollView>
    );
  }
}


class TaskDetailsPage extends Component {
	constructor(props) {
    super(props);
    this.state = {
      renderPlaceholderOnly: true,
      selectingTransfer: false,
      showModal: false,
      showTransferSentModal: false,
      showTaskCompleteModal: false,
    };
  }

  componentWillUpdate() {
      LayoutAnimation.easeInEaseOut();
  }

  /* For rendering transfer carousel when transfer button pressed */
  _onPressTransfer = () => {
    this.setState((state) => ({
      renderPlaceholderOnly: state.renderPlaceholderOnly,
      selectingTransfer: true,
      showModal: false,
      showTransferSentModal: false,
      showTaskCompleteModal: false,
    }));
  }

  /* For removing transfer carousel and rendering buttons when cancel is pressed */
  _onPressCancelTransfer = () => {
    this.setState((state) => ({
      renderPlaceholderOnly: state.renderPlaceholderOnly,
      selectingTransfer: false,
      showModal: false,
      showTransferSentModal: false,
      showTaskCompleteModal: false,
    }));
  }

  /* For showing 'transfer request sent' modal when transfer icon is pressed */
  _onPressTransferIcon = (userData) => {
    this.setState((state) => ({
      renderPlaceholderOnly: state.renderPlaceholderOnly,
      selectingTransfer: false,
      showModal: true,
      showTransferSentModal: true,
      showTaskCompleteModal: false,
      transferSentTo: userData.name,
    }));
  }

  /* For showing "Task completed" modal */
  _onCompleteTask = () => {
    this.setState((state) => ({
      renderPlaceholderOnly: state.renderPlaceholderOnly,
      selectingTransfer: false,
      showModal: true,
      showTransferSentModal: false,
      showTaskCompleteModal: true,
    }));
  }

  /* For removing modal */
  _onDismissModal = () => {
    this.setState((state) => ({
      renderPlaceholderOnly: state.renderPlaceholderOnly,
      selectingTransfer: false,
      showModal: false,
      showTransferSentModal: false,
      showTaskCompleteModal: false,
    }));
  }

  /* Action buttons */
  ActionButtons = () => 
    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.button} onPress={this._onPressTransfer} >
        <Text style={styles.buttonText}>Transfer Task</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={this._onCompleteTask} >
        <Text style={styles.buttonText}>Complete Task</Text>
      </TouchableOpacity>
    </View>
  

  /* Carousel */
  Carousel = () => 
    <View style={styles.carousel}>
      <View style={styles.carouselHeader}>
        <Text style={styles.carouselHeaderText}>Transfer to...</Text>
        <TouchableOpacity style={styles.carouselCancel} onPress={this._onPressCancelTransfer}>
          <View style={styles.carouselCancelButton}>
            <Text style={styles.cancelText}>x</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TransferToCarousel showModal={this._onPressTransferIcon} ></TransferToCarousel>
    </View>
  

	render() {
		var numDays = moment(this.props.task.due).fromNow();
    /* Get number of days between now and due date */
    var dueDate = new Date(this.props.task.due)
    var now = new Date()
    var timeDiff = Math.abs(now.getTime() - dueDate.getTime())
    var daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    /* Determine whether to show transfer modal or not */
    var modal;
    if (this.state.showModal) {
      /* Message to show in modal */
      var message = this.state.showTransferSentModal ? 
        ('Transfer request sent to ' + this.state.transferSentTo + '!') :
        ('Task completed!');

      modal = (<SimpleModal 
        message={message}
        removeModal={this._onDismissModal}
        ></SimpleModal>);
    } else {
      modal = null;
    }

		return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
  			<View style={styles.container}>
          {/* Details about task */}
  				<View style={styles.detailsContainer}>
            <View style={styles.textDetailsContainer}>
              <View style={styles.taskNameTextContainer}>
                <Text style={styles.taskNameText}>{this.props.task.name}</Text>
              </View>
              <View style={styles.dueAndTimeContainer}>
                <View style={styles.dueInTextContainer}>
                  <Text style={styles.label}>Due:</Text>
                  {/* Use urgent style if task is due within 24 hours (1 day) */}
                  <Text style={daysLeft > 1 ? styles.dueInText : styles.dueInTextUrgent}>{numDays}</Text>
                </View>
                <View style={styles.timeToCompleteTextContainer}>
                  <Text style={styles.label}>Will Take:</Text>
                  <Text style={styles.timeToCompleteText}>{this.props.task.timeToComplete}</Text>
                </View>
              </View>
            </View>
            <View style={styles.taskOwnerImageContainer}>
              <Image source={{ uri: this.props.task.owner.picURL }} style={styles.ownerImage} />
            </View>
  				</View>

          {/* Notes */}
          <View style={styles.notesContainer}>
            <Text style={styles.label}>Notes:</Text>
            <NotesInput />
          </View>

          <View style={styles.separator}></View>

          {/* Action buttons or carousel (depending on state of page) */}
          {
            this.state.selectingTransfer ?
            this.Carousel() :
            this.ActionButtons()
          }

          {/* Show modal if transfer request was sent */}
          {
            modal
          }

  			</View>
      </TouchableWithoutFeedback>
		);
	}
}


export default TaskDetailsPage;


