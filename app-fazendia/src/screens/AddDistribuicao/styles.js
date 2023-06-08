import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  teste:{
    height: 300
  },
  main: {
    flexDirection: "column",
    gap: 24
  },
  inputsContainer: {
    flexDirection: 'column',
    // gap: 100,
    marginBottom: 80
  },
  sectionForm: {
    height: 300,
  }
});

export default styles