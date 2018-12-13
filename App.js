import React from 'react'
import { AppRegistry, StyleSheet, FlatList, Text, View, Alert, ActivityIndicator, Platform} from 'react-native'

export default class App extends React.Component {
  constructor(props)
  {

    super(props);

    this.state = { 
    isLoading: true
  }
  }

  componentDidMount() {
    
       return fetch('http://wetter2.mt-labor.it.hs-worms.de/api/data')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             dataSource: responseJson
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }

  render() {

    return (

<View style={styles.container} data ={ this.state.dataSource }
      renderItem={({item}) => <Text > {item.temp.out.c} test</Text>}
      keyExtractor={(item, index) => index}
      ></View>            
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
  }
})