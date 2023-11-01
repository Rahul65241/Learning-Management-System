import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, ImageBackground, Dimensions, TextInput, TouchableOpacity, FlatList, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


export default function Booking({ navigation, route }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [courseid, setCourseid] = useState(route.params.courseid);
    const [coursedata, setCoursedata] = useState();

    const [images, setImages] = useState([
        require('../img/2.jpg'),
        require('../img/13.jpg'),
        require('../img/1.jpg'),
    ])
    console.log(route);

    useEffect(() => {
        onCourseDetail();
    }, [])

    const onCourseDetail = async () => {
        try {
            const { data } = await axios({
                method: 'get',
                url: 'https://lmsystem-5cdb1-default-rtdb.firebaseio.com/' + courseid + '.json',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            console.log(data);
            setCoursedata(data)
            //alert(data.message)

        } catch (err) {
            console.log("195", err);
            if (err.response.status === 404) {
                console.log('Resource could not be found!');
            }

        }
    }



    return (
        <>
            <LinearGradient
                colors={['#2E2B69', 'orange', 'red', '#2A12CC']}
                style={styles.linearGradient}>
                <ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <MaterialCommunityIcons name="arrow-left" onPress={() => navigation.navigate('Dashboard')} size={30} color="white" style={{ marginTop: width * 0.14, marginLeft: 10 }} />
                    </View>


                    <View style={{ backgroundColor: 'blue', width: '90%', alignSelf: 'center', marginTop: 20, borderRadius: 7 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: width * 0.05, marginTop: width * 0.06 }}>{coursedata?.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ color: 'white', marginLeft: width * 0.05, marginTop: width * 0.09, fontWeight: '800' }}>{coursedata?.instructor}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'column', width: width * 0.5 }}>
                                        <Text style={{ color: 'white', marginLeft: width * 0.05, fontWeight: '800' }}>{coursedata?.duration}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', width: width * 0.5 }}>
                                        <Text style={{ color: 'white', marginRight: width * 0.15, fontWeight: '800', textAlign: 'right' }}>{coursedata?.enrollmentStatus}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'column', width: width * 0.5 }}>
                                        <Text style={{
                                            textAlign: 'left',
                                            color: 'white',
                                            fontSize: 12,
                                            left: width * 0.05, marginTop: width * 0.01, marginBottom: 20
                                        }}>{coursedata?.schedule}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', width: width * 0.5 }}>
                                        <Text style={{
                                            textAlign: 'right',
                                            color: 'white',
                                            fontSize: 12,
                                            marginTop: width * 0.01,
                                            marginRight: width * 0.15,
                                            marginBottom: 20
                                        }}>{coursedata?.location}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white', marginBottom: 20 }}>Course Enrollment</Text>

                    <TextInput style={{
                        backgroundColor: '#525252', color: 'white', width: '90%', alignSelf: 'center',
                        padding: 5, borderRadius: 6, height: 40, marginBottom: 30
                    }} placeholder={'Enter your name'} placeholderTextColor="white" />
                    <TextInput style={{
                        backgroundColor: '#525252', color: 'white', width: '90%', alignSelf: 'center',
                        padding: 5, borderRadius: 6, height: 40, marginBottom: 30
                    }} placeholder={'Enter your email'} placeholderTextColor="white" />

                    <TextInput style={{
                        backgroundColor: '#525252', color: 'white', width: '90%', alignSelf: 'center',
                        padding: 5, borderRadius: 6, height: 40, marginBottom: 30
                    }} placeholder={'Enter your phone'} placeholderTextColor="white" />

                    <TouchableOpacity onPress={() => {navigation.navigate('Dashboard'), alert('Congratulations! Successfully Enrolled')}}
                     style={{ backgroundColor: 'orange', marginBottom: 20, width: '90%', height: 30, borderRadius: 6, alignSelf: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', padding: 5 }}>Submit</Text>
                    </TouchableOpacity>



                </ScrollView>
            </LinearGradient >
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearGradient: {
        flex: 1
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "90%",
        backgroundColor: "#F6F6F6",
        height: 50,
        borderRadius: 8,
        marginTop: 25,
        alignSelf: 'center',
        padding: 20,
    },
    inputText: {
        height: 50,
        color: "black",
    },
    title: {
        fontWeight: 'bold',
        fontSize: width * 0.05,
        color: 'violet',
        marginTop: 25,
        textAlign: 'center',
    }

});
