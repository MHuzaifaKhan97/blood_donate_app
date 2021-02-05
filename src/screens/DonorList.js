import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Title, Input, Item, Body, Label, Icon, Spinner } from 'native-base';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { connect } from 'react-redux';
import { fetchDonor } from '../store/action';
import { ScrollView } from 'react-native-gesture-handler';

class DonorList extends Component {
    state = {
        donors: [],
        renderDonor: [],
        listShown: false,
        hasDonor: false,
        searchWord: ''
    }
    componentDidMount() {
        this.props.fetchdonor();
        setTimeout(() => {
            for (var key in this.props.donors[0]) {
                this.setState({
                    donors: [this.props.donors[0][key], ...this.state.donors],
                    renderDonor: [this.props.donors[0][key], ...this.state.donors]
                })
            }
            if (this.state.donors) {
                this.setState({
                    listShown: true,
                })
            }

        }, 2000)
    }
    searchDonor = () => {
        const { donors, renderDonor, searchWord } = this.state;
        let donor;
        if (this.state.searchWord == "") {
            this.setState({ renderDonor: this.state.donors });

        } else {
            // for (let i = 0; i < donors.length; i++) {
            //     if (donors[i].bloodGroup.toLowerCase() != searchWord.toLowerCase()) {
            //         this.setState({ hasDonor: true, renderDonor: donors })
            //     }
            // }
            donor = this.state.donors.filter((donor) => donor.bloodGroup.toLowerCase() == this.state.searchWord.toLowerCase());
            this.setState({ renderDonor: donor, searchWord: '', hasDonor: false });
            console.log(this.state.searchWord);
            // return;
        }
        // this.setState({
        //     hasDonor: true
        // })
        // else if (this.state.renderDonor === []) {
        //     console.log(this.state.renderDonor);
        //     console.log("DSDSS");
        // }
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="transparent" />
                <View style={styles.header}>
                    <Body style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                        <Image style={styles.logo} source={require('../assets/blood.png')} />
                        <Title style={styles.headerTitle}>DONATE</Title>
                    </Body>
                </View>
                <View style={styles.body}>
                    <View style={styles.loginBody}>
                        <Text style={styles.bodyTitle}>DONOR LIST</Text>
                        <Item style={{ marginTop: 25, borderRadius: 10, borderColor: '#fff' }}>
                            <Input
                                value={this.state.searchWord}
                                onChangeText={(text) => this.setState({ searchWord: text })}
                                placeholder='Search by blood group'
                                placeholderTextColor="#fff"
                                style={{ paddingLeft: 10, paddingBottom: 10, color: '#fff', fontWeight: '700' }}
                                maxLength={25} />
                            <TouchableOpacity onPress={() => this.searchDonor()}>
                                <Icon name="search" style={{ color: '#fff' }} />
                            </TouchableOpacity>
                        </Item>
                        <ScrollView style={{ width: '100%', height: '85%' }}>
                            {
                                this.state.listShown ?
                                    this.state.hasDonor ?
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: '#fff', marginTop: 20 }}>No Result Found.</Text>
                                        </View>
                                        :
                                        this.state.renderDonor.map((donor) => {
                                            return <TouchableOpacity key={donor.id} onPress={() => { this.props.navigation.navigate('Donor', donor) }} style={styles.optionsButton}>
                                                <View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={styles.optionsButtonText} >{donor.name}</Text>
                                                        <Text style={styles.optionsButtonText} > {`( ${donor.bloodGroup} )`} </Text>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.optionsButtonTextAddress} >{donor.address}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        })
                                    :
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Spinner color="white" />
                                    </View>
                            }
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    donors: state.donors
})
const mapDispatchToProps = (dispatch) => ({
    fetchdonor: () => dispatch(fetchDonor())
})
export default connect(mapStateToProps, mapDispatchToProps)(DonorList);


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        display: 'flex',
        fontFamily: 'monospace',
        flex: 1,
        justifyContent: 'space-between'
    },
    header: {
        display: 'flex',
        backgroundColor: '#fff',
        flex: 0.15,
    },
    body: {
        flex: 0.80,
        display: 'flex',
        backgroundColor: '#f73b3b',
        alignItems: 'center',
        borderTopStartRadius: 45,
        borderTopEndRadius: 45,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 38,
        marginTop: 5,
        paddingBottom: 10,
        marginLeft: 10,
        fontFamily: 'monospace',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        fontWeight: '700',
        color: '#f73b3b',
    },
    logo: {
        width: 50,
        height: 60
    },
    loginBody: {
        width: '80%',
        alignItems: 'center',
    },
    bodyTitle: {
        marginTop: 20,
        marginBottom: 10,
        fontWeight: '700',
        fontSize: 25,
        alignItems: 'center',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 8,
    },

    optionsButton: {
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 15,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    optionsButtonText: {
        fontWeight: '700',
        color: '#f73b3b',
        fontSize: 18,
        marginLeft: 10,
    },
    optionsButtonTextAddress: {
        fontWeight: '700',
        color: '#f73b3b',
        fontSize: 12,
        marginLeft: 10,

    },
    userTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 5,
        // paddingBottom: 10,
        // marginLeft: 10,
        fontFamily: 'monospace',
        textShadowColor: 'rgba(227, 89, 79, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        fontWeight: '700',
        color: '#f73b3b',
    }

})