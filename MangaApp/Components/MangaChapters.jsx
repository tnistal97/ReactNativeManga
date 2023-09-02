import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import LoadingComponent from './Loading';

import AsyncStorage from '@react-native-async-storage/async-storage';




function MangaChapters({navigation}) {
  const [mangaList, setMangaList] = useState([]);
  const [filteredMangaList, setFilteredMangaList] = useState([]);
  const [filterTitle, setFilterTitle] = useState('');
  
  
  useEffect(() => {
      fetch('http://192.168.1.102:3000/mangas')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setMangaList(data);
        setFilteredMangaList(data);
      })
      .catch((error) => console.error('Error fetching manga:', error));
      
  }, []);

  const handleFilterTitleChange = (text) => {
    setFilterTitle(text);
  };

  useEffect(() => {
    const filteredManga = Array.isArray(mangaList)
      ? mangaList.filter((manga) =>
          manga.title.toLowerCase().includes(filterTitle.toLowerCase())
        )
      : [];
    
    setFilteredMangaList(filteredManga);
  }, [filterTitle, mangaList]);
  

  if (!mangaList) {
    return <LoadingComponent />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Manga List</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Filter by title"
          value={filterTitle}
          onChangeText={handleFilterTitleChange}
        />
      </View>
      <ScrollView contentContainerStyle={styles.mangaGrid}>
        {filteredMangaList.map((manga) => (
          <TouchableOpacity
            style={styles.manga}
            key={manga.manga_id}
            onPress={() => navigation.navigate('Manga',{ mangaId: manga.manga_id })}
          >
            <View style={styles.mangaHeader}>
              <Text style={styles.mangaTitle}>{manga.title}</Text>
            </View>
            <View style={styles.mangaImageContainer}>
              <Image
                source={{ uri: 'https://pack-yak.intomanga.com' + manga.image_url }}
                style={styles.mangaImage}
              />
              <View style={styles.mangaItems}>
                <View style={styles.mangaItem}>
                  <Text style={styles.itemTitle}>Estado</Text>
                  <View style={[styles.itemValue, { backgroundColor: manga.estado !== 'Finalizado' ? '#27C24C' : '#F05050' }]}>
                    <Text style={styles.itemText}>{manga.estado}</Text>
                  </View>
                </View>
                <View style={styles.mangaItem}>
                  <Text style={styles.itemTitle}>Ultima Publicacion</Text>
                  <View style={[styles.itemValue, { backgroundColor: '#5B99E8' }]}>
                    <Text style={styles.itemText}>{manga.ultimapublicacion}</Text>
                  </View>
                </View>
                <View style={styles.mangaItem}>
                  <Text style={styles.itemTitle}>Periodicidad</Text>
                  <View style={[styles.itemValue, { backgroundColor: '#FB8D2A' }]}>
                    <Text style={styles.itemText}>{manga.periodicidad}</Text>
                  </View>
                </View>
                <View style={styles.mangaItem}>
                  <Text style={styles.itemTitle}>Capitulos</Text>
                  <View style={[styles.itemValue, { backgroundColor: '#22b4e1' }]}>
                    <Text style={styles.itemText}>{manga.capitulos}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchContainer: {
    marginBottom: 10,
  },
  searchInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingLeft: 10,
  },
  mangaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  manga: {
    width: '48%',
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
    overflow: 'hidden',
  },
  mangaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ddd',
  },
  icon: {
    marginRight: 10,
  },
  mangaTitle: {
    fontWeight: 'bold',
  },
  mangaImageContainer: {
    position: 'relative',
  },
  mangaImage: {
    width: '100%',
    height: 150,
  },
  mangaItems: {
    padding: 10,
  },
  mangaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemTitle: {
    marginLeft: 5,
    fontWeight: 'bold',
  },
  itemValue: {
    padding: 5,
    borderRadius: 4,
  },
  itemText: {
    color: '#fff',
  },
};

export default MangaChapters;
