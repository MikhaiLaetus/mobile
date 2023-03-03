
import { useEffect, useState } from 'react';
import { ListRenderItem } from 'react-native';
import { StyleSheet, FlatList } from 'react-native';
import { PostCard } from '../../components/PostCard';
import { SearchBar } from '@rneui/base';
import { View } from '../../components/Themed';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IPost } from '../../models/IPost';
import { fetchPosts } from '../../store/reducers/ActionCreators';
import { SocialIcon } from '@rneui/themed';

export default function TabOneScreen() {
  const dispatch = useAppDispatch();
  const { posts, isPostsLoading } = useAppSelector(state => state.postReducer);
  const [filteredDataSource, setFilteredDataSource] = useState<IPost[]>([]);
  const [search, setSearch] = useState<string>('');

  const renderItem: ListRenderItem<IPost> = ({ item }) => <PostCard data={item} />

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    setFilteredDataSource(posts)
  }, [posts]);

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = posts.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(posts);
      setSearch(text);
    }
  };
  
  return (
    <View style={styles.container}>
      <SearchBar
          containerStyle={{backgroundColor: 'white'}}
          inputContainerStyle={{backgroundColor: 'white', minWidth: 400}}
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          placeholder="Type Here..."
          value={search}
        />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {isPostsLoading ? 
        <SocialIcon type="github-alt" /> 
      : 
        <FlatList 
          data={filteredDataSource} 
          renderItem={renderItem}
        />
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
