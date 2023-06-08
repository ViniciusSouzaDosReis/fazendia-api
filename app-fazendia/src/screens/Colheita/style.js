import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mainColheita:{
    gap: 40
  },
  textContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateText:{
    fontSize: 16,
    fontWeight: 700
  },
  infoContainer:{
    width: '100%',
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingRight: 32
  },
  infoTextContainer:{
    flexDirection: 'column',
    width: 140
  },
  infoIconAndText:{
    flexDirection: 'row',
    gap: 16
  },
  infoTitle:{
    fontSize: 16,
    fontWeight: 700
  },
  infoQuantidade:{
    fontSize: 47,
    fontWeight: 800,
    alignSelf: 'flex-end',
  },
  sectionChange:{
    marginBottom: 60
  }
});

export default styles