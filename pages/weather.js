import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'

export default class Weather extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        loading: true,
        weatherList: []
      };
  
      getWeatherData().then(data => {
        this.setState({
          loading: false,
          weatherList: data
        });
      });
    }
  
    render() {
      const { loading, weatherList } = this.state;
  
      if (loading) {
        return null;
      }
  
      return (
        <ScrollView>
          <View>
            <View style={styles.container}>
            <Image style={{ marginLeft: 10, width: 100, height: 100 }} source={{ uri: 'http://wetter.hs-worms.de/img/webcam/thumb_webcam.jpg'}}/>
              <Text style={styles.item}>Temperatur: {this.state.weatherList.temp.out.c} °C</Text>
              <Text style={styles.item}>Luftdruck: {this.state.weatherList.baro.toFixed(2)} hPa</Text>
              <Text style={styles.item}>Luftfeuchtigkeit: {this.state.weatherList.hum.out} %</Text>
              <Text style={styles.item}>Windgeschwindigkeit: {this.state.weatherList.wind.speed.kmh} Km/h</Text>
              <Text style={styles.item}>Durchschntl. Windgeschw.: {this.state.weatherList.wind.avg.kmh} Km/h</Text>
              <Text style={styles.item}>Windrichtung: {this.state.weatherList.wind.dir.text}</Text>
              <Text style={styles.item}>UV Index: {this.state.weatherList.sun.uv}</Text>
              <Text style={styles.item}>Sonneneinstrahlung: {this.state.weatherList.sun.rad} Watt/qm</Text>
              <Text style={styles.item}>Regen (heute): {this.state.weatherList.rain.day} mm</Text>
            </View>
          </View>
        </ScrollView>
      );
    }
  }

async function getWeatherData() {
    let data = await fetchApi('http://wetter2.mt-labor.it.hs-worms.de/api/data')
    return data
}

async function fetchApi(url) {
    try {
        let response = await fetch(url)
        let responseJson = await response.json()
        console.log(responseJson)
        return responseJson
    } catch (error) {
        console.error(error)
        return false
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44
    }
})