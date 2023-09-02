import React, { useEffect, useState } from 'react';
import {  useRoute } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const ChapterImages = ({ navigation }) => {
  const route = useRoute();
  const { mangaId, chapterId } = route.params;
  const [chapter, setChapter] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [manga, setManga] = useState([]);


  useEffect(() => {
      fetch(`http://192.168.1.102:3000/mangas/${mangaId}/chapters/${chapterId}/`)
        .then((response) => response.json())
        .then((data) => setChapter(data))
        .catch((error) => console.error('Error fetching chapter images:', error));

      // Cleanup function
      return () => {
        setChapter(null);
        setCurrentImageIndex(0);
      };
  }, [mangaId, chapterId]);

  useEffect(() => {
    fetch(`http://192.168.1.102:3000/mangas/${mangaId}`)
      .then((response) => response.json())
      .then((data) => {
        setManga(data);
      })
      .catch((error) => console.error('Error fetching manga chapters:', error));
  
  }, []);
  

  if (!chapter || !manga || !manga.chapters) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }
  

  const { images, hasNextChapter, hasPreviousChapter } = chapter;
  const isFirstChapter = currentImageIndex === 0;
  const isLastChapter = currentImageIndex === images.length - 1;

  const handleNextImage = () => {
    if (!isLastChapter) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (!isFirstChapter) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleChapterChange = (value) => {
    navigation.navigate(`ChapterImages`, { mangaId, chapterId: value })
    console.log(value)
  };

  const handleImageChange = (value) => {
    setCurrentImageIndex(parseInt(value, 10));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{chapter.title}</Text>
      <Text style={styles.chapterNumber}>Chapter {chapter.chapter_number}</Text>
      <Text style={styles.pageNumber}>Page: {currentImageIndex + 1} / {chapter.images.length}</Text>

      <View style={styles.dropdownContainer}>
        <Picker
          style={styles.chapterDropdown}
          selectedValue={chapterId}
          onValueChange={handleChapterChange}
        >
          {manga.chapters.map((chap) => (
            <Picker.Item key={chap.chapter_id} value={chap.chapter_id} label={`Chapter ${chap.chapter_number}`} />
          ))}
        </Picker>
        <Picker
          style={styles.imageDropdown}
          selectedValue={currentImageIndex}
          onValueChange={handleImageChange}
        >
          {images.map((_, index) => (
            <Picker.Item key={index} value={index} label={`Page: ${index + 1}`} />
          ))}
        </Picker>
      </View>

      <Image source={{ uri: images[currentImageIndex] }} style={styles.image} resizeMode="contain" />

      <View style={styles.buttonContainer}>
        {isFirstChapter && hasPreviousChapter && (
          <TouchableOpacity onPress={() => navigation.navigate('ChapterImages', { mangaId, chapterId: chapter.previousChapterId })}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Previous Chapter</Text>
            </View>
          </TouchableOpacity>
        )}

        {!isFirstChapter && (
          <TouchableOpacity onPress={handlePreviousImage} disabled={isFirstChapter}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Back</Text>
            </View>
          </TouchableOpacity>
        )}

        {isLastChapter && hasNextChapter ? (
          <TouchableOpacity onPress={() => navigation.navigate('ChapterImages', { mangaId, chapterId: chapter.nextChapterId })}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Next Chapter</Text>
            </View>
          </TouchableOpacity>
        ) : !isLastChapter && (
          <TouchableOpacity onPress={handleNextImage} disabled={isLastChapter}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chapterNumber: {
    fontSize: 18,
    marginBottom: 10,
  },
  pageNumber: {
    fontSize: 16,
    marginBottom: 20,
  },
  image: {
    width: windowWidth - 40,
    flex: 1,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  dropdownContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  chapterDropdown: {
    flex: 1,
    fontSize: 14,
    padding: 8,
    marginRight: 10,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
  },
  imageDropdown: {
    flex: 1,
    fontSize: 14,
    padding: 8,
    marginLeft: 10,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
  },
});

export default ChapterImages;
