import type {PickerItem} from 'react-native-woodpicker';

import React, {useState} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

import {
  DatePicker,
  Picker,
  PickerInstance,
  DatePickerInstance,
} from 'react-native-woodpicker';

const data: Array<PickerItem> = [
  {label: 'DataCat', value: 1},
  {label: 'DataDog', value: 2},
  {label: 'DataSnake', value: 3},
  {label: 'DataPlatypus', value: 4},
  {label: 'DataWhale', value: 5},
];

const App = (): JSX.Element => {
  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const [pickedData, setPickedData] = useState<PickerItem>();

  const pickerRef = React.useRef<PickerInstance | null>(null);
  const datePickerRef = React.useRef<DatePickerInstance | null>(null);
  const handleDateChange = (date: Date | null) => setPickedDate(date);

  const resetDate = () => setPickedDate(new Date());
  const resetPicker = () => setPickedData(data[1]);

  const instructions = Platform.select({
    ios: 'Welcome to the iOS Example App for react-native-woodpicker. Enjoy!',
    android:
      'Welcome to the Android Example App for react-native-woodpicker. Enjoy!',
  });

  const handleText = () => pickedDate?.toDateString?.() ?? 'No value Selected';
  const openPickerWidthRef = () => pickerRef.current?.open();
  const openDatePickerWithRef = () => datePickerRef.current?.open();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native!</Text>
      <Text style={styles.instructions}>To get started, edit App.js</Text>
      <Text style={styles.instructions}>{instructions}</Text>
      <Picker
        ref={pickerRef}
        item={pickedData}
        items={data}
        onItemChange={setPickedData}
        title="Data Picker"
        placeholder="Select Data"
        style={styles.pickerStyle}
        isNullable
        //mode="dropdown"
      />
      <Button title="Set Value" onPress={resetPicker} />
      <Button title="Open Picker (Ref)" onPress={openPickerWidthRef} />
      <DatePicker
        value={pickedDate}
        onDateChange={handleDateChange}
        title="Date Picker"
        text={handleText()}
        isNullable
        iosDisplay="compact"
        style={styles.pickerStyle}
        //backdropAnimation={{ opacity: 0 }}
        //minDate={new Date(Date.now())}
        //maxDate={new Date(Date.now()+2000000000)}
        //iosMode="date"
        //androidMode="spinner"
        //locale="fr"
      />
      <Button title="Set Today" onPress={resetDate} />
      <Button title="Open DatePicker (Ref)" onPress={openDatePickerWithRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  pickerStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginHorizontal: 8,
    marginVertical: 8,
    height: 40,
    width: 200,
  },
});

export default App;
