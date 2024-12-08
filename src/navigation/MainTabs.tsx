import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import ReservationScreen from "../screens/ReservationsScreen";
import ProfileScreen from "../screens/ProfileScreen";

export type MainTabParamList = {
  Home: undefined;
  Reservations: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#091119", 
          borderTopWidth: 1,
          borderTopColor: "#333",
          height: 60, 
          paddingTop:10
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Reservations") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return (
            <View >
              <Ionicons name={iconName} size={size+4} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: "#027BFF", 
        tabBarInactiveTintColor: "gray", 
        tabBarShowLabel: false, 
        headerShown: false, 
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Reservations" component={ReservationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}


