/* react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src
/main/res/ */

/* react-native bundle --platform android --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --dev false --reset-cache --assets-dest android/app/src/main/res/ */

// https://www.youtube.com/watch?v=Pa2uN2KRbj0
// https://pusher.com/tutorials/instagram-clone-part-1

//https://www.youtube.com/watch?v=Dkwq6fI3DHI

import * as React from 'react';
import {
  ActivityIndicator,
  Button,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';

import { createDrawerNavigator} from "react-navigation-drawer";

import FirstScreen from "./src/screens/FirstScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ForgetScreen from "./src/screens/ForgetScreen";
import GetUserPost from "./src/screens/GetUserPost";
import Test from "./src/screens/Test";

import {HomeNavigator} from "./src/navigators/screen-stack-navigators";
import BottomTabNavigator from "./src/navigators/bottom-tab-navigator";
import { MakeNavigator,DineNavigator,TryNavigator,ProfileNavigator,FriendsNavigator,GetUserPostNavigator,BookmarkNavigator,ShareFriendsNavigator,TestNavigator,AllCommentNavigator,SharePostNavigator} from "./src/navigators/screen-stack-navigators";

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';

class LogoutScreen extends React.Component {
  constructor(props) {
    super(props);
    state = {
      email   : '',
      password: '',
    }
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  
}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const USER_LOGIN = await AsyncStorage.getItem('USER_LOGIN');
    this.props.navigation.navigate(USER_LOGIN ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.regimgcontainer} source={require("./src/assets/images/splc.jpg")}>
        </ImageBackground>       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
   regimgcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

const AppStack = createDrawerNavigator({
    Home: BottomTabNavigator,
    Test: TestNavigator,
    Friends: FriendsNavigator,
    Share: ShareFriendsNavigator,
    GetUserPost: {
      screen: GetUserPostNavigator,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Userprofile: {
      screen: AllCommentNavigator,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    SharePost: {
      screen: SharePostNavigator,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Bookmark: {
      screen: BookmarkNavigator,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Bookmark: {
      screen: BookmarkNavigator,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Make: {
      screen: MakeNavigator,
      navigationOptions: {
        drawerLabel: () => null
      }
    },
    Logout: LogoutScreen
  },
  {
    drawerPosition: "right",
    drawerWidth: 200
  }
);
const AuthStack = createStackNavigator({ 
  First: { 
        screen: FirstScreen,
        navigationOptions: {
            drawerLabel: () => null
        }
  },
  SignIn: LoginScreen,
  Signup: RegisterScreen,
  Forget: ForgetScreen });

export default createAppContainer(createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));