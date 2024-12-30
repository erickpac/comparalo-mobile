import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

type Props = {
  onPress: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
};

export const LoadMoreProductsButton = ({
  onPress,
  isFetchingNextPage,
  hasNextPage,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={!hasNextPage}
      style={styles.container}
    >
      {isFetchingNextPage && (
        <ActivityIndicator
          size="small"
          color="#fff"
          style={styles.activityIndicator}
        />
      )}
      <ThemedText lightColor="#fff" darkColor="#fff">
        {isFetchingNextPage
          ? "Loading more products"
          : hasNextPage
          ? "Load more products"
          : "No more products"}
      </ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.light.tint,
    borderRadius: 5,
  },
  activityIndicator: {
    marginRight: 8,
  },
});
