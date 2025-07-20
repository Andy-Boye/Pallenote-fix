import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

const NotificationsScreen = () => {
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with API call
    const fetchNotifications = async () => {
      try {
        const data = [
          { id: '1', message: 'Your note was synced successfully.' },
          { id: '2', message: 'Reminder: Task due tomorrow.' },
        ];
        setNotifications(data);
      } catch (err) {
        console.error('Failed to fetch notifications', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  if (loading) return <ActivityIndicator color={colors.primary} size="large" />;

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: colors.background }}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 12, borderBottomColor: colors.border, borderBottomWidth: 1 }}>
            <Text style={{ color: colors.text }}>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default NotificationsScreen;
