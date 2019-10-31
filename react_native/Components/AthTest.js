import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { NavigationEvents } from 'react-navigation';


export default class AthTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        };
        this.getData = this.getData.bind(this);
    }

    // convert(arr){
    //   var result = {};
    //   for (var i = 0; i < arr.length; i++) {
    //     result[arr[i].key] = arr[i].value;
    //   }
    //   return result;
    // }

    getData() {

    return fetch('http://ec2-18-236-121-4.us-west-2.compute.amazonaws.com:8080/api/athletes')
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
        <Text>All Athletes Data</Text>
        <Text>{this.state.dbResponse}</Text>
        <Button title="Get Data" onPress={this.getData} />
        <FlatList 
        data={this.state.data} 
        keyExtractor={(item,index) => index.toString()}
        renderItem={({item}) => 

          <View style={{backgroundColor: "#e4eef2", margin: 10, padding: 10}}>
            <Text>{item.athl_id} {item.athl_fname} {item.athl_lname} {item.athl_gender} {item.athl_dob}</Text>
            <Text>{item.athl_addr} {item.athl_height} {item.athl_weight} {item.athl_email} {item.athl_phone}</Text>
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
