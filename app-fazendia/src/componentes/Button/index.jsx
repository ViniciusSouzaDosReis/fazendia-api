import { Pressable, Text, ActivityIndicator } from "react-native"

import styles from "./styles"

function Button({ onPress, children, isSecond = false, isLoading = false }) {
  return (
    <Pressable style={[isSecond ? styles.buttonSecond : styles.button, isLoading ? styles.loading : '']} onPress={onPress} disabled={isLoading}>
      {
        isLoading 
        ? <ActivityIndicator color='white'/>
        : <Text style={isSecond ? { color: '#8EA550' } : styles.text}>{children}</Text>
      }
    </Pressable>
  )
}

export { Button }