import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    color: '#f1f5f9',
    fontSize: 16,
    paddingVertical: 0,
  },
});

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export function SearchBar({ value, onChangeText, placeholder = 'Search movies...' }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={22} color="#94a3b8" />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#64748b"
        returnKeyType="search"
      />
    </View>
  );
}
