
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  Image,
  TouchableHighlight,
   } from 'react-native';
import TaskDetailsPage from '../pages/TaskDetailsPage.js'

var moment = require('moment');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskName: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  due: {
    flex: 1,
    textAlign: 'right',
  },
});

const TaskRowItem = (props) => {
    console.log(props.due);
    var numDays = moment(props.due).fromNow();
    return (
      <TouchableHighlight style={styles.container}>
        <View style={styles.container}>
          <Image source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }} style={styles.photo} />
          <Text style={styles.taskName}>{props.name}</Text>
          <Text style={styles.due}>{numDays}</Text>
        </View>
      </TouchableHighlight>
    );
  };

export default TaskRowItem;