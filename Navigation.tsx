import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IndexScreen from './screens/IndexScreen';
import AuthScreen from './screens/AuthScreen';
import CartScreen from './screens/CartScreen';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import AccountScreen from './screens/AccountScreen';

export type RootStackParamList = {
  IndexScreen: undefined;
  auth: undefined;
  Tabs: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  Cart: undefined;
  Orders: undefined;
  Account: undefined;
};

// 2. Create Typed Navigators
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

// 3. Define the Screen Prop Type for IndexScreen
// This type is used to get the navigate function with type safety
export type IndexScreenProps = NativeStackScreenProps<RootStackParamList, 'IndexScreen'>;


// Tabs Component
function Tabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false,tabBarActiveTintColor:"#0a0"}}>
      {/* Tab screens are defined here */}
      <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon:({color,size,focused})=><MaterialCommunityIcons name='home' color={focused?color:"#3333334f"} size={size} />}}/>
      <Tab.Screen name="Cart" component={CartScreen} options={{tabBarIcon:({color,size,focused})=><MaterialCommunityIcons name='cart' color={focused?color:"#3333334f"} size={size} />}}/>
      <Tab.Screen name="Orders" component={OrderScreen} options={{tabBarIcon:({color,size,focused})=><MaterialCommunityIcons name='heart' color={focused?color:"#3333334f"} size={size} />}}/>
      <Tab.Screen name="Account" component={AccountScreen} options={{tabBarIcon:({color,size,focused})=><MaterialCommunityIcons name='account' color={focused?color:"#3333334f"} size={size} />}}/>
    </Tab.Navigator>
  );
}

// Root Navigator
export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='IndexScreen' screenOptions={{headerShown:false}}>
          <Stack.Screen name='IndexScreen' component={IndexScreen} />
          <Stack.Screen name='auth' component={AuthScreen} />
          <Stack.Screen name='Tabs' component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};