import { Navigation } from 'react-native-navigation'

import PlannerScreen from './planner'
import MensaScreen from './mensa'
import WeatherScreen from './weather'

// register all screens of the app (including internal ones)
export function registerScreens() {
    Navigation.registerComponent('hochschulApp.PlannerScreen', () => PlannerScreen)
    Navigation.registerComponent('hochschulApp.MensaScreen', () => MensaScreen)
    Navigation.registerComponent('hochschulApp.WeatherScreen', () => WeatherScreen)
}
