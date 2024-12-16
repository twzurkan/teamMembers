import { View, StyleSheet, Text, Pressable } from 'react-native';

import TableView from '@/components/TableView';
import { useEffect, useState } from 'react';
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';

async function loadMembers() {
  const users = await fetch(`http://127.0.0.1:8000/members/`);
  return await users.json();
}

const userData = loadMembers()

const router = useRouter();

const handleNavigation = () => {
  router.push({ pathname: '/modal', params: { isNew: 'true', item: null } });
};

export default function Index() {
  const navigation = useNavigation();
  const [data, setData] = useState()

  useFocusEffect(() => {

    const getData = async () => {
      const data = await loadMembers()
      console.log(data);
      setData(data);
      navigation.setOptions({
        header: () => (
          <View style={{ backgroundColor: 'white', height: 80, padding: 20 }}>
          <Text style={{ color: 'black', fontSize: 20 }}>Team members</Text>
          <Text style={{ color: 'gray', fontSize: 15 }}>You have {data.length} team members</Text>
          <Pressable style={styles.plus} onPress={() => handleNavigation()}>
            <Text style={styles.blue}>+</Text>
          </Pressable>
        </View>
       )
      });
      }

    getData()
  });
  
  return (
    <View style={styles.container}>
      {data ? (
        <TableView members={data}></TableView> 
      ) : (
        <Text>Loading...</Text> 
      )}
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
  plus: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  blue: {
    color: 'blue',
    fontSize: 55,
  },
});