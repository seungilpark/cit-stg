import React from 'react';
import { StyleSheet, Alert, TouchableOpacity, Text, View, Button, ScrollView, SafeAreaView, Image } from 'react-native';
import { NavigationEvents, StackNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { Icon } from 'react-native-vector-icons/FontAwesome'
import { getCurrentFrame } from 'expo/build/AR';
import SignIn from './ProfilePageTest';

const ProfileStackScreen = createStackNavigator ({
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            title:'Profile', 
        },
    },
});

export default ProfileStackScreen;