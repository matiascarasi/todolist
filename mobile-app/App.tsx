import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import { RootStackParamList } from './navigation/types';
import EditTask from './screens/EditTask';
import NewTask from './screens/NewTask';
import SortButton from './components/SortButton';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName='Home'>
        <RootStack.Screen
          name="Home"
          component={Home}
          initialParams={{order: "desc"}}
          options={
            ({ route, navigation }) => 
              ({ 
                  title: 'ToDo List', 
                  headerRight: () => <SortButton navigation={navigation} route={route} />
              }) 
          }
        />
        <RootStack.Screen
          name="EditTask"
          component={EditTask}
          options={({ route }) => ({ title: route.params.title }) }
        />
        <RootStack.Screen
          name="NewTask"
          component={NewTask}
          options={{title: 'New Task'}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}