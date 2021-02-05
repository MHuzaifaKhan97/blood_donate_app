import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, Alert, Linking } from 'react-native';
import { Title, Input, Item, Body, Label, Icon, Left } from 'native-base';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import Communications from 'react-native-communications';


class Donor extends Component {
    state = {
        donor: {},
    }
    componentDidMount() {
        this.setState({
            donor: this.props.route.params,
        })
    }
    makePhoneCall = (number) => {
        Communications.phonecall(number, true);
    }
    sendTextMessage = (donor) => {
        Communications.text(donor.contactNo, `Hello ${donor.name}, I found your number on donate App. are you available for donating blood?`);
    }
    sendTextToWhatsapp = (donor) => {
        let message = `Hello ${donor.name}, I found your number on donate App. are you available for donating blood?`
        let url =
            'whatsapp://send?text=' +
            message +
            '&phone=92' + donor.contactNo;
        Linking.openURL(url);
    }
    render() {
        const { donor } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#f73b3b" />
                <View style={styles.header}>
                    <Body style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon onPress={() => { this.props.navigation.pop() }} name="arrow-left" style={{ color: "#fff", marginLeft: 20 }} type="FontAwesome5" />
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                            <Image style={styles.logo} source={require('../assets/blood.png')} />
                            <Title style={styles.headerTitle}>DONATE</Title>
                        </View>

                    </Body>
                </View>
                <View style={styles.body}>
                    <View style={styles.signUpBody}>
                        <Text style={styles.bodyTitle}>DONOR DETAIL</Text>

                        <Item regular style={{ marginTop: 25, borderRadius: 10, borderColor: '#f73b3b' }}>
                            <Input
                                disabled={true}
                                value={donor.name}
                                style={{ paddingLeft: 10, paddingBottom: 10, color: '#f73b3b', fontWeight: '700' }}
                                maxLength={25} />
                        </Item>
                        <Item regular style={{ marginTop: 15, borderRadius: 10, borderColor: '#f73b3b' }}>
                            <Input
                                disabled={true}
                                value={donor.email}
                                style={{ paddingLeft: 10, paddingBottom: 10, color: '#f73b3b', fontWeight: '700' }}
                                maxLength={25}  />
                        </Item>
                        <Item regular style={{ marginTop: 15, borderRadius: 10, borderColor: '#f73b3b' }}>
                            <Input
                                disabled={true}
                                value={donor.bloodGroup}
                                style={{ paddingLeft: 10, paddingBottom: 10, color: '#f73b3b', fontWeight: '700' }}
                                maxLength={25}  />
                        </Item>
                        <Item regular style={{ marginTop: 15, borderRadius: 10, borderColor: '#f73b3b' }}>
                            <Input
                                disabled={true}
                                value={donor.address}
                                style={{ paddingLeft: 10, paddingBottom: 10, color: '#f73b3b', fontWeight: '700' }}
                                maxLength={50}  />
                        </Item>

                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',marginTop:10}} >
                        
                    <TouchableOpacity style={{
                            backgroundColor: '#e07a4f',
                            borderColor: '#a64821',
                            borderWidth: 2,
                            width: '30%',
                            alignItems: 'center',
                            marginTop: 15,
                            paddingTop: 10,
                            paddingBottom: 10,
                            borderRadius: 100,
                        }}
                            onPress={() => this.sendTextMessage(donor)}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <MyIcon name="envelope" color='white' size={25} style={{ marginTop: 3 }} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            backgroundColor: '#316e8c',
                            borderColor: '#04497a',
                            borderWidth: 2,
                            width: '30%',
                            alignItems: 'center',
                            marginTop: 15,
                            paddingTop: 10,
                            paddingBottom: 10,
                            borderRadius: 100,
                        }}
                            onPress={() => this.makePhoneCall(donor.contactNo)}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <MyIcon name="phone" color='white' size={25} style={{ marginTop: 3 }} />
                             
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            backgroundColor: '#075e54',
                            width: '30%',
                            alignItems: 'center',
                            borderColor: '#0a4a23',
                            borderWidth: 2,
                            marginTop: 15,
                            paddingTop: 10,
                            paddingBottom: 15,
                            borderRadius: 100,
                        }}
                            onPress={() => this.sendTextToWhatsapp(donor)}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <MyIcon name="whatsapp" color='white' size={25} style={{ marginTop: 3 }} />
                                {/* <Text style={{ marginLeft: 8, color: 'white', fontSize: 18, fontWeight: '700' }}>
                                    {donor.contactNo}
                                </Text> */}
                            </View>
                        </TouchableOpacity>


                    </View>
                    </View>
                </View>
            </View>

        )
    }
}
export default Donor;


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        display: 'flex',
        fontFamily: 'monospace',
        flex: 1,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#f73b3b',
        flex: 0.15,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    body: {
        flex: 0.85,
        display: 'flex',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 38,
        marginTop: 5,
        marginLeft: 10,
        paddingBottom: 20,
        fontFamily: 'monospace',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        fontWeight: '700'
    },
    logo: {
        width: 50,
        height: 60,
        marginBottom: 20,

    },
    signUpBody: {
        width: '80%',
        alignItems: 'center',
    },
    bodyTitle: {
        marginTop: 60,
        fontWeight: '700',
        fontSize: 28,
        alignItems: 'center',
        color: '#f73b3b',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 8,
    },

})