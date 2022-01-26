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
import React, { useState, useRef, useMemo, useEffect, forwardRef, useImperativeHandle, } from "react";
import { Animated, Platform } from "react-native";
import DefaultInputButton from "./InputButton";
import DefaultDoneBar from "./DoneBar";
import IOSDatePicker from "./IOSDatePicker";
import AndroidDatePicker from "./AndroidDatePicker";
import { isIOS } from "../helpers/iphone";
import { DEFAULT_BACKDROP_ANIMATION } from "../constants/animation";
import { getAnimatedProperties } from "../helpers/animation";
const DatePicker = forwardRef((_a, ref) => {
    var { value, onDateChange, text = "", isNullable = false, title = "", doneButtonLabel = "", onOpen = () => null, onClose = () => null, disabled = false, iosDisplay = "spinner", androidDisplay = "spinner", iosMode = "date", androidMode = "date", InputComponent, DoneBarComponent, backdropAnimation = DEFAULT_BACKDROP_ANIMATION, style, containerStyle, textInputStyle, touchableStyle, iosCompactHiddenStyle, androidCustomProps, iosCustomProps } = _a, pickerProps = __rest(_a, ["value", "onDateChange", "text", "isNullable", "title", "doneButtonLabel", "onOpen", "onClose", "disabled", "iosDisplay", "androidDisplay", "iosMode", "androidMode", "InputComponent", "DoneBarComponent", "backdropAnimation", "style", "containerStyle", "textInputStyle", "touchableStyle", "iosCompactHiddenStyle", "androidCustomProps", "iosCustomProps"]);
    const [pickedDate, setPickedDate] = useState(value || new Date());
    const [show, setShow] = useState(false);
    const fadeAnimationValue = useRef(new Animated.Value(0)).current;
    const animationProperties = useMemo(() => getAnimatedProperties(backdropAnimation), [backdropAnimation]);
    useImperativeHandle(ref, () => ({
        open: () => setShow(true),
        close: () => setShow(false),
    }), []);
    useEffect(() => {
        if (value !== pickedDate) {
            setPickedDate(value || new Date());
        }
    }, [value]);
    const handleiOSDateChange = (_, newDate) => {
        if (!newDate)
            return;
        if (iosDisplay === "compact") {
            onDateChange && onDateChange(newDate);
            return;
        }
        setPickedDate(newDate);
    };
    const handleAndroidDateChange = (_, newDate) => {
        togglePicker();
        if (newDate !== undefined) {
            setPickedDate(newDate);
            onDateChange && onDateChange(newDate);
        }
    };
    const resetValue = () => onDateChange && onDateChange(null);
    const toggle = () => {
        setShow(!show);
        onClose && onClose()
    };
    const togglePicker = () => {
        if (disabled) {
            return;
        }
        // No animation needed for Android
        if (!isIOS) {
            toggle();
            return;
        }
        if (!show) {
            toggle();
        }
        Animated.timing(fadeAnimationValue, {
            toValue: !show ? animationProperties.opacity : 0,
            duration: !show ? animationProperties.duration : 0,
            delay: !show ? animationProperties.delay : 0,
            useNativeDriver: true,
        }).start(show ? toggle : undefined);
    };
    const onDonePress = () => {
        togglePicker();
        onDateChange(pickedDate);
    };
    const renderInputButton = (renderHiddenCompactIOSPicker = () => null) => {
        const inputProps = {
            resetValue,
            togglePicker,
            style,
            text,
            textInputStyle,
            touchableStyle,
            isNullable,
            isCompactHiddenPickerNeeded: isIOS && Number(Platform.Version) >= 14 && iosDisplay === "compact",
            renderHiddenCompactIOSPicker,
        };
        const RenderComponent = InputComponent
            ? InputComponent
            : DefaultInputButton;
        return React.createElement(RenderComponent, Object.assign({}, inputProps));
    };
    const renderDoneBarButton = () => {
        const barProps = {
            title,
            doneButtonLabel,
            onDonePress,
        };
        const RenderComponent = DoneBarComponent
            ? DoneBarComponent
            : DefaultDoneBar;
        return React.createElement(RenderComponent, Object.assign({}, barProps));
    };
    const { locale, timeZoneOffsetInMinutes, textColor, neutralButtonLabel } = pickerProps, commonProps = __rest(pickerProps, ["locale", "timeZoneOffsetInMinutes", "textColor", "neutralButtonLabel"]);
    const datePickerProps = Object.assign({
        show,
        disabled, animationValue: fadeAnimationValue, value: pickedDate, togglePicker, renderInput: renderInputButton, renderDoneBar: renderDoneBarButton, containerStyle: containerStyle
    }, commonProps);
    if (isIOS) {
        return (React.createElement(IOSDatePicker, Object.assign({ display: iosDisplay, mode: iosMode, locale: locale, timeZoneOffsetInMinutes: timeZoneOffsetInMinutes, textColor: textColor, onChange: handleiOSDateChange, iosCompactHiddenStyle: iosCompactHiddenStyle }, datePickerProps, iosCustomProps)));
    }
    return (React.createElement(AndroidDatePicker, Object.assign({ display: androidDisplay, mode: androidMode, neutralButtonLabel: neutralButtonLabel, onChange: handleAndroidDateChange }, datePickerProps, androidCustomProps)));
});
export default DatePicker;
