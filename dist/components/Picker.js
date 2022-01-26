import React, { useState, useRef, useMemo, useEffect, forwardRef, useImperativeHandle, } from "react";
import { Animated, Platform } from "react-native";
import { Picker as RNPicker } from "@react-native-picker/picker";
import DefaultInputButton from "./InputButton";
import DefaultDoneBar from "./DoneBar";
import IOSPicker from "./IOSPicker";
import AndroidPicker from "./AndroidPicker";
import { DEFAULT_BACKDROP_ANIMATION } from "../constants/animation";
import { getAnimatedProperties } from "../helpers/animation";
import { isIOS } from "../helpers/iphone";
import { EMPTY_ITEM } from "../constants/item";
const Picker = forwardRef(({ item, items, onItemChange, disabled = false, placeholder = "", title = "", mode = "dialog", doneButtonLabel = "", isNullable = false, onOpen = () => null, onClose = () => null, style, containerStyle, textInputStyle, touchableStyle, itemFontFamily, itemColor, InputComponent, DoneBarComponent, backdropAnimation = DEFAULT_BACKDROP_ANIMATION, androidCustomProps, iosCustomProps, }, ref) => {
    const isAndroid = Platform.OS === "android";
    const androidPickerRef = useRef(null);
    const [show, setShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(item
        ? items.find(({ label, value }) => label === item.label && value === item.value) || EMPTY_ITEM
        : isNullable
            ? EMPTY_ITEM
            : items[0]);
    const [initialised, setInitialised] = useState(false);
    const fadeAnimationValue = useRef(new Animated.Value(0)).current;
    const animationProperties = useMemo(() => getAnimatedProperties(backdropAnimation), [backdropAnimation]);
    useImperativeHandle(ref, () => ({
        open: () => {
            var _a;
            setShow(true);
            if (isAndroid) {
                (_a = androidPickerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }
        },
        close: () => {
            var _a;
            setShow(false);
            if (isAndroid) {
                (_a = androidPickerRef.current) === null || _a === void 0 ? void 0 : _a.blur();
            }
        },
    }), []);
    const handleItemChange = (value, index) => {
        const nullableItems = isNullable ? [EMPTY_ITEM, ...items] : items;
        const newSelectedItem = nullableItems.find((currentItem) => value === currentItem.value) ||
            EMPTY_ITEM;
        onItemChange(newSelectedItem, index);
        setSelectedItem(newSelectedItem);
    };
    const handleAndroidPickerBlur = () => {
        setShow(false);
    };
    const handleAndroidPickerFocus = () => {
        setShow(true);
    };
    const toggle = () => {
        setShow((state) => !state);
    };
    const togglePicker = () => {
        if (disabled) {
            return;
        }
        // Handle Android picker input toggle
        if (isAndroid) {
            toggle();
            return;
        }
        // Handle iOS and other picker input toggle
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
    useEffect(() => {
        setInitialised(true);
    }, []);
    useEffect(() => {
        var _a, _b;
        if (show && initialised) {
            onOpen && onOpen();
            if (isAndroid) {
                (_a = androidPickerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }
        }
        if (!show && initialised) {
            onClose && onClose();
            if (isAndroid) {
                (_b = androidPickerRef.current) === null || _b === void 0 ? void 0 : _b.blur();
            }
        }
        // Only execute when show changes
    }, [show]);
    useEffect(() => {
        const nullableItems = isNullable ? [EMPTY_ITEM, ...items] : items;
        const itemIndex = nullableItems.findIndex(({ label }) => label === (item === null || item === void 0 ? void 0 : item.label));
        if (itemIndex !== -1) {
            setSelectedItem(nullableItems[itemIndex]);
        }
    }, [item]);
    const onDonePress = () => {
        togglePicker();
        const itemIndex = (isNullable ? [EMPTY_ITEM, ...items] : items).findIndex(({ value }) => value === selectedItem.value);
        onItemChange(selectedItem, itemIndex);
    };
    const renderPickerItems = () => {
        const tempItems = isNullable ? [EMPTY_ITEM, ...items] : items;
        return tempItems.map((current) => {
            return (React.createElement(RNPicker.Item, { label: current.label, value: current.value, key: current.label, fontFamily: current.fontFamily ? current.fontFamily : itemFontFamily, color: current.color ? current.color : itemColor }));
        });
    };
    const renderPlaceholder = () => {
        if (item && item.label) {
            return item.label;
        }
        if (!isNullable && selectedItem.label) {
            return selectedItem.label;
        }
        return placeholder;
    };
    const renderInputButton = () => {
        const inputProps = {
            togglePicker,
            style,
            text: renderPlaceholder(),
            textInputStyle,
            touchableStyle,
            isNullable: false,
            resetValue: undefined,
            renderHiddenCompactIOSPicker: () => null, //DatePicker only
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
    const pickerProps = {
        selectedItem,
        disabled,
        title,
        renderPickerItems,
        renderInput: renderInputButton,
        onItemChange: handleItemChange,
        togglePicker,
        containerStyle,
    };
    if (isIOS) {
        const iosProps = Object.assign(Object.assign({}, pickerProps), { show, renderDoneBar: renderDoneBarButton, togglePicker,
            containerStyle, animationValue: fadeAnimationValue, customProps: iosCustomProps || {} });
        return React.createElement(IOSPicker, Object.assign({}, iosProps));
    }
    const androidProps = Object.assign(Object.assign({}, pickerProps), { mode, customProps: androidCustomProps || {}, onBlur: handleAndroidPickerBlur, onFocus: handleAndroidPickerFocus });
    return React.createElement(AndroidPicker, Object.assign({ ref: androidPickerRef }, androidProps));
});
export default Picker;
