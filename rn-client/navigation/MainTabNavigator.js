import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import QuizScreen from '../screens/QuizScreen';
import GraphsScreen from '../screens/GraphsScreen';
import SunburstScreen from '../screens/SunburstScreen';
import BubbleChartScreen from '../screens/BubbleChartScreen';
import HexbinScreen from '../screens/HexbinScreen';
import SingleBeerScreen from '../screens/SingleBeerView';
import RecommendedList from '../components/RecommendedList'
import RealSettings from '../components/RealSettings'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Quiz: QuizScreen,
    Recs: RecommendedList,
    Graphs: GraphsScreen,
    Sunburst: SunburstScreen,
    BubbleChart: BubbleChartScreen,
    Hexbin: HexbinScreen,
    SingleBeer: SingleBeerScreen,
    RealSettings: RealSettings
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-home` : 'md-home'}
    />
  )
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
    SingleBeer: SingleBeerScreen
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Beer Rankings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-beer' : 'md-beer'}
    />
  )
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    SingleBeer: SingleBeerScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
    />
  )
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack
});

tabNavigator.path = '';

export default tabNavigator;
