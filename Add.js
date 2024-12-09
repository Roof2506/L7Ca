import React, { useState } from 'react';
import { datasource } from './Data.js';
import { TextInput, View, Text, Button, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Add = ({ navigation }) => {
    const [Name, setName] = useState('');
    const [Value, setValue] = useState('');
    const [type, setType] = useState('Income');


    const handleValueChange = (text) => {
        const numericValue = text.replace(/[^0-9.]/g, '');

        if ((numericValue.match(/\./g) || []).length > 1) {
            return;
        }

        setValue(numericValue);
    };

    const handleSubmit = () => {
        if (Value === '' || isNaN(Value)) {
            Alert.alert('Invalid Input', 'Please enter a valid numeric value for the amount.');
            return;
        }

        let item = { Name: Name, Value: parseFloat(Value) };
        let indexNum = type === 'Income' ? 0 : 1;
        datasource[indexNum].data.push(item);

        navigation.navigate('Home');
    };

    return (
        <View style={{ padding: 10 }}>
            <Button title='Back' onPress={() => { navigation.navigate('Home'); }} />
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Name:</Text>
                <TextInput
                    style={{ borderWidth: 1 }}
                    onChangeText={(text) => setName(text)}
                />
                <Text style={{ fontWeight: 'bold' }}>Value:</Text>
                <TextInput
                    style={{ borderWidth: 1 }}
                    value={Value}
                    onChangeText={handleValueChange}
                    keyboardType="numeric"
                />
            </View>
            <View style={{ padding: 10 }}>
                <RNPickerSelect
                    value={type}
                    onValueChange={(value) => setType(value)}
                    items={[
                        { label: 'Income', value: 'Income' },
                        { label: 'Expenses', value: 'Expenses' },
                    ]}
                />
            </View>
            <Button title="SUBMIT" onPress={handleSubmit} />
        </View>
    );
};

export default Add;
