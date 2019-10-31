import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, ScrollView } from 'react-native';
import { NavigationEvents } from 'react-navigation';


export default class AthlClubList extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
              data:[]
          };
          this.getList = this.getList.bind(this);
      }

    getList(){
        fetch('http://ec2-18-236-121-4.us-west-2.compute.amazonaws.com:8080/api/athletes/likes/1')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
        // console.log(typeof responseJson);
            this.setState({data : responseJson});
        })
        .catch((error) => {
            console.error(error);
        });
        
        fetch('http://ec2-18-236-121-4.us-west-2.compute.amazonaws.com:8080/api/clubs')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({clubData : responseJson})
        })
        .catch((error) => {
            console.error(error);
        })
        
    }

    static navigationOptions = ({ navigation  }) => {
        let title = "Liked Clubs";
        let headerTitleStyle = { color: "black", justifyContent: "center", flex: 1};
        return { title, headerTitleStyle }
    };
      render() {
          return(
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.button}>
                        <Button color='#ff5c5c'
                        title = 'Athlete data'
                        onPress={() => {
                        this.getList();
                    }}/>
                    </View>
                    <FlatList 
                        data={this.state.data} 
                        keyExtractor={(item,index) => index.toString()}
                        renderItem={({item}) => 

                        <View style={{backgroundColor: "#e4eef2", margin: 10, padding: 10}}>
                            <Text>{item.fk} {item.club_name} {item.club_location} {item.club_size} {item.club_status}</Text>
                            <Text>{item.club_contact}</Text>
                            <Text style={{color: 'blue'}} onPress={() => Linking.openURL('http://google.com')}>{item.club_url} </Text>
                        </View>
                    }
        />
                    {/* <View style={styles.header}>
                        <View style={{backgroundColor: "#fff", width:350, marginTop:5, marginBottom:5, borderBottomWidth:2, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View style = {{width: 50, height: 50, margin:5, borderBottomWidth:2, borderTopWidth:2, borderLeftWidth:2, borderRightWidth:2, borderColor:"#90ee90", borderRadius:15}}>
                                <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/manu.jpg')}/></View>
                            </View>
                                <Text style={{fontSize:25, fontWeight:"bold"}}>Manchester United</Text>

                        </View>
                        <View style={{backgroundColor: "#fff", width:350, borderBottomWidth:2, marginBottom:5, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/liverpool.jpg')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Liverpool</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, borderBottomWidth:2, marginBottom:5, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/whitecaps.jpg')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Vancouver Whitecaps</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, borderBottomWidth:2, marginBottom:5, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/toronto.png')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Toronto FC</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, borderBottomWidth:2, marginBottom:5, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/realmadrid.png')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Real Madrid</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, borderBottomWidth:2, marginBottom:5, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/montreal.jpg')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Montreal Impact</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, borderBottomWidth:2, marginBottom:5, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/barcelona.png')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Barcelona</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, marginTop:2, marginBottom:5, borderBottomWidth:2, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/manu.jpg')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Manchester United</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, borderBottomWidth:2, marginBottom:5, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/liverpool.jpg')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Liverpool</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, borderBottomWidth:2, marginBottom:5, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/whitecaps.jpg')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Vancouver Whitecaps</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, borderBottomWidth:2, marginBottom:5, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/toronto.png')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Toronto FC</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, borderBottomWidth:2, marginBottom:5, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/realmadrid.png')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Real Madrid</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, borderBottomWidth:2, marginBottom:5, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/montreal.jpg')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Montreal Impact</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, borderBottomWidth:2, marginBottom:5, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/barcelona.png')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Barcelona</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, borderBottomWidth:2, marginBottom:5, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/realmadrid.png')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Real Madrid</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, borderBottomWidth:2, marginBottom:5, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/montreal.jpg')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Montreal Impact</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, borderBottomWidth:2, marginBottom:5, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/barcelona.png')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Barcelona</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, marginTop:5, marginBottom:5, borderBottomWidth:2, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/manu.jpg')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Manchester United</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, borderBottomWidth:2, marginBottom:5, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/liverpool.jpg')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Liverpool</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, borderBottomWidth:2, marginBottom:5, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/whitecaps.jpg')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Vancouver Whitecaps</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, borderBottomWidth:2, marginBottom:5, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/toronto.png')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Toronto FC</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, borderBottomWidth:2, marginBottom:5, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/realmadrid.png')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Real Madrid</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, borderBottomWidth:2, marginBottom:5, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/montreal.jpg')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Montreal Impact</Text>
                        </View>
                        <View style={{backgroundColor: "#fff", width:350, borderBottomWidth:2, marginBottom:5, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
                            <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}} source={require('../assets/barcelona.png')}/></View>
                            <Text style={{fontSize:25, fontWeight:"bold"}}>Barcelona</Text>
                        </View>
                    </View> */}
                </ScrollView>
            </View>
          )
      }


}




// function generateFields() {
//     var index = 0;
//     var length = 25;
//      return (
//          <View>
//              <View>
//              <View style={{backgroundColor: "#fff", width:350, marginTop:5, marginBottom:5, borderBottomWidth:2, borderTopWidth:2, borderLeftWidth:2, flexDirection:"row", borderRightWidth:2 ,borderColor:"#90ee90", overflow:"hidden", borderRadius:15, alignItems:'center'}}>
//                             <View style = {{width: 50, height: 50, margin:5, borderBottomWidth:2, borderTopWidth:2, borderLeftWidth:2, borderRightWidth:2, borderColor:"#90ee90", borderRadius:15}}>
//                                 <View><Image style={{width:50, height:50, borderRadius:15, marginRight:5}}/></View>
//                             </View>
//                             <Text style={{fontSize:25, fontWeight:"bold"}}>Manchester United</Text>
//             </View>
//              </View>
//          </View>
//      );

// }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
  });