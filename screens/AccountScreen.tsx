import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { auth } from '../firebase'
import { updateProfile } from '@firebase/auth'
import { useAuth } from '../context/AuthContext'


const AccountScreen = () => {
  const {currentUser}=useAuth();

  const handleUpdateProfile=()=>{
    const user = currentUser;

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
    <View style={{flex:1,backgroundColor:"#fff",paddingVertical:16}}>
      <View>
      <View style={{width:"100%",height:140,display:"flex",flexDirection:"column",alignItems:"center",padding:8}}>
          <View style={{width:75,height:75,borderRadius:60,backgroundColor:"#8a8a8a5b"}}></View>
          <Text>{currentUser?.displayName}</Text>
          <Text style={{color:"#3333337a"}}>{currentUser?.email}</Text>
      </View>
      <View style={{flex:1,width:"100%",display:"flex",flexDirection:"column",padding:8}}>
          <Text style={{fontSize:18,paddingVertical:8}}>My Account</Text>
          <View style={{paddingHorizontal:8}}>
            <View style={{display:"flex",flexDirection:"row",padding:8,gap:8}}>
              <MaterialCommunityIcons name='account' color={"#494949ce"} size={20}/>
              <Text>LaPersonal informationnguage</Text>
            </View>
             <View style={{display:"flex",flexDirection:"row",padding:8,gap:8}}>
              <MaterialCommunityIcons name='web' color={"#494949ce"} size={20}/>
              <Text>Language</Text>
            </View>
            <View style={{display:"flex",flexDirection:"row",padding:8,gap:8}}>
              <MaterialCommunityIcons name='security' color={"#494949ce"} size={20}/>
              <Text>Privacy and policy</Text>
            </View>
            
             <View style={{display:"flex",flexDirection:"row",padding:8,gap:8}}>
              <Feather name='settings' color={"#494949ce"} size={20}/>
              <Text>Setting</Text>
            </View>
          </View>
      </View>
      <View style={{width:"100%",display:"flex",flexDirection:"column",padding:8}}>
          <Text style={{fontSize:18,paddingVertical:8}}>More</Text>
          <View style={{paddingHorizontal:8}}>
             <View style={{display:"flex",marginVertical:4,flexDirection:"row",gap:4,alignItems:"center"}}>
              <MaterialCommunityIcons name='information-variant-circle-outline' color={"#333333ce"} size={28}/>
              <Text style={{color:"#525252ce"}}>Help center</Text>
            </View>
             <TouchableOpacity onPress={handleLogout} style={{display:"flex",marginVertical:4,flexDirection:"row",gap:4,alignItems:"center"}}>
              <MaterialCommunityIcons name='logout' color={"#ff2727ce"} size={24}/>
              <Text style={{color:"#ff2727ce",fontWeight:"600"}}>Log Out</Text>
            </TouchableOpacity>
          </View>
      </View>
      </View>
    </View>
  )
}

export default AccountScreen

const styles = StyleSheet.create({})


// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import CustomButton from '../components/CustomButton'
// import { useAuth } from '../context/AuthContext'
// import { updateProfile } from "firebase/auth";
// import { auth } from '../firebase'

// const AccountScreen = () => {

//   const handleUpdateProfile=()=>{
//     const user = auth.currentUser;

//     if (user) {
//       // Get the display name from your form input
//       const userName = "Jane Q. User"; 
//       // Get the photo URL after uploading the image to Firebase Storage
//       const photoUrl = "https://example.com/jane-q-user/profile.jpg"; 

//       updateProfile(user, {
//         displayName: userName,
//         photoURL: photoUrl
//       }).then(() => {
//         // Profile updated successfully!
//         console.log("User profile updated!");
//       }).catch((error) => {
//         // An error occurred
//         console.error("Error updating profile:", error);
//       });
//     }
//   }
//   const {logout}=useAuth();
//   const handleLogout =()=>{
//     logout()
//   }
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//     <View>
//       <Text>AccountScreen</Text>
//       <CustomButton label={"Log Out"} onPress={handleLogout}/>
//        <CustomButton label={"Update Profile"} onPress={handleUpdateProfile}/>
//     </View>
//     </SafeAreaView>
//   )
// }

// export default AccountScreen

// const styles = StyleSheet.create({})