import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';
import Router from '../jar/navigation/Router.js'
import TasksPage from '../jar/pages/TasksPage.js'

class App extends React.Component {
  render() {
    return (
      <NavigatorIOS 
        initialRoute={{
          component: TasksPage,
          title: 'Tasks Page',
        }}
        style={styles.container} 
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

Exponent.registerRootComponent(App);