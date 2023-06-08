import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  label: {
    color: '#282A2B',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#AFB8A6',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  container: {
    position: 'relative',
    width: '100%',
    flexDirection: 'column',
    gap: 8
  },
  twoInputs:{
    flex: 1,
    maxWidth: '50%'
  },
  error:{
    borderColor: 'red'
  }
});

export default styles