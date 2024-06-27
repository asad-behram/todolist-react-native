import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { IconButton } from "react-native-paper";

const TodoScreen = () => {
  const [todolist, setTodolist] = useState([]);
  const [todo, setTodo] = useState("");
  const [content, setContent] = useState("");
  const [isCompleted, setComplete] = useState("");

  const getAllTodoItems = async () => {
    const res = await fetch(
      "https://c41c-39-45-0-136.ngrok-free.app/api/todo/gets"
    )
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
      });
    return res;
  };

  useEffect(() => {
    const fetchlist = async () => {
      const data = await getAllTodoItems();
      setTodolist(data);
    };
    fetchlist();
  }, []);

  handleAddTodo = async () => {
    const body = {
      title: todo
    }
    console.log(body)
    const res = await fetch("https://c41c-39-45-0-136.ngrok-free.app/api/todo/create", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
  })

    .then((response) => response.json())
    .then((responseData) => {
        console.log(
            "POST Response",
            "Response Body -> " + JSON.stringify(responseData)
        )
    })
    console.log(res);
  }

  const renderTodos = ({ item, index }) => {
    return (
      <View
        style={styles.list}
      >
        <Text
          style={styles.todoItem}
        >
          {item.title}
        </Text>

        <IconButton
          icon="pencil"
          iconColor="#fff"
          onPress={() => handleEditTodo(item)}
        />
        <IconButton
          icon="trash-can"
          iconColor="#fff"
          onPress={() => handleDeleteTodo(item.id)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputField}
        placeholder="Add a title" 
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Add a content" 
        value={content}
        onChangeText={(userText) => setContent(userText)}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => handleAddTodo()}>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
          ADD
        </Text>
      </TouchableOpacity>

      <FlatList data={todolist} renderItem={renderTodos} />
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: { 
    marginHorizontal: 16, 
    marginTop: 40 
  },
  inputField: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addButton: {
    backgroundColor: "#000",
    borderRadius: 6,
    paddingVertical: 12,
    marginVertical: 34,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  list: {
    backgroundColor: "#1e90ff",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 8,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  todoItem: { 
    color: "#fff", 
    fontSize: 20, 
    fontWeight: "800", 
    flex: 1 
  },
});
