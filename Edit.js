import React, { useState, useEffect } from 'react';
import { TextInput, View, Text, Button, StyleSheet, Alert } from "react-native";
import { datasource } from "./Data";

const Edit = ({ navigation, route }) => {
    const [Name, setName] = useState('');
    const [Value, setValue] = useState('');

    // When the screen loads, set the input values from the data
    useEffect(() => {
        let indexnum = route.params.type === "Income" ? 0 : 1; // Decide the data category
        const item = datasource[indexnum].data[route.params.index]; // Get the item to edit
        setName(item.Name); // Set the current name
        setValue(item.Value.toString()); // Set the current value
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
                value={Name} // Show the current Name value
                style={styles.input}
                onChangeText={(text) => setName(text)} // Update Name when typing
            />
            <Text style={styles.label}>Value:</Text>
            <TextInput
                value={Value} // Show the current Value
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(text) => setValue(text)} // Update Value when typing
            />
            <View style={styles.buttonRow}>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Save"
                        onPress={() => {
                            let indexnum = route.params.type === "Income" ? 0 : 1; // Decide the data category
                            // Save the updated values back to datasource
                            datasource[indexnum].data[route.params.index].Name = Name;
                            datasource[indexnum].data[route.params.index].Value = parseFloat(Value); // Convert Value back to a number
                            navigation.navigate('Home'); // Go back to the Home screen
                        }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Delete"
                        onPress={() => {
                            let indexnum = route.params.type === "Income" ? 0 : 1; // Decide the data category
                            Alert.alert("Are you sure?", '', [
                                {
                                    text: 'Yes',
                                    onPress: () => {
                                        // Remove the item from the list
                                        datasource[indexnum].data.splice(route.params.index, 1);
                                        navigation.navigate('Home'); // Go back to the Home screen
                                    },
                                },
                                { text: 'No' },
                            ]);
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        marginBottom: 15,
        padding: 5,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
});

export default Edit;
