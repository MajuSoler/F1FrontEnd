import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, StyleSheet, TouchableOpacity, Picker } from 'react-native'
import { Text } from 'react-native-paper'
// eslint-disable-next-line import/no-named-as-default
import { signUp } from '../store/user/actions'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { scuderiaValidator } from '../helpers/scuderiaValidator'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [scuderia, setScuderia] = useState({ value: '', error: '' })
  const dispatch = useDispatch()
  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const scuderiaError = scuderiaValidator(scuderia.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setScuderia({ ...scuderia, error: scuderiaError })
      return
    }
    dispatch(signUp(name.value, email.value, password.value, scuderia.value))

    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Picker
        selectedValue={scuderia}
        style={{ height: 50, width: 'auto' }}
        onValueChange={(itemValue) =>
          setScuderia({ value: itemValue, error: '' })
        }
      >
        <Picker.Item label="Choose a Scuderia" value="" />
        <Picker.Item label="Alfa Romeo" value="Alfa Romeo" />
        <Picker.Item label="AlphaTauri" value="AlphaTauri" />
        <Picker.Item label="Aston Martin" value="Aston Martin" />
        <Picker.Item label="Ferrari" value="Ferrari" />
        <Picker.Item label="Haas" value="Haas" />
        <Picker.Item label="McLaren" value="McLaren" />
        <Picker.Item label="Mercedes" value="Mercedes" />
        <Picker.Item label="Red Bull" value="Red Bull" />
        <Picker.Item label="Williams" value="Williams" />
      </Picker>

      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
        color="red"
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
