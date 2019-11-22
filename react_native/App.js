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
import ClubMatches from "./Components/ClubMatches"
import ClubMgrPersonalDetails from "./Components/ClubMgrPersonalDetails";
import ClubMgrContactDetails from "./Components/ClubMgrContactDetails";
import AthletePersonalInfoEdit from "./Components/AthletePersonalInfoEdit";
import AthleteContactDetails from "./Components/AthleteContactDetails";

import ClubsCards from "./Components/ClubsCards";

import AccountType from "./Components/AccountType";
import PersonalInfo from "./Components/PersonalInfo";
import LocationInfo from "./Components/LocationInfo";
import AccountInfo from "./Components/AccountInfo";
import MainApp from "./Components/main_app";
import MgrInfo from "./Components/MgrInfo";
import ClubInfo from "./Components/ClubInfo";
import MgrAccountInfo from "./Components/MgrAccountInfo";
import CardForMgr from "./Components/CardForMgr";

// import ClubsCards from "./Components/ClubsCards"
import Card from "./Components/Card";
import AthleteProfile from "./Components/AthleteProfile";

const RootStack = createStackNavigator(
    {
        FirstPage: {
            screen: FirstPage,
            navigationOptions: {
                header: null
            }
        },
        SignIn: {
            screen: SignIn,
            navigationOptions: {
                header: null
            }
        },
        AccountType: {
            screen: AccountType,
            navigationOptions: {
                header: null
            }
        },
        PersonalInfo: {
            screen: PersonalInfo,
            navigationOptions: {
                header: null
            }
        },
        MgrInfo: {
            screen: MgrInfo,
            navigationOptions: {
                header: null
            }
        },
        LocationInfo: {
            screen: LocationInfo,
            navigationOptions: {
                header: null
            }
        },
        ClubInfo: {
            screen: ClubInfo,
            navigationOptions: {
                header: null
            }
        },
        AccountInfo: {
            screen: AccountInfo,
            navigationOptions: {
                header: null
            }
        },
        MgrAccountInfo: {
            screen: MgrAccountInfo,
            navigationOptions: {
                header: null
            }
        },
        AthTest: {
            screen: AthTest
        },
        ClubTest: {
            screen: ClubTest
        },
        MainApp: {
            screen: MainApp,
            navigationOptions: {
                header: null
            }
        },
        ClubMatches: {
            screen: ClubMatches
        },
        CardForMgr: {
            screen: CardForMgr
        },

        AthleteProfile: {
            screen: AthleteProfile,
        },
        
        AthletePersonalInfoEdit: {
            screen: AthletePersonalInfoEdit
        },
        AthleteContactDetails: {
            screen: AthleteContactDetails
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
        },
        ClubMgrContactDetails: {
            screen: ClubMgrContactDetails
        },
        ClubMgrPersonalDetails: {
          screen: ClubMgrPersonalDetails
        },
        AthlClubList: {
            screen: AthlClubList,
        },
        Profile: {
            screen: Profile
        },
        Card: { 
            screen: Card,
        },
    },

    {
        initialRouteName: "FirstPage",
        headermode: "none",
        transitionConfig: () => ({
            transitionSpec: {
                duration: 0 // Set the animation duration time as 0 !!
            }
        })
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
