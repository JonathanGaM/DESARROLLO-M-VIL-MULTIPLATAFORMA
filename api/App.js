import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';

export default function App() {
  const [news, setNews] = useState([]);
  const key = '33bc256c50e04ea594880560d51daa2b';
  const country = 'us';

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${key}`;
      const response = await fetch(url);
      const data = await response.json();
      setNews(data.articles);
    } catch (error) {
      console.error('Error fetching news: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Noticias</Text>
      <ScrollView>
        {news.map((article, index) => (
          <TouchableOpacity key={index} onPress={() => Linking.openURL(article.url)}>
            <View style={styles.articleContainer}>
              <Image source={{ uri: article.urlToImage }} style={styles.image} />
              <Text style={styles.title}>{article.title}</Text>
              <Text style={styles.description}>{article.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#737374',
  },
  header: {
    fontSize: 24,
    color: 'white',
    backgroundColor: '#131212',
    padding: 10,
    textAlign: 'center',
  },
  articleContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
});
