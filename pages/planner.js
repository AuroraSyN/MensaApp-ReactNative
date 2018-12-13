import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import PushNotification from 'react-native-push-notification'
import Moment from 'moment'

export default class Planner extends React.Component {
    async componentDidMount() {
        PushNotification.configure({
            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
                console.log('NOTIFICATION:', notification)
            },

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             */
            requestPermissions: true
        })
    }

    schedulePushNotification = (notificationDate, notificationMessage, id) => {
        PushNotification.localNotificationSchedule({
            userInfo: { id: id },
            message: notificationMessage + ' beginnt in 5 Minuten',
            date: notificationDate
        })

        console.log('scheduled notifiation for ', notificationDate.toString(), ' with id: ', id)
        console.log('message: ' + notificationMessage)
    }

    cancelPushNotification = id => {
        PushNotification.cancelLocalNotifications({ id: id })
        console.log('cancelled notifiation with id: ', id)
    }

    toggleFavoriteState = (key, start) => {
        this.setState(prevState => {
            let element = prevState.plannerList.filter(element => element.key == key && element.start == start)
            element[0].isMarked = element[0].isMarked ? false : true

            // console.log(element[0])

            let notificationDate = Moment(element[0].start, 'HH:mm').subtract(5, 'minutes')
            let notificationMessage = element[0].group + ': ' + element[0].description

            if (element[0].isMarked) {
                this.schedulePushNotification(notificationDate, notificationMessage, element[0].key)
            } else {
                this.cancelPushNotification(element[0].key)
            }
            return { update: true }
        })
    }

    constructor(props) {
        super(props)

        this.state = {
            plannerList: []
        }

        getPlannerData().then(data => {
            this.setState({
                plannerList: data
            })
        })
    }

    render() {
        return (
            <ScrollView>
                <View>
                    {this.state.plannerList.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.description}
                            subtitle={item.start + ' - ' + item.end + ' • ' + item.room}
                            leftIcon={{ name: 'av-timer', color: 'black' }}
                            rightIcon={{ name: item.isMarked ? 'favorite' : 'favorite-border', color: item.isMarked ? 'red' : 'black' }}
                            onPressRightIcon={() => {
                                if (item.key == '1') {
                                    item.start = Moment()
                                        .add(5, 'seconds')
                                        .add(5, 'minutes')
                                }
                                this.toggleFavoriteState(item.key, item.start)
                            }}
                        />
                    ))}
                </View>
            </ScrollView>
        )
    }
}

async function getPlannerData() {
    let data = await fetchApi('https://campus.hs-worms.de/apps/WhatsUp/data/events.json')

    data[0] = {
        day: 'Fr',
        description: 'Test Push Notification',
        end: '07:00',
        group: 'Klausur',
        isMarked: false,
        key: '1',
        respp: 'React Native',
        room: 'Raum A',
        start: '06:00'
    }

    return data.filter(item => item.hasClass != 'menu')
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
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44
    }
})
