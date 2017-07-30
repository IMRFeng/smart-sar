import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import DoubleClick from 'react-native-double-click';
import { Container, Content, Header, Left, Right, Body, Title } from 'native-base';
import { Router, Scene } from 'react-native-router-flux';
import AppContainer from './AppContainer';

class ok extends Component {
  constructor(props){
    super(props);
    this.state = { 
      selectedTab:'alert',
      titleName: 'HOME'
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }

  updateTitle(titleValue) {
    this.setState({
      titleName: titleValue
    })
  }

  handleClick() {
      Alert.alert('SOS sent. Calm down and keep safe!');
  }

  render() {
    var self = this;
    return (
      <Container>
        <DoubleClick onClick={this.handleClick}>
          <Header>
            <Left />
            <Body>
              <Title style={styles.title}>{this.state.titleName}</Title>
            </Body>
            <Right />
          </Header>
        </DoubleClick>
        <AppContainer { ... this.state } updateTitle={this.updateTitle}/>

      </Container>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    width: 300
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ok', () => ok);