import React from 'react';

import { View, Text, Image } from 'react-native';
import { Tabs } from 'expo-router';
import { icons } from '../../constants';
import { StatusBar } from 'expo-status-bar';

const TabIcon = ({ icon, color, focused, name }) => {
	return (
		<View className='items-center justify-center gap-1'>
			<Image source={icon} className='w-6 h-6' tintColor={color} />
			<Text
				style={{ color: color }}
				className={`text-xs ${focused ? 'font-psemibold' : 'font-pregular'}`}>
				{name}
			</Text>
		</View>
	);
};

const TabsLayout = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: '#ffa001',
					tabBarInactiveTintColor: '#cdcde0',
					tabBarStyle: {
						backgroundColor: '#161622',
						borderTopWidth: 1,
						borderTopColor: '#232533',
						height: 110,
					},
				}}>
				<Tabs.Screen
					name='home'
					options={{
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.home}
								name='Home'
								color={color}
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name='bookmark'
					options={{
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.bookmark}
								name='Bookmark'
								color={color}
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name='create'
					options={{
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.plus}
								name='Create'
								color={color}
								focused={focused}
							/>
						),
					}}
				/>
				<Tabs.Screen
					name='profile'
					options={{
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.profile}
								name='Profile'
								color={color}
								focused={focused}
							/>
						),
					}}
				/>
			</Tabs>
			<StatusBar backgroundColor='#161622' style='light' />
		</>
	);
};

export default TabsLayout;
