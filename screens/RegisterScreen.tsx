import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext'; 
import { FirebaseError } from 'firebase/app';
import CustomButton from '../components/CustomButton';
import { TouchableWithoutFeedback } from 'react-native';
import { RegisterScreenProbs } from '../AppNavigator';
import { z } from 'zod'; // Import Zod

// --------------------------------------------------------------------------
// ZOD VALIDATION SCHEMA
// --------------------------------------------------------------------------

// 1. Define the base schema
const registrationSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  cPassword: z.string(), // Confirmation password field
});

// 2. Refine the schema to check that 'password' and 'cPassword' match
type RegistrationForm = z.infer<typeof registrationSchema>; // Type inference for form state

const finalRegistrationSchema = registrationSchema.refine(
  (data) => data.password === data.cPassword,
  {
    message: "Passwords do not match.",
    path: ["cPassword"], // Set the error on the cPassword field
  }
);

// --------------------------------------------------------------------------
// REGISTER SCREEN COMPONENT
// --------------------------------------------------------------------------

const RegisterScreen: React.FC<RegisterScreenProbs> = ({ navigation }) => {
  const { signup:register } = useAuth(); // Assuming you have a 'register' function in your AuthContext
  
  // Form State
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Error State
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);
  
  const handleRegister = async () => {
    setErrors([]); // Clear previous errors
    
    const formData = { username, email, password, cPassword };

    // 1. Validate form data using Zod
    const validationResult = finalRegistrationSchema.safeParse(formData);

    if (!validationResult.success) {
      // 2. If validation fails, set the errors and stop
      setErrors(validationResult.error.issues);
      return;
    }

    setLoading(true);
    try {
      // 3. If validation passes, attempt Firebase registration
      // The function in AuthContext should handle user creation and sign-in
      await register(email, password, username); 
      
      // Success is handled by the useAuth observer, which navigates to RootStackNavigator
      console.log('User registered successfully!');
    } catch (error) {
      console.log(error);
      // 4. Handle Firebase-specific errors
      if (error instanceof FirebaseError) {
        let errorMessage = 'Registration failed.';
        
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'This email is already associated with an account.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'The email address is not valid.';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password is too weak. Please choose a stronger one.';
            break;
          default:
            errorMessage = error.message; 
        }
        Alert.alert('Registration Failed', errorMessage);
      } else {
        Alert.alert('Registration Failed', 'An unknown error occurred.');
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get the error message for a specific field
  const getError = (path: keyof RegistrationForm) => {
    return errors.find(err => err.path[0] === path)?.message;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register For RN-Recipes</Text>
      
      <TextInput
        style={styles.input}
        placeholder="User name"
        value={username}
        onFocus={()=>setErrors(prev=>prev.length>0?[]:prev)}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      {getError('username') && <Text style={styles.errorText}>{getError('username')}</Text>}

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

      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        value={cPassword}
        onFocus={()=>setErrors(prev=>prev.length>0?[]:prev)}
        onChangeText={setCPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      {getError('cPassword') && <Text style={styles.errorText}>{getError('cPassword')}</Text>}

      <CustomButton 
        label={loading ? "Registering..." : "Register"} 
        disabled={loading} 
        onPress={handleRegister}
      />

      <TouchableWithoutFeedback onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>
          Already have an account? Log In
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
    marginBottom: 5, // Reduced margin to make space for error text
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 12,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: 'blue',
  },
});

export default RegisterScreen;