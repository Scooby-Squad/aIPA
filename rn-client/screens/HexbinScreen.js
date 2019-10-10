import React, { Component } from 'react';
import { WebView } from 'react-native-webview';


export default function HexbinScreen(props) {
  


  return (
    <WebView source={{ uri: 'http://scoobysquadaipa.herokuapp.com/hexbin/' }} />
  )
}
