import { useSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { MonoText } from '../components/StyledText';
import {  View } from '../components/Themed';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchOnePost } from '../store/reducers/ActionCreators';
import { SocialIcon } from '@rneui/themed';

export default function Post() {
  const { id } = useSearchParams();
  const dispatch = useAppDispatch();
  const { post, isOnePostLoading } = useAppSelector(state => state.postReducer);
  
  useEffect(() => {
   {id && dispatch(fetchOnePost(Number(id)))};
  }, []);
  
  return (
    <View style={styles.container}>
      {isOnePostLoading ? 
        <SocialIcon type="github-alt" /> 
      : 
        <>
          <MonoText style={styles.title}>{post.title}</MonoText>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <MonoText style={styles.body}>{post.body}</MonoText>
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 15,
  },
  body: {
    fontSize: 20,
    margin: 15,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
