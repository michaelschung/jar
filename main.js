import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

import TasksPage from '../jar/pages/TasksPage.js'
import JarPage from '../jar/pages/JarPage.js'

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  jarPressed() {
    this.refs.nav.push({
      title: 'Jar',
      component: JarPage,
    })
  }

  render() {
    console.log('rendering main');
    return (
      <NavigatorIOS
        ref='nav'
        barTintColor='#319bce'
        titleTextColor='#fff'
        tintColor='#fff'
        initialRoute={{
          component: TasksPage,
          title: 'Tasks Page',
          rightButtonTitle: 'Jar',
          onRightButtonPress: () => this.jarPressed(),
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