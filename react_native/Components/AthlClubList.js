import React from 'react';
import { ActivityIndicator,Animated, StyleSheet, Text, View, Button, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Card } from 'react-native-elements'

export default class AthlClubList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            athl:{},
            matchedList:[],
            loading: true
        };
        this.flipCard = this.flipCard.bind(this);
    }    

    componentWillMount(){
        this.animatedValue = new Animated.Value(0);
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
        
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        })

        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
      }

      async componentDidMount(){
        try {
            var athl_id = 1;
            const getList = await fetch('http://54.191.100.200:8080/api/matched/athlete/1');

            const clubList = await getList.json()
            console.log(clubList,"Get list 1111111111111111");
            //console.log(clubList.results, "Get List 2")
            this.setState({matchedList : clubList, loading: false});
            // console.log(this.matchedList);
            //console.log(matchedList)  
        } catch(error) {
            console.log("Error fetching data", error);
        };
      }
    
        
        // fetch('http://142.232.55.120:8080/api/clubs')
        // .then((response) => response.text())
        // .then((responseJson) => {
        //     this.setState({clubData : responseJson})
        // })
        // .catch((error) => {
        //     console.error(error);
        // })
        


    static navigationOptions = ({ navigation  }) => {
        let title = "Liked Clubs";
        return { 
            title, 
            headerTitleStyle:{
              color : 'black', 
              display: 'flex',
              flex: 0.8,
              justifyContent: 'center',
              textAlign: 'center',
            } }
    };

    flipCard(item) {
        console.log('FLIP CARD')
        if(this.value >= 90){
            Animated.spring(this.animatedValue, {
                toValue:0,
                friction: 8,
                tension: 10
            }).start();
        }else {
            Animated.spring(this.animatedValue, {
                toValue:180,
                friction: 8,
                tension: 10
            }).start();
        }
        
    }


    render() {
        const frontAnimatedStyle = {
            transform: [
                {rotateY: this.frontInterpolate}
            ]
        }
        
        const backAnimatedStyle = {
            transform: [
                {rotateY: this.backInterpolate}
            ]
        }
            
        const {matchedList, loading} = this.state;
        console.log(matchedList,"2222222222222222222222222222");

        if(!loading) {
            return (
                    <View style = {styles.container}>
                        <FlatList 
                                data={matchedList}
                                
                                
                                renderItem={({item}) =>
                                    
                                    <TouchableOpacity  onPress={(item) => this.flipCard(item)}>
                                        <Card containerStyle={styles.cardStyle}>
                                            <Animated.Image source={require('../assets/manu.jpg')} style={[styles.flipCard, frontAnimatedStyle]}>
                                            </Animated.Image>
                                            <Animated.View  style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
                                            <Text>{this.state.dbResponse}</Text>
                                            
                                                    <Text style = {styles.TextStyle}>Club Name: {item.club_name}</Text>
                                                    <Text style = {styles.TextStyle}>Location: {item.country}</Text>
                                                    <Text style = {styles.TextStyle}>Position: {item.offer_position}</Text>
                                                    <Text style = {styles.TextStyle}>Salary: {item.offer_amount}</Text>
                                                    </Animated.View>
                                        </Card>
                                    </TouchableOpacity>
                                     
                                    }
                                    keyExtractor={(item, index) => index.toString()}
                                    /></View>
                       )
        } else {
            return <ActivityIndicator />
        }

    }
}



const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding:10,
        backgroundColor: "#3AD289"
        
        },

        flipCard: {
        top: 0,
        display: "flex",
        paddingTop: 10,
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:20,
        borderRadius:10,
        width: 350,
        height: 200,
        backgroundColor: "blue",
        backfaceVisibility: "hidden"
        },

        flipCardBack: {
        backgroundColor: "#2D5D51",
        position: "absolute",
        top: 0
        },

        imageViewStyle: {

        width: 240,
        height: 300,
        borderRadius:6,
        backgroundColor: "#3AD289"
        
        },
        
        TextStyle:{
            color:'#fff',
            textAlign:'center',
            padding: 5,
            fontSize: 18
        },

        cardStyle: {
            backgroundColor: "#3AD289",
            shadowColor: "#000000",
            shadowOffset:{  width: 0,  height: 12,  },
            shadowColor: 'black',
            shadowOpacity: 1.0,
            shadowRadius: 11,
            borderRadius: 6
            
        }
});