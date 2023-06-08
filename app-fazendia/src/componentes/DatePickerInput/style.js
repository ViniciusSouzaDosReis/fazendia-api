import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    gap: 8
  },
  twoInputs:{
    flex: 1,
    maxWidth: '50%'
  },
  label: {
    color: '#282A2B',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  input: {
    justifyContent: 'center',
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
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  error:{
    borderColor:'red'
  }
});

export default styles