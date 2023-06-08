import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  WelcomeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    width: screenWidth,
    right: 16,
    paddingHorizontal: 16,
    paddingVertical: 60,
  },
  text: {
    color: 'white'
  },
  wrapperContente: {
    bottom: 30,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    backgroundColor: 'white',
    width: screenWidth,
    right: 16,
    paddingHorizontal: 16,
    paddingVertical: 40,
    gap: 32,
    height: screenHeight
  },
  containerInputs: {
    flexDirection: 'column',
    height: 150,
    gap: 16
  }
});

export default styles