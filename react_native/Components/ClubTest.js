import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Linking } from 'react-native';
import { NavigationEvents } from 'react-navigation';


export default class ClubTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data:[]
    };
    this.getData = this.getData.bind(this);
}

getData() {
  return fetch('http://192.168.0.106:8080/api/clubs')
    .then((response) => response.json())
    .then((responseJson) => {
      // console.log(typeof responseJson);
      this.setState({data : responseJson});
    })
    .catch((error) => {
      console.error(error);
    });
}

  render() {
    return (
      <View style={styles.container}>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text>All Club Data</Text>
        <Text>{this.state.dbResponse}</Text>
        <Button title="Get Data" onPress={this.getData} />
        <FlatList 
        data={this.state.data} 
        keyExtractor={(item,index) => index.toString()}
        renderItem={({item}) => 

          <View style={{backgroundColor: "#e4eef2", margin: 10, padding: 10}}>
            <Text>{item.club_id} {item.club_name} {item.club_location} {item.club_size} {item.club_status}</Text>
            <Text>{item.club_contact}</Text>
            <Text style={{color: 'blue'}} onPress={() => Linking.openURL('http://google.com')}>{item.club_url} </Text>
          </View>
      }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
