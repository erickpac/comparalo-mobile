import { Text, StyleSheet } from "react-native";

export const ProductDescription = ({
  description,
}: {
  description?: string;
}) => {
  if (!description) {
    return null;
  }

  return <Text style={styles.greyedText}>{description}</Text>;
};

const styles = StyleSheet.create({
  greyedText: {
    color: "grey",
  },
});
