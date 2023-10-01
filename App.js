import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Button,
  FlatList,
} from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import * as SQLite from "expo-sqlite";
import { TouchableOpacity } from "react-native";

export default function App() {
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  const db = SQLite.openDatabase("ostoksetdb.db");

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists product (id integer primary key not null, product text, amount text);"
        );
      },
      () => console.error("Error when creating DB"),
      updateList
    );
  }, []);

  const saveProduct = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into product (product, amount) values (?, ?);", [
          product,
          amount,
        ]);
      },
      null,
      updateList
    );
  };

  const updateList = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from product;", [], (_, { rows }) =>
          setShoppingList(rows._array)
        );
      },
      null,
      null
    );
  };
  const deleteProduct = (id) => {
    db.transaction((tx) => {
      tx.executeSql("delete from product where id = ?;", [id]);
      console.log("Error");
      updateList();
    });
  };

  return (
    <View style={wholestyle.container}>
      <View style={styles.container}>
        <TextInput
          placeholder="Product"
          onChangeText={(text) => setProduct(text)}
          value={product}
        />
        <TextInput
          placeholder="Amount"
          onChangeText={(text) => setAmount(text)}
          value={amount}
        />
        <Button onPress={saveProduct} title="Save" />
      </View>
      <View>
        <Text>Shopping list:</Text>
        <FlatList
        data={shoppingList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>
              {item.product}, {item.amount}
            </Text>
            <TouchableOpacity onPress={() => deleteProduct(item.id)}>
              <Text backgroundColor="red">bought</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const buttonstyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "space-between",
    justifyContent: "center",
  },
});
