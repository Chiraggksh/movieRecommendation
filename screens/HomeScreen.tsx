import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MovieCard } from '@/components/MovieCard';
import { SearchBar } from '@/components/SearchBar';
import { movies } from '@/data/movies';

export function HomeScreen() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const filtered = useMemo(() => {
    if (!query.trim()) return movies;
    const q = query.toLowerCase().trim();
    return movies.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.genre.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SearchBar value={query} onChangeText={setQuery} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => router.push({ pathname: '/movie/[id]', params: { id: String(item.id) } })}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  list: {
    paddingBottom: 24,
  },
});
