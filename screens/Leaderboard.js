import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  SafeAreaView,
} from "react-native";
import LeaderboardUsers from "../components/leaderboard.users";

export default function Leaderboard() {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/score");
      if (!response.ok) {
        throw new Error("Network request failed");
      }
      const result = await response.json();
      // Sort the data based on the score
      result.sort((a, b) => b.score - a.score);
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Show an alert to the user
      alert("Failed to fetch data. Please try again.");
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await fetch("http://localhost:3000/users/score");
      if (!response.ok) {
        throw new Error("Network request failed");
      }
      const result = await response.json();
      // Sort the data based on the score
      result.sort((a, b) => b.score - a.score);
      setData(result);
    } catch (error) {
      console.error("Error refreshing data:", error);
      // Show an alert to the user
      alert("Failed to refresh data. Please try again.");
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>High Score Users</Text>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <LeaderboardUsers item={item} index={index} />
        )}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.flatlist}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 27,
    fontWeight: "900",
    color: "#102C57",
    marginVertical: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
