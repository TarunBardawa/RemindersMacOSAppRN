import React, {useCallback, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Image } from 'react-native-macos';

type Reminder = {
  title: string;
  completed: boolean;
};

const initialReminders: Reminder[] = [
  {
    title: 'React Native',
    completed: false,
  },
  {
    title: 'Mac OS',
    completed: false,
  },
  {
    title: 'iOS',
    completed: false,
  },
];

function App(): JSX.Element {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [newReminder, setNewReminder] = useState<string>('');

  const sortedReminders = [...reminders];
  sortedReminders.sort((a, b) => (a.completed && !b.completed) ? 1 : -1);

  const toggleCompleted = useCallback((item: Reminder) => {
    const index = reminders.findIndex(itm => itm.title === item.title);
    const newReminders = [...reminders];
    newReminders[index].completed = !newReminders[index].completed;
    setReminders(newReminders);
  }, [reminders]);

  const addNewReminder = useCallback(() => {
    if (!newReminder.trim()) {
      return;
    }
    const newReminders = [...reminders, {title: newReminder.trim(), completed: false}];
    setReminders(newReminders);
    setNewReminder('');
  }, [newReminder, reminders]);

  const renderItem: ListRenderItem<Reminder> = ({item, index}) => {
    return (
      <Pressable style={styles.item} onPress={() => toggleCompleted(item)}>
        <Image
          source={item.completed ? require('./assets/checked.png') : require('./assets/unchecked.png')}
          style={styles.itemCheckbox} />
        <Text style={styles.itemTitle}>{item.title}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{'My Reminders'}</Text>
        <Text style={styles.headerTitle}>{reminders.length}</Text>
      </View>
      <FlatList
        data={sortedReminders}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
      <TextInput
        placeholder="Add New Reminder"
        placeholderTextColor="gray"
        onChangeText={setNewReminder}
        value={newReminder}
        onSubmitEditing={addNewReminder}
        style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: '#3B82F7',
    fontSize: 28,
    fontWeight: 'bold',
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#4a4a4a',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  itemTitle: {
    color: 'lightgray',
    fontSize: 16,
  },
  input: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 20,
    textAlignVertical: 'center',
    padding: 8,
    marginHorizontal: 20,
  },
  itemCheckbox: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  }
});

export default App;
