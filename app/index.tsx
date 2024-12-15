import { View, StyleSheet } from 'react-native';

import TableView from '@/components/TableView';

export default function Index() {
  return (
    <View style={styles.container}>
      <TableView></TableView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
});