var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import { View, Modal, Animated, TouchableOpacity, Platform, } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../helpers/stylesHelper";
const IOSDatePicker = (_a) => {
    var { show, disabled, animationValue, display, renderInput, renderDoneBar, togglePicker, containerStyle, iosCompactHiddenStyle } = _a, pickerProps = __rest(_a, ["show", "disabled", "animationValue", "display", "renderInput", "renderDoneBar", "togglePicker", "containerStyle", "iosCompactHiddenStyle"]);
    if (Number(Platform.Version) >= 14 && display === "compact") {
        return renderInput(() => (React.createElement(DateTimePicker, Object.assign({ display: display, style: [styles.hiddenDateTimePicker, iosCompactHiddenStyle], disabled: disabled }, pickerProps))));
    }
    return (React.createElement(View, { style: containerStyle },
        renderInput(),
        React.createElement(Modal, { visible: show && !disabled, transparent: true, animationType: "slide", supportedOrientations: ["portrait", "landscape"] },
            React.createElement(TouchableOpacity, { style: styles.blurTouchable, onPress: togglePicker },
                React.createElement(Animated.View, { style: [
                        styles.animatedInput,
                        {
                            opacity: animationValue,
                        },
                    ] })),
            renderDoneBar(),
            React.createElement(View, { style: [
                    styles.iosPickerContainerStyle,
                    display === "inline" ? styles.iosPickerContainerInline : null,
                ] },
                React.createElement(DateTimePicker, Object.assign({ disabled: disabled, display: display }, pickerProps))))));
};
export default IOSDatePicker;
