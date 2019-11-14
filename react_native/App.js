import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Image
} from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import FirstPage from "./Components/FirstPage";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import AthTest from "./Components/AthTest";
import ClubTest from "./Components/ClubTest";
import ProfilePageTest from "./Components/ProfilePageTest";
import AthlClubList from "./Components/AthlClubList";
import Profile from "./Components/Profile";
import ClubMgrProfile from "./Components/ClubMgrProfile";
// import PersonalDetailsPage from "./Components/PersonalDetailsPage";

import ClubsCards from "./Components/ClubsCards";
import AccountType from "./Components/AccountType";
import PersonalInfo from "./Components/PersonalInfo";
import LocationInfo from "./Components/LocationInfo";
import AccountInfo from "./Components/AccountInfo";
import MainApp from "./Components/main_app";
import ClubForMgr from "./Components/CardForMgr"

// import ClubsCards from "./Components/ClubsCards"
import Card from "./Components/Card";
import AthleteProfile from "./Components/AthleteProfile";

const RootStack = createStackNavigator(
    {
        FirstPage: {
            screen: FirstPage
        },
        SignIn: {
            screen: SignIn
        },
        AccountType: {
            screen: AccountType
        },
        PersonalInfo: {
            screen: PersonalInfo
        },
        LocationInfo: {
            screen: LocationInfo
        },
        AccountInfo: {
            screen: AccountInfo
        },
        AthTest: {
            screen: AthTest
        },
        ClubTest: {
            screen: ClubTest
        },
        MainApp: {
            screen: MainApp
        },
        ClubMgrProfile: {
            screen: ClubMgrProfile
        },
        ClubForMgr: {
            screen: ClubForMgr
        },
        
        AthleteProfile: {
            screen: AthleteProfile,


            navigationOptions: ({ navigation }) => ({
                gesturesEnabled: false,
                headerTitle: (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Card");
                        }}
                    >
                        <View>
                            <Image
                                style={{
                                    justifyContent: "center",
                                    height: 40,
                                    width: 40,
                                    resizeMode: "contain"
                                }}
                                source={require("./Icons/heart_inactive.png")}
                            />
                        </View>
                    </TouchableOpacity>
                ),
                headerRight: (
                    <TouchableOpacity>
                        <View>
                            <Image
                                style={{
                                    justifyContent: "center",
                                    height: 30,
                                    width: 30
                                }}
                                source={require("./Icons/profile_active.png")}
                            />
                        </View>
                    </TouchableOpacity>
                ),
                headerLeft: (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("AthlClubList");
                        }}
                    >
                        <View>
                            <Image
                                style={{
                                    justifyContent: "center",
                                    height: 30,
                                    width: 30
                                }}
                                source={require("./Icons/list_inactive.png")}
                            />
                        </View>
                    </TouchableOpacity>
                )
            })
        },
        ProfilePageTest: {
            screen: ProfilePageTest,
            navigationOptions: ({ navigation }) => ({
                gesturesEnabled: false,
                headerTitle: (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Card");
                        }}
                    >
                        <View>
                            <Image
                                style={{
                                    justifyContent: "center",
                                    height: 40,
                                    width: 40,
                                    resizeMode: "contain"
                                }}
                                source={require("./Icons/heart_inactive.png")}
                            />
                        </View>
                    </TouchableOpacity>
                ),
                headerRight: (
                    <TouchableOpacity>
                        <View>
                            <Image
                                style={{
                                    justifyContent: "center",
                                    height: 30,
                                    width: 30
                                }}
                                source={require("./Icons/profile_active.png")}
                            />
                        </View>
                    </TouchableOpacity>
                ),
                headerLeft: (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("AthlClubList");
                        }}
                    >
                        <View>
                            <Image
                                style={{
                                    justifyContent: "center",
                                    height: 30,
                                    width: 30
                                }}
                                source={require("./Icons/list_inactive.png")}
                            />
                        </View>
                    </TouchableOpacity>
                )
            })
        },
        ClubMgrProfile: {
            screen: ClubMgrProfile,
            navigationOptions: ({ navigation }) => ({
                gesturesEnabled: false,
                headerTitle: (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Card");
                        }}
                    >
                        <View>
                            <Image
                                style={{
                                    justifyContent: "center",
                                    height: 40,
                                    width: 40,
                                    resizeMode: "contain"
                                }}
                                source={require("./Icons/heart_inactive.png")}
                            />
                        </View>
                    </TouchableOpacity>
                ),
                headerRight: (
                    <TouchableOpacity>
                        <View>
                            <Image
                                style={{
                                    justifyContent: "center",
                                    height: 30,
                                    width: 30
                                }}
                                source={require("./Icons/profile_active.png")}
                            />
                        </View>
                    </TouchableOpacity>
                ),
                headerLeft: (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("AthlClubList");
                        }}
                    >
                        <View>
                            <Image
                                style={{
                                    justifyContent: "center",
                                    height: 30,
                                    width: 30
                                }}
                                source={require("./Icons/list_inactive.png")}
                            />
                        </View>
                    </TouchableOpacity>
                )
            })
        },
        // PersonalDetailsPage: {
        //   screen: PersonalDetailsPage
        // },
        AthlClubList: {
            screen: AthlClubList,
            navigationOptions: ({ navigation }) => ({
                gesturesEnabled: false,
                headerTitle: (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Card");
                        }}
                    >
                        <View>
                            <Image
                                style={{
                                    justifyContent: "center",
                                    height: 40,
                                    width: 40,
                                    resizeMode: "contain"
                                }}
                                source={require("./Icons/heart_inactive.png")}
                            />
                        </View>
                    </TouchableOpacity>
                ),
                headerRight: (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("ProfilePageTest");
                            navigation.navigate("AthleteProfile");
                        }}
                    >
                        <View>
                            <Image
                                style={{
                                    justifyContent: "center",
                                    height: 30,
                                    width: 30
                                }}
                                source={require("./Icons/profile_inactive.png")}
                            />
                        </View>
                    </TouchableOpacity>
                ),
                headerLeft: (
                    <TouchableOpacity>
                        <View>
                            <Image
                                style={{
                                    justifyContent: "center",
                                    height: 30,
                                    width: 30
                                }}
                                source={require("./Icons/list_active.png")}
                            />
                        </View>
                    </TouchableOpacity>
                )
            })
        },
        Profile: {
            screen: Profile
        },
        // ClubMgrProfile: {
        //   screen: ClubMgrProfile,
        // },
        Card: {
            screen: Card,
            navigationOptions: ({ navigation }) => ({
                gesturesEnabled: false,
                headerTitle: (
                    <TouchableOpacity>
                        <View>
                            <Image
                                style={{
                                    justifyContent: "center",
                                    height: 40,
                                    width: 40,
                                    resizeMode: "contain"
                                }}
                                source={require("./Icons/heart_active.png")}
                            />
                        </View>
                    </TouchableOpacity>
                ),
                headerRight: (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("ProfilePageTest");
                            navigation.navigate("AthleteProfile");
                        }}
                    >
                        <View>
                            <Image
                                style={{
                                    justifyContent: "center",
                                    height: 30,
                                    width: 30
                                }}
                                source={require("./Icons/profile_inactive.png")}
                            />
                        </View>
                    </TouchableOpacity>
                ),
                headerLeft: (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("AthlClubList");
                        }}
                    >
                        <View>
                            <Image
                                style={{
                                    justifyContent: "center",
                                    height: 30,
                                    width: 30
                                }}
                                source={require("./Icons/list_inactive.png")}
                            />
                        </View>
                    </TouchableOpacity>
                )
            })
        }
    },
    {
        initialRouteName: "FirstPage",
        headermode: "none"
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});
