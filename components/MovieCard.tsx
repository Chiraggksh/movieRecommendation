import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Movie } from '@/data/movies';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 16,
    flexDirection: 'row',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  poster: {
    width: 100,
    height: 150,
    backgroundColor: '#334155',
  },
  content: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },
  title: {
    color: '#f1f5f9',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  rating: {
    color: '#fbbf24',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  genre: {
    color: '#94a3b8',
    fontSize: 13,
  },
});

type MovieCardProps = {
  movie: Movie;
  onPress: () => void;
};

export function MovieCard({ movie, onPress }: MovieCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress} android_ripple={{ color: '#334155' }}>
      <Image source={{ uri: movie.posterUrl }} style={styles.poster} contentFit="cover" />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.rating}>★ {movie.rating.toFixed(1)}</Text>
        <Text style={styles.genre}>{movie.genre}</Text>
      </View>
    </Pressable>
  );
}
