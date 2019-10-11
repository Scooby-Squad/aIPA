import React, { Component } from 'react';
import { WebView } from 'react-native-webview';


export default function BubbleChartScreen(props) {


  return (
    <WebView source={{ uri: 'http://scoobysquadaipa.herokuapp.com/bubble-chart/' }} />
  )
}
