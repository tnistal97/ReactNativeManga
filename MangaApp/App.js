import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MangaChapters from './Components/MangaChapters';
import MangasChapters from './Components/MangasChapters';
import ChapterImages from './Components/ChapterImages';


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MangaChapters} />
        <Stack.Screen name="Manga" component={MangasChapters} />       
        <Stack.Screen name="ChapterImages" component={ChapterImages} />
      </Stack.Navigator>
    </NavigationContainer>
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
