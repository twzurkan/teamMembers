import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { Image, StyleSheet, FlatList, View, Text } from 'react-native';


export default function TableView({members}: any) {

  return (

    <FlatList
      ItemSeparatorComponent={() => (
        <View style={{ backgroundColor: "gray", height: 2 }} />
      )}

      data={members}

      keyExtractor={(item) => item.id} // Assuming 'id' is unique

      renderItem={({ item }) => (

        <View style={styles.tableRow}>
          <View style={styles.tableRow}>
          <Link href={{ pathname: '/modal', params: { isNew: 'false', item: JSON.stringify(item) }}} style={styles.tableRow}>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 5 }}>
              <Image
                source={require('../assets/images/person.jpg')} // Replace with the path to your image
                style={{ width: 40, height: 40, borderRadius: 50 }}
              />
            </View>
            <div style={{display:'inline-block', marginLeft:50, marginTop:-40}}>
            <div style={{ display: 'flex' }}>
            <Text>{item.first}</Text>
            <View style={styles.spacer} />
            <Text>{item.last}</Text>
            <Text>{item.role == "Admin" ? '(admin)' : ''}</Text>
            </div>
            <div>
            <Text style={styles.grey}>{item.phone}</Text>
            </div>
            <Text style={styles.grey}>{item.email}</Text>
            </div>
            </Link>
            </View>
        </View>

      )}

    />

  );

};

const styles = StyleSheet.create({
    tableRow: {
      width: 320,
      height: 68,
      marginHorizontal: 20,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      padding: 3,
    },
    cell: {
      borderRadius: 10,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },
    buttonLabel: {
      color: '#fff',
      fontSize: 16,
    },
    spacer: {
        width: 10, // Adjust the spacer width as needed
      },
    grey: {
        color: '#808080',
    },
    link: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    plus: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    text: {
      color: 'blue',
      fontSize: 55,
    },
  });
