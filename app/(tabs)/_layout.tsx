import React, { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, router, Tabs } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { useRootNavigationState } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import useAuthStore from '@/libs/stores/auth/auth.store';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const auth = useAuthStore(state => state.loginResponse);
  const logout = useAuthStore(state => state.logoutUser);
  if (!auth) {
    return <Redirect href="/auth/login" />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable onPress={() => logout()}>
              <Text>Logout</Text>
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
