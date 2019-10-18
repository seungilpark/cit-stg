import CardFlip from "react-native-card-flip";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";

const TEST_DATA = {
  clubs: [
    { id: 1, club_name: "tiger", city: "Vancouver", desc: "looking for MF" },
    { id: 2, club_name: "eagle", city: "Vancouver", desc: "looking for GK" },
    { id: 3, club_name: "lion", city: "Vancouver", desc: "looking for DF" },
    { id: 4, club_name: "dragon", city: "Vancouver", desc: "looking for FW" },
    { id: 5, club_name: "giant", city: "Vancouver", desc: "looking for AB" }
  ]
};

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs: [],
      isLoading:true
    };
  }

  componentDidMount() {
    this.setState({
        isLoading:false,
      clubs: TEST_DATA.clubs
    });
  }

  render() {
       
    return this.state.isLoading ? (<View><Text>Loading...</Text></View>):
    (
        <View style={styles.container}>
            <CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >
                <TouchableOpacity style={styles.card} onPress={() => this.card.tip({ direction: 'right', duration: 150 })} ><Text>AB</Text></TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} ><Text>CD</Text></TouchableOpacity>
            </CardFlip>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "white",
    flex: 1,
    margin: 5
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  cardFront: {
    flex: 1,
    padding: 20,
    width: "90%",
    height: "70%",
    padding: 20,
    backgroundColor: "blue",
    margin: 10
  },
  cardBack: {
    flex: 1,
    padding: 20,
    height: "70%",
    width: "90%",
    height: 60,
    backgroundColor: "red",
    margin: 10
  }
});
