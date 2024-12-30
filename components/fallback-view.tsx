import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

type FallbackProps = {
  message: string;
};

export const FallbackView = ({ message }: FallbackProps) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.message}>{message}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    fontSize: 18,
    fontWeight: "semibold",
  },
});
