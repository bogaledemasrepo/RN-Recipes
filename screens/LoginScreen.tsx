import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { useAuth } from '../context/AuthContext'; // Import the custom hook
import { FirebaseError } from 'firebase/app';
import CustomButton from '../components/CustomButton';
import { TouchableWithoutFeedback } from 'react-native';
import { LoginScreenProbs } from '../AppNavigator';
import { z } from 'zod'; // Import Zod

// --------------------------------------------------------------------------
// ZOD VALIDATION SCHEMA
// --------------------------------------------------------------------------

// 1. Define the base schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

// 2. Refine the schema to check that 'password' and 'cPassword' match
type LoginForm = z.infer<typeof loginSchema>; // Type inference for form state



const LoginScreen: React.FC<LoginScreenProbs> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

   const [errors, setErrors] = useState<z.ZodIssue[]>([]);
  const handleLogin = async () => {
    setErrors([]); // Clear previous errors
    
    const formData = {  email, password };

    // 1. Validate form data using Zod
    const validationResult = loginSchema.safeParse(formData);

    if (!validationResult.success) {
      // 2. If validation fails, set the errors and stop
      setErrors(validationResult.error.issues);
      return;
    }

    setLoading(true);
    try {
     const response = await login(email, password);
      console.log(response,'User logged in successfully!');
    } catch (error) {
      console.log(error)
      // Handle Firebase-specific errors
      if (error instanceof FirebaseError) {
        let errorMessage = 'An unexpected login error occurred.';
        // Map common Firebase Auth error codes to user-friendly messages
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'Invalid email format.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'This user account has been disabled.';
            break;
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            errorMessage = 'Invalid email or password.';
            break;
          default:
            errorMessage = error.message; // Use default error message if not explicitly handled
        }
        Alert.alert('Login Failed', errorMessage);
      } else {
        // Handle unexpected JavaScript errors
        Alert.alert('Login Failed', 'An unknown error occurred.');
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

    // Helper function to get the error message for a specific field
  const getError = (path: keyof LoginForm) => {
    return errors.find(err => err.path[0] === path)?.message;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onFocus={()=>setErrors(prev=>prev.length>0?[]:prev)}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {getError('email') && <Text style={styles.errorText}>{getError('email')}</Text>}
      
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onFocus={()=>setErrors(prev=>prev.length>0?[]:prev)}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            {getError('password') && <Text style={styles.errorText}>{getError('password')}</Text>}
      <CustomButton label={loading ? "Logging In..." : "Log In"} disabled={loading} onPress={handleLogin}/>
      {/* Optional: Add a link/button to the sign-up screen */}
      <TouchableWithoutFeedback onPress={()=>navigation.navigate("Register")}>
        <Text style={styles.link}>
          Don't have an account? Sign Up
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: 'blue',
  },
    errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 12,
  },
});

export default LoginScreen;