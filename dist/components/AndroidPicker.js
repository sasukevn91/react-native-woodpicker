import React, { forwardRef } from "react";
import { View } from "react-native";
import { Picker as RNPicker } from "@react-native-picker/picker";
import { styles } from "../helpers/stylesHelper";
const AndroidPicker = forwardRef(({ selectedItem, disabled, title, mode, renderInput, renderPickerItems, onItemChange, onBlur, onFocus, containerStyle, customProps, }, ref) => {
    return (React.createElement(View, { style: containerStyle },
        renderInput(),
        React.createElement(RNPicker, Object.assign({ ref: ref, style: styles.androidPickerContainer, prompt: title, 
            // @ts-ignore
            onValueChange: onItemChange, selectedValue: selectedItem.value, mode: mode || "dialog", enabled: !disabled }, customProps, { 
            // @ts-ignore
            onBlur: onBlur, onFocus: onFocus }), renderPickerItems())));
});
export default AndroidPicker;
