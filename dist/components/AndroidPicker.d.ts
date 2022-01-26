import React from "react";
import { ViewStyle } from "react-native";
import { PickerItem } from "../types";
import { AndroidPickerInstance } from "../types/picker";
export declare type Props = {
    selectedItem: any;
    disabled?: boolean;
    title?: string;
    mode?: "dialog" | "dropdown";
    renderInput: () => JSX.Element;
    renderPickerItems: () => Array<JSX.Element>;
    onItemChange: ((itemValue: PickerItem, itemIndex: number) => void) | undefined;
    containerStyle?: ViewStyle;
    onBlur: () => void;
    onFocus: () => void;
    customProps: {
        [key: string]: any;
    };
};
declare const AndroidPicker: React.ForwardRefExoticComponent<Props & React.RefAttributes<AndroidPickerInstance>>;
export default AndroidPicker;
