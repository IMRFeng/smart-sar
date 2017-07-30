import React, { Component } from 'react';
import { StyleSheet, TabBarIOS, Dimensions, Alert, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import {
    Container, Header, Content, List, ListItem, Label, Left, Body,
    Card, CardItem, Right, Thumbnail, Item, Input, Switch, Icon as NbIcon,
    Button, Segment, Text, Tab, Tabs, Grid, Form, Center
} from 'native-base';


import ListAllNotifications from './listAllNotifications';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -36.844177;
const LONGITUDE = 174.767017;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            setAccount: false,
            setAbout: false,
            notificationTab: false,
            searched: false,
            img: '',
            searchValue: '',
            state: false,
            activeTab: 'all',
            selectedTab: props.selectedTab,
            markers: [{
                title: 'Help',
                description: 'Please help me',
                coordinates: {
                    latitude: -36.843275,
                    longitude: 174.765290
                },
            },
            {
                title: 'Help',
                description: 'Please help me',
                coordinates: {
                    latitude: -36.843284,
                    longitude: 174.765419
                },
            },
            {
                title: 'Help',
                description: 'Please help me',
                coordinates: {
                    latitude: -36.861858,
                    longitude: 174.726282
                }
            },
            {
                title: 'Help',
                description: 'Please help me',
                coordinates: {
                    latitude: -36.855981,
                    longitude: 174.747767
                }
            }, {
                title: 'Help',
                description: 'Please help me',
                coordinates: {
                    latitude: -36.851207,
                    longitude: 174.763235
                }
            }, {
                title: 'Help',
                description: 'Please help me',
                coordinates: {
                    latitude: -36.830821,
                    longitude: 174.745402
                }
            }],
            markerso: [{
                title: 'John',
                coordinates: {
                    latitude: -36.851736, 
                    longitude: 174.750194
                },
            },
            {
                title: 'Kevin',
                coordinates: {
                    latitude: -36.850790, 
                    longitude: 174.760674
                },
            },
            {
                title: 'Yohan',
                coordinates: {
                    latitude: -36.841147, 
                    longitude: 174.741633
                }
            },],
            region: {
                latitude: null,
                longitude: null,
                latitudeDelta: null,
                longitudeDelta: null,
            },
        };

        this.handleChange = this.handleChange.bind(this);

    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            this.calcDelta(lat, lon, accuracy);
        }, (error) => {
            alert(JSON.stringify(error))
        }, {
                timeout: 20000,
                maximumAge: 1000
            });
    }

    calcDelta(lat, lon, accuracy) {

        const latDelta = accuracy * (1 / (Math.cos(lat) * 111.32));
        const lonDelta = accuracy / 111.32;

        this.setState({
            region: {
                latitude: lat,
                longitude: lon,
                latitudeDelta: latDelta,
                longitudeDelta: lonDelta
            }
        })
    }

    marker() {
        return {
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude
        }
    }

    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            // Create the object to update this.state.mapRegion through the onRegionChange function
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
            const accuracy = position.coords.accuracy;
            const latDelta = accuracy * (1 / (Math.cos(region.latitude) * (40075 / 36)));
            this.onRegionChange(region);
        }, (error) => {
            alert(JSON.stringify(error))
        }, {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            });
    }

    onRegionChange(region) {
        this.setState({
            region: region
        });
    }
    handleChange(e) {
        this.setState({
            searchValue: e.target.value
        })
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    onTabPress(tab) {
        this.setState({ activeTab: tab });
    }

    onMapPress(e) {
        console.log(e.nativeEvent.coordinate.longitude);
        let region = {
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }
        this.onRegionChange(region);
    }

    render() {
        const goToView2 = (guest) => {
            // NavigationActions.view2(guest);
            console.log('Navigation router run...');
        };

        return (
            <TabBarIOS style={styles.container}>
                <Icon.TabBarItemIOS
                    iconName="ios-warning-outline"
                    selectedIconName="ios-warning"
                    selected={this.state.selectedTab == 'alert'}
                    onPress={() => {
                        this.setState({ selectedTab: 'alert' })
                        this.props.updateTitle('HOME')
                    }}
                >
                    {this.state.region.latitude ? <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        showsUserLocation={true}
                        initialRegion={this.state.region}
                    >
                        {this.state.markers.map(marker => (
                            <MapView.Marker
                                key={marker.coordinates.latitude}
                                coordinate={marker.coordinates}
                                title={marker.title}
                                description={marker.description}
                            />
                        ))}

                        {this.state.markerso.map(marker => (
                            <MapView.Marker
                                key={marker.coordinates.latitude}
                                coordinate={marker.coordinates}
                                title={marker.title}
                                pinColor="green"
                            />
                        ))}
                    </MapView> : null}
                </Icon.TabBarItemIOS>

                <Icon.TabBarItemIOS
                    iconName="ios-search-outline"
                    selectedIconName="ios-search"
                    selected={this.state.selectedTab == 'search'}
                    onPress={() => {
                        this.setState({ selectedTab: 'search' });
                        this.props.updateTitle('MATTERS')
                    }}
                >
                    <Content>
                        <Header searchBar rounded>
                            <Item>
                                <NbIcon name="ios-search" />
                                <Input placeholder="Search" value={this.state.searchValue} onChange={this.handleChange} />
                                <NbIcon name="logo-rss" />
                            </Item>
                            {
                                (!this.state.searched) ? <Button transparent>
                                    <Text>Search</Text>
                                </Button> : <Button transparent onPress={() => Alert.alert('to be adding content to this channel')}>
                                        <NbIcon name="ios-add-circle" />
                                    </Button>
                            }

                        </Header>
                        {this.state.state ?
                            (this.state.searchValue == '#Whanganui Earthquake' ?

                                <List>
                                    <ListItem>
                                        <Thumbnail square size={80} source={{ uri: 'https://cdn3.iconfinder.com/data/icons/earthquake/500/earthquake_16-512.png' }} />
                                        <Body>
                                            <Text>Light earthquake</Text>
                                            <Text note>25 km north-east of Whanganui</Text>
                                        </Body>
                                        <Right>
                                            <Text>View</Text>
                                        </Right>
                                    </ListItem>
                                </List>
                                : <List>
                                    <ListItem>
                                        <Thumbnail square size={80} source={{ uri: 'https://image.freepik.com/free-icon/weather-flood_318-34097.jpg' }} />
                                        <Body>
                                            <Text>Flooding</Text>
                                            <Text note>
                                                Desperate to catch a flight, Kristy Rutherford and her family drove through a severely flooded rural Canterbury road with water at times lapping at the car windows...
                                            </Text>
                                        </Body>
                                        <Right>
                                            <Text>View</Text>
                                        </Right>
                                    </ListItem>
                                </List>) : <List>
                                <ListItem itemDivider>
                                    <Text>Trending Now</Text>
                                </ListItem>
                                <ListItem button onPress={() => {
                                    this.setState({ state: true, searched:true, searchValue: '#Whanganui Earthquake' })
                                }}>
                                    <Text>#Whanganui Earthquake</Text>
                                </ListItem>
                                <ListItem button onPress={() => {
                                    this.setState({ state: true, searched:true, searchValue: '#Canterbury flooding' })
                                }}>
                                    <Text>#Canterbury flooding</Text>
                                </ListItem>
                            </List>}

                    </Content>
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    iconName="ios-notifications-outline"
                    selectedIconName="ios-notifications"
                    selected={this.state.selectedTab == 'notification'}
                    onPress={() => {
                        this.setState({ selectedTab: 'notification' })
                        this.props.updateTitle('NOTIFICATIONS')
                    }}
                >
                    {
                        this.state.notificationTab ?
                            <Content padder>

                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Text>
                                                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
                                                </Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Button transparent textStyle={{ color: '#87838B', marginBottom: '0' }}>
                                                <NbIcon name="ios-contact" />
                                                <Text>&nbsp;John</Text>
                                            </Button>
                                        </Left>
                                    </CardItem>
                                </Card>

                                <Card>
                                    <CardItem >
                                        <Body>
                                            <Image source={{ uri: 'https://images.scribblelive.com/2017/3/11/bd27ff20-3961-4795-93f6-c97ca165144e.png' }} style={{ height: 100, width: 200, flex: 1 }} />
                                            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nunc, quod agimus; Hic ambiguo ludimur.</Text>
                                        </Body>
                                    </CardItem>
                                    <CardItem>
                                        <Right>
                                            <Button transparent textStyle={{ color: '#87838B' }}>
                                                <NbIcon name="ios-contact" />
                                                <Text>&nbsp;Me</Text>
                                            </Button>
                                        </Right>
                                    </CardItem>
                                </Card>

                                <Item floatingLabel style={{ marginTop: 5 }}>
                                    <Label>Enter something</Label>
                                    <Input />
                                </Item>
                                <Button transparent>
                                    <NbIcon name="ios-images" />
                                </Button>
                            </Content>
                            :
                            <Tabs initialPage={0}>
                                <Tab heading="All">
                                    <List>
                                        <ListItem avatar button onPress={() => {
                                            this.setState({ notificationTab: true })
                                        }}>
                                            <Left>
                                                <Thumbnail source={{ uri: 'https://cdn.evbuc.com/images/1508747/59435028125/1/logo.png' }} />
                                            </Left>
                                            <Body>
                                                <Text>As it happened: More than 300 homes flooded, power restored</Text>
                                                <Text note>The flurry of crashes, flooding of properties and power outages that have plagued Auckland during the third batch of stormy weather this week should be behind the region as sun shine is just around the corner.</Text>
                                            </Body>
                                            <Right>
                                                <Text note>2:15 am</Text>
                                            </Right>
                                        </ListItem>

                                        <ListItem avatar>
                                            <Left>
                                                <Thumbnail source={{ uri: 'https://cdn.evbuc.com/images/1508747/59435028125/1/logo.png' }} />
                                            </Left>
                                            <Body>
                                                <Text>Mathew Adkins</Text>
                                                <Text note>Doing what you like will always keep you happy . .</Text>
                                            </Body>
                                            <Right>
                                                <Text note>12:43 pm</Text>
                                            </Right>
                                        </ListItem>

                                        <ListItem avatar>
                                            <Left>
                                                <Thumbnail source={{ uri: 'https://cdn.evbuc.com/images/1508747/59435028125/1/logo.png' }} />
                                            </Left>
                                            <Body>
                                                <Text>Lillian Griffith</Text>
                                                <Text note>Doing what you like will always keep you happy . .</Text>
                                            </Body>
                                            <Right>
                                                <Text note>12:14 pm</Text>
                                            </Right>
                                        </ListItem>

                                        <ListItem avatar>
                                            <Left>
                                                <Thumbnail source={{ uri: 'https://cdn.evbuc.com/images/1508747/59435028125/1/logo.png' }} />
                                            </Left>
                                            <Body>
                                                <Text>Gladys Norman</Text>
                                                <Text note>Doing what you like will always keep you happy . .</Text>
                                            </Body>
                                            <Right>
                                                <Text note>12:13 pm</Text>
                                            </Right>
                                        </ListItem>

                                        <ListItem avatar>
                                            <Left>
                                                <Thumbnail source={{ uri: 'https://cdn.evbuc.com/images/1508747/59435028125/1/logo.png' }} />
                                            </Left>
                                            <Body>
                                                <Text>Roberta Walton</Text>
                                                <Text note>Doing what you like will always keep you happy . .</Text>
                                            </Body>
                                            <Right>
                                                <Text note>12:03 pm</Text>
                                            </Right>
                                        </ListItem>
                                    </List>
                                </Tab>
                                <Tab heading="Government">
                                    <List>
                                        <ListItem avatar button onPress={() => {
                                            this.setState({ notificationTab: true })
                                        }}>
                                            <Left>
                                                <Thumbnail source={{ uri: 'https://cdn.evbuc.com/images/1508747/59435028125/1/logo.png' }} />
                                            </Left>
                                            <Body>
                                                <Text>As it happened: More than 300 homes flooded, power restored</Text>
                                                <Text note>The flurry of crashes, flooding of properties and power outages that have plagued Auckland during the third batch of stormy weather this week should be behind the region as sun shine is just around the corner.</Text>
                                            </Body>
                                            <Right>
                                                <Text note>3:43 pm</Text>
                                            </Right>
                                        </ListItem>
                                    </List>
                                </Tab>
                                <Tab heading="Mentions">
                                    <List>
                                        <ListItem avatar>
                                            <Left>
                                                <Thumbnail source={{ uri: 'https://cdn.evbuc.com/images/1508747/59435028125/1/logo.png' }} />
                                            </Left>
                                            <Body>
                                                <Text>Kumar Pratik</Text>
                                                <Text note>Doing what you like will always keep you happy . .</Text>
                                            </Body>
                                            <Right>
                                                <Text note>3:43 pm</Text>
                                            </Right>
                                        </ListItem>

                                        <ListItem avatar>
                                            <Left>
                                                <Thumbnail source={{ uri: 'https://cdn.evbuc.com/images/1508747/59435028125/1/logo.png' }} />
                                            </Left>
                                            <Body>
                                                <Text>Kumar Pratik</Text>
                                                <Text note>Doing what you like will always keep you happy . .</Text>
                                            </Body>
                                            <Right>
                                                <Text note>3:43 pm</Text>
                                            </Right>
                                        </ListItem>
                                    </List>
                                </Tab>
                            </Tabs>
                    }
                    {/* <Container>
                        <Segment>
                            <Button first active={this.state.activeTab === 'all'} onPress={() => this.onTabPress('all')}>
                                <Text active={this.state.activeTab === 'all'}>All</Text>
                            </Button>
                            <Button active={this.state.activeTab === 'government'} onPress={() => this.onTabPress('government')}>
                                <Text active={this.state.activeTab === 'government'}>Government</Text>
                            </Button>
                            <Button last active={this.state.activeTab === 'mentions'} onPress={() => this.onTabPress('mentions')}>
                                <Text active={this.state.activeTab === 'mentions'}>Mentions</Text>
                            </Button>
                        </Segment>
                        <Content padder active={this.state.activeTab === 'government'}>
                            <Text>Awesome segment</Text>
                        </Content>
                    </Container> */}
                </Icon.TabBarItemIOS>
                <Icon.TabBarItemIOS
                    iconName="ios-person-outline"
                    selectedIconName="ios-person"
                    selected={this.state.selectedTab == 'me'}
                    onPress={() => {
                        this.setState({ selectedTab: 'me' })
                        this.props.updateTitle('SETTINGS')
                    }}
                >
                {
                    (this.state.setAccount || this.state.setAbout) ? (
                        this.state.setAccount ? 
                        <Content>
                            <Form>
                                <Item floatingLabel>
                                <Label>Username</Label>
                                <Input value='Victor Feng' disabled/>
                                </Item>
                                <Item floatingLabel>
                                <Label>Email</Label>
                                <Input value='nzvictor.feng@gmail.com'/>
                                </Item>
                                <Item floatingLabel>
                                <Label>Emergency contact</Label>
                                <Input/>
                                </Item>
                                <Button full style={{marginTop: 10}}>
                                    <Text>Save</Text>
                                </Button>
                            </Form>
                        </Content>
                        :
                        <Content>
                        <Card>
                            <CardItem header>
                                <Body>
                                <Text>GovHack - DuckBros Team</Text>
                                
                                <Text>
                                    David Li, Dong Liang, Shirley Dai, Simon Liang, Leo Chen, Victor Feng
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem>
                            <Body>
                                <Text>
                                    How can we better assist our SAR teams during a civil emergency? Surely, this APP can!
                                </Text>
                            </Body>
                            </CardItem>
                            <CardItem footer>
                                <Body>
                                <Text>
                                    Author of this App: 
                                </Text>
                                <Text>
                                    Victor Feng (nzvictor.feng@gmail.com)
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        </Content>
                    )
                :
                    <Content>
                        <List>
                            <ListItem icon button onPress={()=> {
                                this.setState({
                                    setAccount: true
                                })}}
                            >
                                <Left>
                                    <NbIcon name="ios-person" />
                                </Left>
                                <Body>
                                    <Text>Account Security</Text>
                                </Body>
                                <Right>
                                    <NbIcon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem itemDivider>
                                <Text></Text>
                            </ListItem>  
                            <ListItem icon button onPress={()=>console.log('')}>
                                <Left>
                                    <NbIcon name="logo-instagram" />
                                </Left>
                                <Body>
                                    <Text>Message Notifications</Text>
                                </Body>
                                <Right>
                                    <NbIcon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem icon button onPress={()=>console.log('')}>
                                <Left>
                                    <NbIcon name="ios-lock" />
                                </Left>
                                <Body>
                                    <Text>Privacy and safety</Text>
                                </Body>
                                <Right>
                                    <NbIcon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem itemDivider>
                                <Text></Text>
                            </ListItem>  
                            <ListItem icon button onPress={()=>console.log('')}>
                                <Left>
                                    <NbIcon name="ios-cog" />
                                </Left>
                                <Body>
                                    <Text>General</Text>
                                </Body>
                                <Right>
                                    <NbIcon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem itemDivider>
                                <Text></Text>
                            </ListItem>  
                            <ListItem icon button onPress={()=>
                                this.setState({
                                    setAbout: true
                                })}    
                            >
                                <Left>
                                    <NbIcon name="ios-information-circle" />
                                </Left>
                                <Body>
                                    <Text>About SmartSAR</Text>
                                </Body>
                                <Right>
                                    <NbIcon name="arrow-forward" />
                                </Right>
                            </ListItem>
                        </List>
                    </Content>
                }
                </Icon.TabBarItemIOS>
            </TabBarIOS>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

module.exports = AppContainer;