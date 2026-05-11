import { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

export const useWifiScanner = () => {
  const [networks, setNetworks] = useState([]);
  const [loading, setLoading] = useState(false);

  const scanNetworks = async () => {
    setLoading(true);
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
      }

      // Re-scan and fetch the list
      const results = await WifiManager.reScanAndGetSignalStrength();
      // Sort by strongest signal first
      const sorted = results.sort((a, b) => b.level - a.level);
      setNetworks(sorted);
    } catch (error) {
      console.error("Scan failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scanNetworks();
  }, []);

  return { networks, loading, scanNetworks };
};