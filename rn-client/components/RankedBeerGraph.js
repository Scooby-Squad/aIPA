import React from 'react'
import {ScrollView, View, StyleSheet, Button, Webview} from 'react-native'

class RankedBeerGraph extends React.Component {
    render(){

        return (
            <Webview 
            source={{uri: 'http://localhost:8080/zoomable-sunburst/'}}
            style={{marginTop: 20}}/>
            )
        }
}

export default RankedBeerGraph

/* 
 _   _                          _  ______     _      _                       ___  
| | | |                        | | |  _  \   | |    | |                     |__ \ 
| | | |_ __  _   _ ___  ___  __| | | | | |___| | ___| |_ ___   _ __ ___   ___  ) |
| | | | '_ \| | | / __|/ _ \/ _` | | | | / _ \ |/ _ \ __/ _ \ | '_ ` _ \ / _ \/ / 
| |_| | | | | |_| \__ \  __/ (_| | | |/ /  __/ |  __/ ||  __/ | | | | | |  __/_|  
 \___/|_| |_|\__,_|___/\___|\__,_| |___/ \___|_|\___|\__\___| |_| |_| |_|\___(_)  
                                                                                  
*/