import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

export default function App() {
  const [schermata, setSchermata] = useState('home');

  if (schermata === 'home') {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Text>Gioco della Sfortuna</Text>

        <TouchableOpacity onPress={() => setSchermata('gioco')}>
          <Text>Inizia</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Text>Gioco</Text>
    </SafeAreaView>
  );
}
