import { View, TextInput, Text } from "react-native"

import styles from './styles'

function Input({ label, placeholder, value, onChangeText, secureTextEntry = false, twoInputs = false, isError = false }) {
  let stylesInputContainer = [styles.container]
  let stylesInput = [styles.input]
  if(twoInputs) stylesInputContainer.push(styles.twoInputs)
  if(isError) stylesInput.push(styles.error)


  return (
    <View style={stylesInputContainer}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={stylesInput}
        placeholderTextColor={'rgba(0, 0, 0, 0.1)'}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

export { Input }