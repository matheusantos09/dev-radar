import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Main from './pages/Main'
import Profile from './pages/Profile'
import Chat from './pages/Chat'

const Routes = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Main,
      navigationOptions: {
        title: "DevRadar"
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: "Perfil no Github"
      }
    },
    Chat: {
      screen: Chat,
      navigationOptions: {
        title: "Chat"
      }
    },
  },{
    defaultNavigationOptions: {
      headerTintColor: "#FFF",
      headerBackTitleVisible: false,
      headerStyle:{
        backgroundColor: "#7D40E7",
      }
    }
  })
);

export default Routes