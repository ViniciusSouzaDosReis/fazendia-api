import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;


export default StyleSheet.create({
  title: {
    color: '#282A2B',

    fontSize: 40,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  subTitle: {
    color: '#282A2B',

    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },
  paragraph: {
    color: '#282A2B',

    fontSize: 16,
    fontFamily: 'Roboto',

    opacity: 0.5
  },
  mainContainer: {
    paddingHorizontal: 16,
  },
  flexSpaceBetween: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: screenWidth,
    paddingHorizontal: 16,
  },
  section:{
    gap: 16,
    width: "100%",
    marginBottom: 32
  }
})