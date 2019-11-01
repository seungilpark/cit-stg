/* Profile Component */
import React from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity
} from "react-native";

const TEST_DATA = {
  athl_id: 1,
  account: "admin",
  password: "P@ssw0rd",
  athl_dob: "1988-08-08",
  athl_email: "admin@stg.com",
  athl_phone: "123-1234-1234",
  athl_height: "210",
  athl_weight: "180",
  athl_gender: "M",
  athl_fname: "admin",
  athl_lname: "admin",
  athl_addr: "testAddr",
  city: "Vancouver",
  country: "Canadas"
};

/*
 * Render forms to create athletes Profile and post it to the server
 */
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      athl: {
        athl_id: -9999,
        account: "",
        password: "",
        athl_dob: -9999,
        athl_email: "",
        athl_phone: "",
        athl_height: "",
        athl_weight: "",
        athl_gender: "",
        athl_fname: "",
        athl_lname: "",
        athl_addr: "",
        city: "",
        country: ""
      },
      profile: {},
      validationError: false
    };
  }

  componentDidMount() {
    this.setState({
      athl: TEST_DATA
    });
  }

  onSubmitHandler = () => {
    return new Promise((resolve, reject) => {
        fetch()
    })
  }

  static navigationOptions = ({ navigation  }) => {
    let title = "Create Profile";
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

  onPressEvent(){
    Alert.alert(
      'Cancel ',
      'Are you sure you want to cancel?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.props.navigation.navigate('FirstPage')},
      ],
      {cancelable: false},
    );
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        {/* <Text style={styles.header}>Create Profile</Text> */}
        <View style={styles.athlContainer}>
          <View style={styles.labelAndValue}>
            <Text style={{ width: "15%" }}>Name: </Text>
            <Text style={{ width: "30%" }}>
              {`${this.state.athl.athl_fname}  ${this.state.athl.athl_lname}`}
            </Text>
            <Text style={{ marginLeft: 20, width: "15%" }}>Age: </Text>
            <Text>
              {Math.abs(
                new Date(
                  new Date() - new Date(this.state.athl.athl_dob).getTime()
                ).getUTCFullYear() - 1970
              )}
            </Text>
          </View>

          <View style={styles.labelAndValue}>
            <Text style={{ width: "15%" }}>Email: </Text>
            <Text style={{ width: "30%" }}>{`${
              this.state.athl.athl_email
            }`}</Text>
            <Text style={{ marginLeft: 20, width: "15%" }}>Gender: </Text>
            <Text>{`${this.state.athl.athl_gender}`}</Text>
          </View>
          <View style={styles.labelAndValue}>
            <Text style={{ width: "15%" }}>Height: </Text>
            <Text style={{ width: "30%" }}>{`${
              this.state.athl.athl_height
            }`}</Text>
            <Text style={{ marginLeft: 20, width: "15%" }}>Weight: </Text>
            <Text>{`${this.state.athl.athl_weight}`}</Text>
          </View>
          <View style={styles.labelAndValue}>
            <Text style={{ width: "30%" }}>Address: </Text>
            <Text>{`${this.state.athl.city}, ${this.state.athl.country}`}</Text>
          </View>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.labelAndValue}>
            <Text style={{ width: "30%" }}>Sports: </Text>
            <TextInput
              style={{
                borderColor: "black",
                borderWidth: 1,
                height: 20,
                width: "60%"
              }}
              placeholder="Soccer"
            />
          </View>
          <View style={styles.labelAndValue}>
            <Text style={{ width: "30%" }}>Position: </Text>
            <TextInput style={styles.InputBox} placeholder="MF" />
          </View>
          <View style={styles.labelAndValue}>
            <Text style={{ width: "30%" }}>Coaches: </Text>
            <TextInput style={styles.InputBox} placeholder="Coachess" />
          </View>
          <View style={styles.labelAndValue}>
            <Text style={{ width: "30%" }}>Video Url: </Text>
            <TextInput style={styles.InputBox} placeholder="Video URL" />
          </View>
          <View style={styles.labelAndValue}>
            <Text style={{ width: "30%" }}>Photo Url: </Text>
            <TextInput style={styles.InputBox} placeholder="Picture URL" />
          </View>
          <View style={styles.labelAndValue}>
            <Text style={{ width: "30%" }}>Medical Info: </Text>
            <TextInput
              style={styles.InputBox}
              placeholder="Medical Info Placeholder"
            />
          </View>
          <View style={styles.labelAndValue}>
            <Text style={{ width: "30%" }}>Organization: </Text>
            <TextInput style={styles.InputBox} placeholder="Organization" />
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={{ width: "30%" }}>Biography: </Text>
            <TextInput
              style={{
                borderColor: "black",
                borderWidth: 1,
                height: 40,
                width: "60%"
              }}
              placeholder="Biography"
              editable
              multiline
              numberOfLines={4}
              maxLength={600}
            />
          </View>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "30%",
              backgroundColor: "red",
              padding: 10,
              margin: 5,
              borderRadius: 7,
            }} onPress={() => this.onPressEvent()}>
            <Text style={{ color: "white", fontFamily: "sans-serif-thin", fontSize: 15 }}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "30%",
              backgroundColor: "green",
              padding: 10,
              margin: 5,
              borderRadius: 7
            }}
          >
            <Text style={{ color: "white", fontFamily: "sans-serif-thin", fontSize: 15}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  header: {
    fontSize: 20,
    padding: 20
  },
  athlContainer: {
    width: "100%",
    height: "100%",
    flex: 1
  },
  profileContainer: {
    width: "100%",
    height: "100%",
    flex: 1
  },
  labelAndValue: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    height: 20
  },

  InputBox: {
    borderColor: "black",
    borderWidth: 1,
    height: 20,
    width: "60%"
  },
  buttonBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30
  }
});
