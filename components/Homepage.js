import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import Constants from 'expo-constants';
import { useWifiScanner } from "../hooks/useWifiScanner";

const Homepage = () => {
  const { networks, loading, scanNetworks } = useWifiScanner();
  // const brandColor = Constants.expoConfig.extra.primaryColor || '#2196F3';
  const brandColor = "#2196F3";

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.ssid}>{item.SSID || "Hidden Network"}</Text>
        <Text style={styles.details}>BSSID: {item.BSSID}</Text>
      </View>
      <View style={styles.signalContainer}>
        <Text style={[styles.dbText, { color: brandColor }]}>
          {item.level} dBm
        </Text>
        <MaterialCommunityIcons
          name={
            item.level > -60
              ? "wifi"
              : item.level > -80
                ? "wifi-strength-2"
                : "wifi-strength-1"
          }
          size={24}
          color={brandColor}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nearby Networks</Text>
        <TouchableOpacity onPress={scanNetworks} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={brandColor} />
          ) : (
            <MaterialCommunityIcons
              name="refresh"
              size={28}
              color={brandColor}
            />
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={networks}
        keyExtractor={(item, index) => item.BSSID || index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>No networks found.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    elevation: 4,
  },
  title: { fontSize: 20, fontWeight: "bold" },
  list: { padding: 15 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  ssid: { fontSize: 16, fontWeight: "600" },
  details: { fontSize: 12, color: "#888" },
  signalContainer: { alignItems: "center" },
  dbText: { fontWeight: "bold", fontSize: 14 },
  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "#888",
    fontSize: 16,
  },
});

export default Homepage;
