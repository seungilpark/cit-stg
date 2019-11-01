import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import CardFlip from "react-native-card-flip";


export default class AthlClubList extends React.Component {
    //     constructor(props) {
    //       super(props);
    //       this.state = {
    //           data:[]
    //       };
    //       this.getList = this.getList.bind(this);
    //   }

    // getList(input_id){
    //     input_id = 1;
    //     fetch(`http://192.168.1.83:8080/api/athletes/likes/1`)
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         console.log(responseJson);
    //         //console.log(typeof responseJson);
    //         this.setState({data : responseJson});
    //     })  
    //     .catch((error) => {
    //         console.error(error);
    //     });
        
        // fetch('http://142.232.55.120:8080/api/clubs')
        // .then((response) => response.text())
        // .then((responseJson) => {
        //     this.setState({clubData : responseJson})
        // })
        // .catch((error) => {
        //     console.error(error);
        // })
        
    // }

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
      render() {
          return(
              <View style ={styles.container}>
                  <ScrollView>
                    <TouchableOpacity style={styles.card}>
                        <Image style={styles.cardImage} source={require('../assets/manu.jpg')}/>
                        
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Image style={styles.cardImage} source={require('../assets/liverpool.jpg')}/>
                        
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Image style={styles.cardImage} source={require('../assets/whitecaps.jpg')}/>
                        
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card}>
                        <Image style={styles.cardImage} source={require('../assets/montreal.jpg')}/>
                        
                    </TouchableOpacity>
                  </ScrollView>
              </View>
            /* // <View style={styles.container}>
            //     <ScrollView> */
            //         {/* <View style={styles.button}>
            //             <Button color='#ff5c5c'
            //             title = 'Liked Clubs'
            //             onPress={() => {
            //             this.getList();
            //         }}/>
            //         </View>
            //         <View>
            //             <FlatList 
            //             data={this.state.data}
            //             keyExtractor={(item,index) => index.toString()}
            //             renderItem={({item}) => 

            //                 <View style={{backgroundColor: "#e4eef2", margin: 10, padding: 10}}>
            //                     <Text>{item.ath_like_id} {item.fk_athl_id} {item.fk_club_id} {item.isLiked}</Text>
            //                     <Text style={{color: 'blue'}} onPress={() => Linking.openURL('http://google.com')}>{item.club_url} </Text>
            //                 </View>
            //             }
            //             />
            //         </View> */}
          )
      }


}

const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      backgroundColor: '#F5FCFF',
    },
    card: {
        backgroundColor: '#fff',
        marginBottom: 10,
        marginLeft: '2%',
        width: '96%',
        shadowColor: 'black',
        shadowOpacity: 1.0,
        shadowRadius: 1,
        borderRadius: 7,
        elevation: 10,
        shadowOffset:{
            width:3,
            height:3
        }
    },
    cardImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius:7
    },
    cardText: {
        padding: 10,
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
        fontFamily: "sans-serif-thin"

    }
  });