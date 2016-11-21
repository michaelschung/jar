import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

import TasksPage from '../jar/pages/TasksPage.js'

class App extends React.Component {
  render() {
    console.log('rendering main');
    return (
      <NavigatorIOS
        barTintColor='#319bce'
        titleTextColor='#fff'
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