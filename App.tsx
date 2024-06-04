import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

function App(): JSX.Element {
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemTitle}>{'Title'}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{'My Reminders'}</Text>
        <Text style={styles.headerTitle}>{'0'}</Text>
      </View>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#3B82F7',
    fontSize: 28,
    fontWeight: 'bold',
  },
  item: {
    marginVertical: 10,
  },
  itemTitle: {
    color: 'lightgray',
  },
});

export default App;
