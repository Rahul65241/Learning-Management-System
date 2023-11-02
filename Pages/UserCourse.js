import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, ImageBackground, Dimensions, TextInput, TouchableOpacity, FlatList, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


export default function UserCourse({ navigation, route }) {
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

                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'red' }}>
                        Courses Image
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ImageBackground
                            source={require('../img/12.jpg')}
                            style={{ width: width * 0.9, height: height * 0.6, marginTop: 20, marginBottom: 20 }}
                        >
                        </ImageBackground>

                    </View>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Overview</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Course Name:
                        </Text>
                        <Text style={{ color: 'white', marginTop: 21, }}> {coursedata?.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Instructor's Name:
                        </Text>
                        <Text style={{ color: 'white', marginTop: 21, }}> {coursedata?.instructor}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Description: 
                         </Text>
                        <Text style={{ color: 'white', marginTop: 21, width:'70%', textAlign:'justify' }}>{coursedata?.description}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Enrollment Status:
                        </Text>
                        <Text style={{ color: 'white', marginTop: 21, }}> {coursedata?.enrollmentStatus}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Course Duration:
                        </Text>
                        <Text style={{ color: 'white', marginTop: 21, }}> {coursedata?.duration}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Location:
                        </Text>
                        <Text style={{ color: 'white', marginTop: 21, }}> {coursedata?.location}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Pre-requisites:
                        </Text>
                        <Text style={{ color: 'white', marginTop: 21, width:'60%' }}> {coursedata?.prerequisites}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white', marginBottom:20 }}>Syllabus:
                        </Text>
                        <Text style={{ color: 'white', marginTop: 21, }}> {coursedata?.syllabus[0].topic}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white', marginBottom:20 }}>Due Date:
                        </Text>
                        <Text style={{ color: 'white', marginTop: 21, }}> 1 Dec, 2023</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white', marginBottom:20 }}>Progress:
                        </Text>
                        <Text style={{ color: 'white', marginTop: 21, marginBottom:30 }}> 80%</Text>
                    </View>




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
