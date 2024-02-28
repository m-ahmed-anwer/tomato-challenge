import React, { useEffect, useState } from "react";
import { View, FlatList, RefreshControl, StyleSheet, Text } from "react-native";
import LeaderboardUsers from "../components/leaderboard.users";

export default function Leaderboard() {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([
    { id: 1, name: "Ahmed", score: 12 },
    { id: 2, name: "Ahmed", score: 15 },
    { id: 3, name: "Ahmed", score: 22 },
    { id: 4, name: "Ahmed", score: 31 },
    { id: 5, name: "Ahmed", score: 42 },
    { id: 6, name: "Ahmed", score: 2 },
    { id: 7, name: "Ahmed", score: 21 },
    { id: 8, name: "Ahmed", score: 34 },
  ]);

  useEffect(() => {
    console.log("HI");
  }, [refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
    // Add your refresh logic here
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Scores Users</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <LeaderboardUsers key={item.id} item={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.flatlist}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  
});
