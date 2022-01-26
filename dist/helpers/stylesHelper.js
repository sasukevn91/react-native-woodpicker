import { StyleSheet } from "react-native";
import { ifIphoneX, isIOS } from "./iphone";
export const styles = StyleSheet.create({
    blurTouchable: {
        flex: 1,
        marginTop: -50,
    },
    input: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
    },
    animatedInput: {
        flex: 1,
        backgroundColor: "#000000",
    },
    placeholderStyle: {
        color: "black",
        fontSize: 16,
    },
    doneBar: {
        height: 44,
        zIndex: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#EFF1F2",
        borderTopWidth: 0.5,
        borderTopColor: "#919498",
    },
    doneButtonLabelStyle: {
        fontSize: 20,
    },
    doneColumnStyle: {
        marginHorizontal: 8,
    },
    iosPickerContainerStyle: {
        height: ifIphoneX(255, 215),
        justifyContent: "flex-start",
        backgroundColor: "white",
    },
    resetButtonStyle: { fontSize: isIOS ? 20 : 18 },
    resetButtonContainerStyle: {
        width: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    placeHolderContainerStyle: {
        position: "relative",
        flexGrow: 9,
        height: "100%",
        justifyContent: "center",
    },
    iosPickerContainer: {
        height: ifIphoneX(255, 215),
        justifyContent: "flex-start",
        backgroundColor: "white",
    },
    androidPickerContainer: {
        opacity: 0,
        position: "absolute",
        top: 0,
        left: 0,
        height: 0,
        width: 0,
    },
    hiddenDateTimePicker: {
        position: "absolute",
        opacity: 0.03,
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
    },
    iosPickerContainerInline: {
        flex: 1,
    },
});
