import {
  createRouter,
} from '@exponent/ex-navigation';
import React from 'react';
import {
  Text,
  View,
} from 'react-native';

import TasksPage from '../pages/TasksPage.js';
console.log(TasksPage)

const Router = createRouter(() => ({
	tasks: () => TasksPage,
}))

console.log(Router);
export default Router