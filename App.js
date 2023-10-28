import {
  KeyboardAvoidingView,
  StyleSheet,
  Text, 
  View,
  TextInput,
  Button,
  FlatList, 
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import GoalItem from './components/GoalItem';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

  // Define the deleteGoalHandler outside of addGoalHandler
  const deleteGoalHandler = (index) => {
    let itemsCopy = [...courseGoals];
    itemsCopy.splice(index, 1);
    setCourseGoals(itemsCopy);
  };

  // Define the addGoalHandler
  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    if (enteredGoalText.trim() === '') {
      return; // Don't add empty goals
    }
    setCourseGoals((currentCourseGoals) => [...currentCourseGoals, enteredGoalText]);
    setEnteredGoalText('');
  }

  return (
    <View style={styles.appContainer}>
      {/* Add the "Goal Log" title */}
      <Text style={styles.title}>🎊 Goal Log 🎊</Text>
      <Text style={styles.subtitle}>Build your Career!</Text>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>List of Goals</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Your Course Goal"
            style={styles.textInput}
            onChangeText={goalInputHandler}
            value={enteredGoalText}
          />
          <Button title="Add Goal" onPress={addGoalHandler} />
        </View>
      </KeyboardAvoidingView>
      <FlatList // Flatlist
        style={styles.goalContainer} 
        data={courseGoals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <GoalItem key={index} text={item} onDelete={() => deleteGoalHandler(index)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#A3CEF1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingTop: 60,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginBottom: 5,
    color: '#274C77',
  },
  subtitle: {
    paddingTop: 5,
    fontSize: 15,
    fontFamily: 'arial',
    color: '#274C77',
  },
  header: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    paddingTop: 50,
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: '#274C77',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 10,
    paddingBottom: 10,
    borderColor: '#8B8C89',
    marginBottom: 20,
    padding: 80,
  },
  textInput: {
    backgroundColor: 'white',
    padding: 10,
    marginRight: 5,
    borderWidth: 1,
    flex: 1,
    borderRadius: 8,
  },
  goalContainer: {
    flex: 6,
    padding: 10,
  },
  writeTaskWrapper: {
    position: 'absolute',
    top: 50,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
