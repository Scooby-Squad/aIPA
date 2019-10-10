import React, { Component } from 'react';
import { WebView } from 'react-native-webview';


export default function SunburstScreen(props) {
  


  return (
    <WebView source={{ uri: 'http://scoobysquadaipa.herokuapp.com/zoomable-sunburst/' }} />
  )
}
