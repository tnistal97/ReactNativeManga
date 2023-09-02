import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import LoadingComponent from './Loading';

export const MangasChapters = ({ navigation }) => {
  const [manga, setManga] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const route = useRoute();
  const { mangaId } = route.params;
 
 
  useEffect(() => {
    fetch(`http://192.168.1.102:3000/mangas/${mangaId}`)
      .then((response) => response.json())
      .then((data) => {
        setManga(data);
      })
      .catch((error) => console.error('Error fetching manga chapters:', error));
  }, []);

  const filteredChapters = manga
    ? manga.chapters.filter((chapter) =>
        chapter.chapter_number.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (!manga) {
    return <LoadingComponent />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.backgroundImage}>
          <Image source={{ uri: 'https://inmanga.com' + manga.background_image_url }} style={styles.backgroundImage} />
        </View>

        <View style={styles.center}>
          <View style={styles.containerProfile}>
            <View style={styles.mangaImageContainer}>
              <View style={styles.mangaImage}>
                <Image source={{ uri: 'https://pack-yak.intomanga.com' + manga.image_url }} style={styles.fitImage} />
              </View>
              <View style={styles.mangaItems}>
                <View style={styles.mangaItem}>
                  <View style={[styles.rightStuff, { marginRight: 'auto', alignItems: 'center' }]}>
                    <Text>Estado</Text>
                  </View>
                  <View style={[styles.itemValue, { backgroundColor: manga.estado !== 'Finalizado' ? '#27C24C' : '#F05050' }]}>
                    <Text>{manga.estado}</Text>
                  </View>
                </View>
                <View style={styles.mangaItem}>
                  <View style={[styles.rightStuff, { marginRight: 'auto', alignItems: 'center' }]}>
                    <Text>Ultima Publicacion</Text>
                  </View>
                  <View style={[styles.itemValue, { backgroundColor: '#5B99E8' }]}>
                    <Text>{manga.ultimapublicacion}</Text>
                  </View>
                </View>
                <View style={styles.mangaItem}>
                  <View style={[styles.rightStuff, { marginRight: 'auto', alignItems: 'center' }]}>
                    <Text>Periodicidad</Text>
                  </View>
                  <View style={[styles.itemValue, { backgroundColor: '#FB8D2A' }]}>
                    <Text>{manga.periodicidad}</Text>
                  </View>
                </View>
                <View style={styles.mangaItem}>
                  <View style={[styles.rightStuff, { marginRight: 'auto', alignItems: 'center' }]}>
                    <Text>Capitulos</Text>
                  </View>
                  <View style={[styles.itemValue, { backgroundColor: '#22b4e1' }]}>
                    <Text>{manga.capitulos}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.containerData}>
            <View style={styles.headerTitle}>
              <Text style={styles.title}>{manga.title}</Text>
              <Text style={styles.description}>{manga.description}</Text>
            </View>

            <View style={styles.chapterList}>
              <Text style={styles.chapterListTitle}>All Chapters</Text>

              <TextInput
                style={styles.searchInput}
                placeholder="Search chapters"
                value={searchTerm}
                onChangeText={setSearchTerm}
              />

              {filteredChapters.map((chapter) => (
                <TouchableOpacity
                  style={[
                    styles.chapterListItem,
                    parseInt(chapter.image_count) === chapter.chapter_count ? '' : styles.blur,
                  ]}
                  key={chapter.chapter_id}
                  onPress={() =>
                    //console.log()
                    navigation.navigate(`ChapterImages`, { mangaId, chapterId: chapter.chapter_id })
                  }
                >
                  <Text style={styles.chapterNumber}>
                    Chapter {parseFloat(chapter.chapter_number) % 1 === 0 ? parseFloat(chapter.chapter_number).toFixed(0) : chapter.chapter_number}
                  </Text>
                  <Text style={styles.chapterPages}>Pages {chapter.chapter_count}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerProfile: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  mangaImageContainer: {
    position: 'relative',
  },
  mangaImage: {
    width: '100%',
    height: 300,
  },
  fitImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
  mangaItems: {
    padding: 10,
  },
  mangaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rightStuff: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 15,
  },
  itemValue: {
    padding: 5,
    borderRadius: 4,
    alignItems: 'center',
  },
  containerData: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  headerTitle: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  chapterList: {
    marginTop: 20,
  },
  chapterListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chapterListItem: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  blur: {
    opacity: 0.5,
  },
  chapterNumber: {
    fontWeight: 'bold',
  },
  chapterPages: {
    marginTop: 5,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
  },
};

export default MangasChapters;
