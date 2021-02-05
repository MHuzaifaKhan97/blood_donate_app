import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Title, Input, Item, Body, Label, Icon, Left } from 'native-base';
import MyIcon from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';
import { Picker } from '@react-native-picker/picker';
import { connect } from 'react-redux';
import { addDonor } from '../store/action';
import { add } from 'react-native-reanimated';

class AddDonor extends Component {

    state = {
        name: '',
        email: '',
        bloodGroup: '',
        address:'',
        password: '',
    }

    addDonor = () => {
        const { name, email, bloodGroup, contactNo,address } = this.state;
        let id = database().ref("users").push().key;

        if (name == "") {
            Alert.alert('Error', 'Please Enter Your Name',);
        } else if (email == "") {
            Alert.alert('Error', 'Please Enter Your Email',);
        }
        else if (contactNo == "") {
            Alert.alert('Error', 'Please Enter Your Contact Number',);
        }
        else if (address == "") {
            Alert.alert('Error', 'Please Enter Your Address',);
        }
        else if (bloodGroup == "") {
            Alert.alert('Error', 'Please Select You Blood Group',);
        }
        else {
            if (contactNo.length != 11) {
                Alert.alert('Error', 'Invalid Contact Number');
            }
            else {
                let donor = {
                    id:id,
                    name:name,
                    email:email,
                    contactNo:contactNo,
                    address:address,
                    bloodGroup:bloodGroup,
                }
                this.props.adddonor(donor);
                database().ref('donors').child(id).set(donor)
                .then((response) => {
                    Alert.alert('Success','Successfully Donor Added');
                    this.setState({
                        name:'',
                        email:'',
                        contactNo:'',
                        bloodGroup:'',
                        address:'',
                    })
                })
                .catch((error) => {
                    Alert.alert('Error',error.message);
                })
            }
        }
}
 
    render() {
        const { name, email, address, contactNo } = this.state;
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
                        <Text style={styles.bodyTitle}>BECOME A DONOR</Text>

                        <Item floatingLabel style={{ marginTop: 15 }}>
                            <Label style={{ color: '#f73b3b' }}>Enter Name</Label>
                            <Input value={name} maxLength={25} onChangeText={(text) => this.setState({ name: text })} />
                        </Item>

                        <Item floatingLabel style={{ marginTop: 10 }}>
                            <Label style={{ color: '#f73b3b' }}>Enter Email</Label>
                            <Input value={email} maxLength={30} keyboardType="email-address" onChangeText={(text) => this.setState({ email: text })} />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 10 }}>
                            <Label style={{ color: '#f73b3b' }}>Enter Contact No</Label>
                            <Input value={contactNo} maxLength={11} keyboardType="numeric" onChangeText={(text) => this.setState({ contactNo: text })} />
                        </Item>
                        <Item floatingLabel style={{ marginTop: 10 }}>
                            <Label style={{ color: '#f73b3b' }}>Enter Address</Label>
                            <Input value={address} maxLength={50} onChangeText={(text) => this.setState({ address: text })} />
                        </Item>

                        <Picker
                            selectedValue={this.state.bloodGroup}
                            style={{ width: '100%',color: '#f73b3b',marginRight:10, marginTop: 20, borderWidth: 1, borderRadius: 30 }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ bloodGroup: itemValue })
                            }>
                            <Picker.Item label="Select Blood Group" value="" color="#f73b3b" />
                            <Picker.Item label="A+" value="A+" color="#f73b3b" />
                            <Picker.Item label="A-" value="A-" color="#f73b3b" />
                            <Picker.Item label="B+" value="B+" color="#f73b3b" />
                            <Picker.Item label="B-" value="B-" color="#f73b3b" />
                            <Picker.Item label="AB+" value="AB+" color="#f73b3b" />
                            <Picker.Item label="AB-" value="AB-" color="#f73b3b" />
                            <Picker.Item label="O+" value="O+" color="#f73b3b" />
                            <Picker.Item label="O-" value="O-" color="#f73b3b" />

                        </Picker>

                        <TouchableOpacity style={{
                            backgroundColor: '#f73b3b',
                            width: '100%',
                            alignItems: 'center',
                            marginTop: 20,
                            paddingTop: 15,
                            paddingBottom: 15,
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            borderBottomRightRadius: 30,
                            borderBottomLeftRadius: 30,
                        }}
                            onPress={this.addDonor}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <MyIcon name="tint" color='white' size={15} style={{ marginTop: 3 }} />
                                <Text style={{ marginLeft: 8, color: 'white', fontSize: 15, fontWeight: '700' }}>
                                    ADD DONOR
                                    </Text>
                            </View>
                        </TouchableOpacity>


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
    adddonor: (donor) => dispatch(addDonor(donor))
})

// export default AddDonor;
export default connect(mapStateToProps,mapDispatchToProps)(AddDonor);

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