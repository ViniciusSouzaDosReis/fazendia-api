import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  colheitaCardContainer:{
    flexDirection: 'row',
    gap: 16,
    justifyContent:'center',
    width: '100%',
    marginBottom: 16,
  },
  title:{
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 18,
    color: '#282A2B'
  },
  paragraph:{
    color:'#939495',
    fontSize: 16
  },
  textContainer:{
    gap: 8,
    flex: 1
  }
});

export default styles