import FontAwesome from '@expo/vector-icons/FontAwesome';
import { color,  } from '@tamagui/themes';
import {  Tabs,  } from 'expo-router';
import {  StyleSheet } from 'react-native';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={styles.tabBarIcon} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: `${color.yellow7Light}`,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: `${color.yellow2Dark}`,
        },
        headerStyle: { backgroundColor: `${color.yellow4Dark}` },
        headerTintColor: 'white',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'BURMA RECIPES',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerTintColor: `${color.yellow7Light}`,
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          title: 'Favourite',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
      <Tabs.Screen name="(detail)/[id]" options={{ href: null, title: 'Detail' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
});
