import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStaticNavigation  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './components/Homepage';

import WifiManager from 'react-native-wifi-reborn';



const RootStack = createNativeStackNavigator({
  screens: {
    Home: Homepage,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
