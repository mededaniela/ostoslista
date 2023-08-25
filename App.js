import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Text, Button, FlatList } from 'react-native';
import { useState } from 'react';
import { useWindowDimensions } from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");

  const buttonPressedAdd = () => {
    setData([...data, { key: text }]);
    setText("");
  };

  const buttonPressedClear = () => {
    setData([]);
  }

  const { height, width, scale, fontScale } = useWindowDimensions();

  return (
    <View style={wholestyle.container}>
      <View style={styles.container}>
        <TextInput style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => setText(text)} value={text} />
      </View>
      <View style={buttonstyles.container}>
        <Button onPress={() => buttonPressedAdd()} title="Add" />
        <Button onPress={() => buttonPressedClear()} title="Clear" />
      </View>
      <View>
        <Text>Shopping list:</Text>
        <FlatList data={data} renderItem={({ item }) => <Text>{item.key}</Text>}
          keyExtractor={(item, index) => index.toString()} />
      </View>
    </View>
  );
}

const wholestyle = StyleSheet.create({
  container: {
    flex: 1,
    margin: 150,
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const buttonstyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'space-between',
    justifyContent: 'center',
  },
});