import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#8EA550',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
  },

  buttonSecond: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    borderColor: '#8EA550',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: 'transparent'
  },
  loading: {
    backgroundColor: '#C6D1A7'
  }
});

export default styles