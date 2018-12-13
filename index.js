import { AppRegistry } from 'react-native'
import App from './App'
import { Navigation } from 'react-native-navigation'
import { registerScreens } from './pages'

AppRegistry.registerComponent('app_reactnative', () => App)

registerScreens() // this is where you register all of your app's screens

// start the app
Navigation.startTabBasedApp({
    tabs: [
        {
            label: 'Planner',
            screen: 'hochschulApp.PlannerScreen', // this is a registered name for a screen
            icon: require('./assets/icons/planner.png'),
            // selectedIcon: require('../img/one_selected.png'), // iOS only
            title: 'Planner'
        },
        {
            label: 'Mensa',
            screen: 'hochschulApp.MensaScreen',
            icon: require('./assets/icons/mensa.png'),
            // selectedIcon: require('../img/two_selected.png'), // iOS only
            title: 'Mensa'
        },
        {
            label: 'Weather',
            screen: 'hochschulApp.WeatherScreen',
            icon: require('./assets/icons/weather.png'),
            // selectedIcon: require('../img/two_selected.png'), // iOS only
            title: 'Weather'
        }
    ]
})
