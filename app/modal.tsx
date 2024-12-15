import { useLocalSearchParams } from 'expo-router';
import { Text, View, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native"
import { useForm, Controller } from "react-hook-form"
import React, { useEffect, useState } from 'react';
import {Picker} from '@react-native-picker/picker';


export default function Modal() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState("");
  const [obj, setObj] = useState({id:0,first:"",last:"",email:"",phone:"", role: "Regular"})
  const { isNew, item} = useLocalSearchParams();
  let value = "";
  let title = "Add"
  let tagLine = "Set email, location, and role."
  if (isNew == 'false' && item != null) {
    if (obj.id == 0) {
      value = item as string
      setObj(JSON.parse(value))
    }
    title = "Save"
    tagLine = "Edit contact info, location and role."
  }

  useEffect(() => {
    if (obj.first) {
      setValue('first', obj.first);
    }
    if (obj.last) {
      setValue('last', obj.last);
    }
    if (obj.email) {
      setValue('email', obj.email);
    }
    if (obj.phone) {
      setValue('phone', obj.phone);
    }
    if (obj.role) {
      setValue('role', obj.role);
    }
  }, [obj]);
  
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first: "",
      last: "",
      email: "",
      phone: "",
      role: "Regular",
    },
  })
 
  const onSubmit = async (data:any) => {
    try {
      let id = 0
      let m = 'POST'
      if (isNew == 'false') {
        m = 'PUT'
        id = obj.id
      }
      let url = 'http://127.0.0.1:8000/members/'
      if (id != 0) {
        url = url + id + '/'
      }

      const response = await fetch(url, {
        method: m,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      // Handle successful response
      setShowSuccess(true);
      setShowFailure("");

    } catch (error) {
      // Handle error
      setShowSuccess(false);
      setShowFailure("" + error);
    }
  };

  const onDelete = async (data:any) => {
    try {
      let id = 0
      let m = 'POST'
      if (isNew == 'false') {
        m = 'DELETE'
        id = obj.id
      }
      let url = 'http://127.0.0.1:8000/members/'
      if (id != 0) {
        url = url + id + '/'
      }

      const response = await fetch(url, {
        method: m,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle successful response
      setShowSuccess(true);
      setShowFailure("");
      

    } catch (error) {
      // Handle error
      setShowSuccess(false);
      setShowFailure("" + error);
    }
  };


  return (
    <View>
      <View>
        <Text style={{fontSize:20}}>{title} a team member</Text>
        <Text style={{fontSize:10, color:'gray'}}>{tagLine}</Text>
      </View>
      <View style={{ height: 15 }} />
      <View>
      <Text style={{fontSize:15}}>Info</Text>
      </View>
      <View style={{ height: 15 }} />
      <View style={styles.container}>
        <Controller
            control={control}
            rules={{
                required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={{width: '80%', height: 40, borderColor: 'gray', borderWidth: 1}}
                placeholder="First name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                />
            )}
            name="first"
        />
        {errors.first && <Text style={styles.errorText}>This is required.</Text>}
        
        <View style={{ height: 15 }} />
        
        <Controller
        control={control}
        rules={{
            maxLength: 100,
            required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
            <TextInput style={{width: '80%', height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder="Last name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            />
        )}
        name="last"
        />
        {errors.last && <Text style={styles.errorText}>This is required.</Text>}

        <View style={{ height: 15 }} />

        <Controller
            control={control}
            rules={{
                maxLength: 100,
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={{width: '80%', height: 40, borderColor: 'gray', borderWidth: 1}}
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                />
            )}
            name="email"
        />
        {errors.email && <Text style={styles.errorText}>Invalid email.</Text>}

        <View style={{ height: 15 }} />
        <Controller
            control={control}
            rules={{
                maxLength: 25,
                required: true,
                pattern: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/i, 
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput style={{width: '80%',height: 40, borderColor: 'gray', borderWidth: 1}}
                placeholder="Enter phone number without dashes"
                value={value}
                onChange={onChange}
              />
            )}
            name="phone"
        />
        {errors.phone && <Text style={styles.errorText}>Invalid phone number.</Text>}
        
        <View style={{ height: 15 }} />
        </View>
      <View>
      <Text style={{fontSize:15}}>Role</Text>
      </View>
      <View style={{ height: 15 }} />

        <Controller
            control={control}
            rules={{
                maxLength: 12,
                required: true, 
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Picker
              selectedValue={value}
              onValueChange={onChange}>
              <Picker.Item label="Regular - can't delete members" value="Regular" />
              <Picker.Item label="Admin - can delete members" value="Admin" />
            </Picker>           
            )}
            name="role"
        />

      <View style={{ height: 15 }} />
        
      <View style={styles.buttons}>
        { isNew == 'false' && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleSubmit(onDelete)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>    
      )}
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.saveButtonText}>{title}</Text>
        </TouchableOpacity>    
      </View>
        {showSuccess && (
        <Text>Submitted successfully!</Text>
      )}
        {showFailure != "" && (
        <Text style={styles.errorText}>{showFailure}</Text>
      )}
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
//    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
  },
  deleteButtonText: {
    color: 'red',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  saveButtonText: {
        color: 'white',
        fontSize: 16,
  },
});
