import React from 'react';
import { StyleSheet, Text, View, Form, TextInput, ScrollView, Button, FlatList, ListView } from 'react-native';

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: 'email@email.com'
    }
    this.submitOnPress = this.submitOnPress.bind(this)
  }
  submitOnPress (event)  {
    const data = {email: {email: this.state.text}}
    console.log(data, 'data')
    fetch('http://api.povo.io/emails/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(res => {
      this.setState({text: ''})
      this.getEmails()
    }).catch(e => {
      console.log(e.error, 'err')
    })
  }
  componentDidMount() {}
  getEmails () {
    fetch('http://api.povo.io/emails/')
    .then(res => res.json())
    .then(_res => {
      const l = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      this.setState({emails: l.cloneWithRows(_res)})
      console.log(this.state, 'state')
    })
    .catch(e => {
      console.log(e, 'e')
    })
  }
  render() {
    return (
      <ScrollView>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 200}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
          onPress={this.submitOnPress}
          title="Submit email"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        {
          this.state.emails && <ListView
          dataSource={this.state.emails}
          renderRow={(rowData) => <Text>{rowData.email}</Text>}
        />
        }
      </ScrollView>
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
