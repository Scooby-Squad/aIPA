import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import store from '../store';

export default function BubbleChartScreen(props) {

  // Server for live app must be scoobysquadaipa.herokuapp.com, only use localhost:8080 for testing


  return (
    <WebView source={{ uri: `http://scoobysquadaipa.herokuapp.com/bubble-chart/?u=${store.getState().user.id}` }} />
  )
}
