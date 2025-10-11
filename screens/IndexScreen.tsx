import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase.config';

const IndexScreen = () => {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    // Auth state listener
    const authSubscriber = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    // Firestore snapshot listener
    const firestoreSubscriber = onSnapshot(collection(db, 'posts'), (querySnapshot) => {
      const postsArray = querySnapshot.docs.map((documentSnapshot) => ({
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
      }));
      setPosts(postsArray);
    });

    return () => {
      authSubscriber();
      firestoreSubscriber();
    };
  }, []);

  const handleAnonymousSignIn = async () => {
    try {
      await signInAnonymously(auth);
      console.log('Signed in anonymously');
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPost = async () => {
    if (user) {
      const newPostRef = doc(collection(db, 'posts'));
      await setDoc(newPostRef, {
        title: `New Post by ${user.uid} at ${new Date().toISOString()}`,
      });
    }
  };

  const handleDeletePost = async (id: string) => {
    await deleteDoc(doc(db, 'posts', id));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>{user ? `Signed in: ${user.uid}` : 'Not signed in'}</Text>
      <Button title="Sign In Anonymously" onPress={handleAnonymousSignIn} />
      <Button title="Add Post" onPress={handleAddPost} />
      {posts.map((post) => (
        <View key={post.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <Text>{post.title}</Text>
          <Button title="Delete" onPress={() => handleDeletePost(post.id)} />
        </View>
      ))}
    </View>
  );
};

export default IndexScreen;