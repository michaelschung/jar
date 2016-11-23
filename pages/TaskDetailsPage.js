'use strict';

import React, { Component } from 'react'
import TaskRowItem from '../components/TaskRowItem'
import NotesInput from '../components/NotesInput'
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
  Keyboard
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

  renderUser = (userData, index) => {
    return (
      <TouchableOpacity key={index}>
        <View style={styles.userContainer}>
          <Image source={{ uri: userData.picURL }} style={styles.userImage} />
          <Text style={styles.userName}>{userData.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ScrollView 
        automaticallyAdjustContentInsets={false}
        alwaysBounceHorizontal={true} 
        horizontal={true}
        centerContent = {true}
        style={styles.carousel} >
        {this.transferToList.map(this.renderUser)}
      </ScrollView>
    );
  }
}


class TaskDetailsPage extends Component {
	constructor(props) {
    console.log(props.picURL);
    super(props);
    this.state = {renderPlaceholderOnly: true};
  }

	render() {
		console.log('rendering details page');
		var numDays = moment(this.props.task.due).fromNow();
    /* Get number of days between now and due date */
    var dueDate = new Date(this.props.task.due)
    var now = new Date()
    var timeDiff = Math.abs(now.getTime() - dueDate.getTime())
    var daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

		return (
      <TouchableWithoutFeedback onPress = {() => dismissKeyboard()}>
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

          {/*<TransferToCarousel></TransferToCarousel>*/}

          {/* Notes */}
          <View style={styles.notesContainer}>
            <Text style={styles.label}>Notes:</Text>
            <NotesInput />
          </View>

          <View style={styles.separator}></View>

          {/* Action buttons */}
  				<View style={styles.buttonsContainer}>
  					<TouchableOpacity style={styles.button}>
  						<Text style={styles.buttonText}>Transfer Task</Text>
  					</TouchableOpacity>
  					<TouchableOpacity style={styles.button}>
  						<Text style={styles.buttonText}>Complete Task</Text>
  					</TouchableOpacity>
  				</View>
          
  			</View>
      </TouchableWithoutFeedback>
		);
	}
}


export default TaskDetailsPage;


