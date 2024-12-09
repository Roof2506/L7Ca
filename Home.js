import React, { useState } from 'react';
import { StatusBar, TouchableOpacity, SectionList, StyleSheet, Text, View, Alert } from 'react-native';
import { datasource } from './Data.js';

const Home = ({ navigation }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const calculateTotalIncomeAndExpenses = () => {
        let totalIncome = 0;
        let totalExpenses = 0;

        // Iterate over the data and sum up income and expenses
        datasource.forEach(section => {
            section.data.forEach(item => {
                const value = parseFloat(item.Value);

                if (section.title === 'Income') {
                    totalIncome += value;
                } else if (section.title === 'Expenses') {
                    totalExpenses += value;
                }
            });
        });

        const netBalance = totalIncome - totalExpenses;
        const resultMessage = `
    Total Income: $${totalIncome.toFixed(2)}\n
    Total Expenses: $${totalExpenses.toFixed(2)}\n
    ${netBalance >= 0 ? 'You have made a gain of' : 'You are in a deficit of'}: $${Math.abs(netBalance).toFixed(2)}
    `;

        Alert.alert('Income & Expense Summary', resultMessage);
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? '#121212' : '#ffffff',
            padding: 10,
        },
        textStyle: {
            fontSize: 15,
            margin: 10,
            textAlign: 'left',
            color: isDarkMode ? 'white' : 'black',
        },
        opacityStyle: {
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
            backgroundColor: isDarkMode ? '#333333' : '#f0f0f0',
        },
        headerText: {
            fontSize: 20,
            margin: 10,
            textAlign: 'center',
            fontWeight: 'bold',
            color: isDarkMode ? 'white' : 'black',
        },
        buttonContainer: {
            flex: 1,
            marginHorizontal: 5,
        },
        buttonRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            padding: 10,
        },
        sectionHeader: {
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
            padding: 10,
            marginBottom: 5,
            borderRadius: 10,
            backgroundColor: isDarkMode ? '#333333' : '#f0f0f0',
        },
        itemContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
        },
        itemValue: {
            fontSize: 16,
            marginLeft: 10,
        },
        darkModeButton: {
            backgroundColor: isDarkMode ? 'white' : 'black',
            borderRadius: 5,
            padding: 10,
            marginBottom: 20,
            marginTop: 10,
            alignSelf: 'flex-end',
        },
        buttonText: {
            color: isDarkMode ? 'black' : 'white',
            textAlign: 'center',
            fontWeight: 'bold',
        },
        actionButton: {
            backgroundColor: 'blue',
            borderRadius: 5,
            padding: 10,
        },
        actionButtonText: {
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
        },
    });

    const renderItem = ({ item, index, section }) => {
        return (
            <TouchableOpacity
                style={[styles.opacityStyle, { backgroundColor: section.bgcolor }]}
                onPress={() => {
                    navigation.navigate('Edit', { index: index, type: section.title, Name: item.Name });
                }}
            >
                <View style={styles.itemContainer}>
                    <Text style={styles.textStyle}>
                        {section.title === 'Income' ? '↑' : '↓'}
                    </Text>
                    <Text style={[styles.textStyle, styles.itemValue]}>
                        {item.Name} - ${item.Value}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

            <TouchableOpacity
                style={styles.darkModeButton}
                onPress={toggleDarkMode}
            >
                <Text style={styles.buttonText}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Text>
            </TouchableOpacity>

            <SectionList
                sections={datasource}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title, bgcolor } }) => (
                    <Text style={[styles.sectionHeader, { backgroundColor: bgcolor }]}>
                        {title}
                    </Text>
                )}
            />

            <View style={styles.buttonRow}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => { navigation.navigate('Add'); }}
                    >
                        <Text style={styles.actionButtonText}>Add Income/Expenses</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={calculateTotalIncomeAndExpenses}
                    >
                        <Text style={styles.actionButtonText}>Calculate Total</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Home;
