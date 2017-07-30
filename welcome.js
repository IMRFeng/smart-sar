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


export default class Welcome extends Component {

    render() {
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