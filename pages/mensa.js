import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';

import Pdf from 'react-native-pdf';

export default class Planner extends React.Component {
    constructor() {
        super();
        this.state = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        };
        Dimensions.addEventListener("change", (e) => {
            this.setState(e.window);
        });
    }
      render() {
        const source = {uri:'https://www.studierendenwerk-vorderpfalz.de/home/speiseplaene/speiseplaene/pdf-controller-menueplan.html?tx_pdfcontroller_pi1%5BURL%5D=https%3A%2F%2Fwww.studierendenwerk-vorderpfalz.de%2Fhome%2Fspeiseplaene%2Fspeiseplaene%2Fworms-mensa-wochenplan-aktuell.html%3F%26L',cache:true};    
        return (
          <View style={styles.container}>
              <Pdf
                  source={source}
                  onLoadComplete={(numberOfPages,filePath)=>{
                      console.log(`number of pages: ${numberOfPages}`);
                  }}
                  onPageChanged={(page,numberOfPages)=>{
                      console.log(`current page: ${page}`);
                  }}
                  onError={(error)=>{
                      console.log(error);
                  }}
                  style={{flex:1, width: this.state.width}}/>
          </View>
      )
}
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
  }
});
