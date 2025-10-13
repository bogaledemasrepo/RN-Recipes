import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'
import { useAuth } from '../context/AuthContext'
import { updateProfile } from "firebase/auth";
import { auth } from '../firebase'

const AccountScreen = () => {

  const handleUpdateProfile=()=>{
    const user = auth.currentUser;

    if (user) {
      // Get the display name from your form input
      const userName = "Jane Q. User"; 
      // Get the photo URL after uploading the image to Firebase Storage
      const photoUrl = "https://example.com/jane-q-user/profile.jpg"; 

      updateProfile(user, {
        displayName: userName,
        photoURL: photoUrl
      }).then(() => {
        // Profile updated successfully!
        console.log("User profile updated!");
      }).catch((error) => {
        // An error occurred
        console.error("Error updating profile:", error);
      });
    }
  }
  const {logout}=useAuth();
  const handleLogout =()=>{
    logout()
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View>
      <Text>AccountScreen</Text>
      <CustomButton label={"Log Out"} onPress={handleLogout}/>
       <CustomButton label={"Update Profile"} onPress={handleUpdateProfile}/>
    </View>
    </SafeAreaView>
  )
}

export default AccountScreen

const styles = StyleSheet.create({})