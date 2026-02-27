import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image as ExpoImage } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { MovieCard } from '@/components/MovieCard';
import { movies } from '@/data/movies';

export function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [showSimilar, setShowSimilar] = useState(false);

  const movie = useMemo(
    () => movies.find((m) => String(m.id) === id),
    [id]
  );

  const similar = useMemo(() => {
    if (!movie) return [];
    return movies.filter((m) => m.genre === movie.genre && m.id !== movie.id);
  }, [movie]);

  if (!movie) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Movie not found</Text>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>Go back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ExpoImage
          source={{ uri: movie.posterUrl }}
          style={styles.poster}
          contentFit="cover"
        />
        <View style={styles.body}>
          <Text style={styles.title}>{movie.title}</Text>
          <View style={styles.meta}>
            <Text style={styles.rating}>★ {movie.rating.toFixed(1)}</Text>
            <View style={styles.genreBadge}>
              <Text style={styles.genreText}>{movie.genre}</Text>
            </View>
          </View>
          <Text style={styles.description}>{movie.description}</Text>

          <Pressable
            style={styles.recommendButton}
            onPress={() => setShowSimilar(true)}
          >
            <Ionicons name="film-outline" size={22} color="#0f172a" />
            <Text style={styles.recommendButtonText}>Recommend Similar Movies</Text>
          </Pressable>

          {showSimilar && similar.length > 0 && (
            <View style={styles.similarSection}>
              <Text style={styles.similarTitle}>Similar movies ({movie.genre})</Text>
              {similar.map((m) => (
                <MovieCard
                  key={m.id}
                  movie={m}
                  onPress={() =>
                    router.replace({ pathname: '/movie/[id]', params: { id: String(m.id) } })
                  }
                />
              ))}
            </View>
          )}
          {showSimilar && similar.length === 0 && (
            <Text style={styles.noSimilar}>No other movies in this genre yet.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  poster: {
    width: '100%',
    height: 420,
    backgroundColor: '#1e293b',
  },
  body: {
    padding: 20,
  },
  title: {
    color: '#f1f5f9',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  rating: {
    color: '#fbbf24',
    fontSize: 18,
    fontWeight: '700',
  },
  genreBadge: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  genreText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    color: '#cbd5e1',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  recommendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#fbbf24',
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 24,
  },
  recommendButtonText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '700',
  },
  similarSection: {
    marginTop: 8,
  },
  similarTitle: {
    color: '#f1f5f9',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  noSimilar: {
    color: '#94a3b8',
    fontSize: 15,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#f1f5f9',
    fontSize: 18,
    marginBottom: 16,
  },
  backBtn: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backBtnText: {
    color: '#f1f5f9',
    fontWeight: '600',
  },
});
