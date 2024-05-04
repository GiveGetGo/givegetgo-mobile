import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the types for your navigation stack
type RootStackParamList = {
  ForgotPasswordScreen: undefined;
  CheckEmailScreen: undefined;
  SignUpScreen: undefined;
  ResetCheckEmailScreen: undefined;
};

// Define the type for the navigation prop
type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ForgotPasswordScreen' | 'ResetCheckEmailScreen' | 'SignUpScreen'
>;

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [email, setEmail] = useState<string>('');

  const handleResetPassword = () => {
    navigation.navigate('ResetCheckEmailScreen'); //comment this when using api
    // forgotPassword(email) //uncomment this when using api
    console.log('Reset password for:', email);
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpScreen'); 
  };

  async function forgotPassword(email: string) {
    try {
      const response = await fetch('http://api.givegetgo.xyz/v1/user/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
      });
  
      const json = await response.json(); // Parse the JSON response
      console.log("Forgot password response:", json);
  
      if (response.status === 200) {
        console.log('Forgot password request successful:', json);
        // alert('Password reset instructions have been sent to your email.'); //uncomment this if using api
        // navigation.navigate('ResetCheckEmailScreen'); //uncomment this if using api
      } else if (response.status === 400) {
        console.error('Bad request:', json.msg);
        alert(`Error: ${json.msg}`);
      } else if (response.status === 401) {
        console.error('Unauthorized access:', json.msg);
        alert(`Error: ${json.msg}`);
      } else if (response.status === 429) {
        console.error('Too many requests:', json.msg);
        alert(`Error: ${json.msg}`);
      } else if (response.status === 500) {
        console.error('Internal server error:', json.msg);
        alert(`Error: ${json.msg}`);
      } else {
        console.error('Unexpected error:', json);
        alert(`Error: ${json.msg}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      // alert('Failed to connect to the server. Please try again later.'); //uncomment this if using api
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText1}>Oh, No!</Text>
      <Text style={styles.titleText2}>I Forgot</Text>
      <Text style={styles.subtitleText1}>Enter your email and we'll send you</Text>
      <Text style={styles.subtitleText2}>a link to change a new password</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Forgot Password</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.text}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.linkText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  titleText1: {
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: '10%', // Adjust the margin to align with the text inputs
    marginTop: -80,
  },
  titleText2: {
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: '10%', // Adjust the margin to align with the text inputs
    // marginTop: 20,
  },
  subtitleText1: {
    fontSize: 16,
    color: 'grey', // Use a color that provides enough contrast
    alignSelf: 'flex-start',
    marginLeft: '10%', // Adjust the margin to align with the text inputs
    marginBottom: 5,
    marginTop: 20,
  },
  subtitleText2: {
    fontSize: 16,
    color: 'grey', // Use a color that provides enough contrast
    alignSelf: 'flex-start',
    marginLeft: '10%', // Adjust the margin to align with the text inputs
    marginBottom: 20,
    marginTop: 0,
  },
  input: {
    height: 40,
    width: '80%', // Match the width to your design
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 20,
  },
  button: {
    // backgroundColor: '#d3d3d3', // Use a neutral color for the button
    backgroundColor: 'black',
    width: '75%', // Match the width to your design
    padding: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#FAFAFA",
    fontWeight: '500',
  },
  signUpContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#000',
    marginRight: 5,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;