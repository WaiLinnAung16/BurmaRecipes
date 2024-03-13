import FontAwesome from '@expo/vector-icons/FontAwesome';
import { color, colorTokens } from '@tamagui/themes';
import { Link, Tabs, router } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from 'tamagui';

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
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color="gray"
                    style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
                  />
                )}
              </Pressable>
            </Link>
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
      <Tabs.Screen name="(detail)/[id]" options={{ href: null, title:'Detail' }} />
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
