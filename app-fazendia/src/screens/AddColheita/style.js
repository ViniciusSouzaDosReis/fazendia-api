import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    gap: 24
  },
  twoInputs: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  sectionForm: {
    height: 160,
  }
});

export default styles