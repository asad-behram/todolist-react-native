import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Switch,
} from "react-native";
import React, { useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import axios from "axios";

const TodoScreen = () => {
  const [todolist, setTodolist] = useState([]);
  const [todo, setTodo] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const getAllTodoItems = async () => {
    const res = await fetch(
      "https://91a9-2407-aa80-116-6536-e345-28d4-1f9a-ecfe.ngrok-free.app/api/todo/gets"
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
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      const raw = JSON.stringify([
        {
          "title": todo,
          "isCompleted": isComplete
        }
      ]);
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      
      try {
       fetch("https://91a9-2407-aa80-116-6536-e345-28d4-1f9a-ecfe.ngrok-free.app/api/todo/create", requestOptions)
       getAllTodoItems();
      } catch (error) {
        console.error(error);
      }
    }

    handleDeleteTodo = async (id) => {
      const res = await fetch(`https://91a9-2407-aa80-116-6536-e345-28d4-1f9a-ecfe.ngrok-free.app/api/todo/delete/${id}`,{
        method: 'DELETE'
      })
    } 

    renderTodos = ({ item, index }) => {
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

  const toggleSwitch = () => setIsComplete(previousState => !previousState);

  const refreshList = async () => {
    setRefresh(false)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputField}
        placeholder="Add a title" 
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
      />

      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isComplete ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isComplete}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => handleAddTodo()}>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
          ADD
        </Text>
      </TouchableOpacity>

      <FlatList data={todolist} renderItem={renderTodos} onRefresh={refreshList} refreshing= {refresh} />
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
