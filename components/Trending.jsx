import {
	Text,
	FlatList,
	TouchableOpacity,
	ImageBackground,
	Image,
} from 'react-native';
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { icons } from '../constants';
import { ResizeMode, Video } from 'expo-av';

const TrendingItem = ({ activeItem, item }) => {
	const [play, setPlay] = useState(false);

	const zoomIn = {
		0: {
			scale: 0.9,
		},
		1: {
			scale: 1,
		},
	};

	const zoomOut = {
		0: {
			scale: 1,
		},
		1: {
			scale: 0.9,
		},
	};

	return (
		<Animatable.View
			duration={500}
			animation={activeItem === item.$id ? zoomIn : zoomOut}>
			{play ? (
				<Video
					source={{
						uri: 'https://asset.xapads.com/react-xpd-ads/assets/vuse/vuse-video-1.mp4', // item.video
					}} // loaded videos not playing
					className='w-52 h-72 rounded-[33px] mt-5 mb-3 bg-white/10'
					resizeMode={ResizeMode.CONTAIN}
					useNativeControls
					shouldPlay
					onPlaybackStatusUpdate={(status) => {
						if (status.error) {
							setPlay(false);
							console.log(status.error);
						}
						if (status.didJustFinish) {
							setPlay(false);
						}
					}}
				/>
			) : (
				<TouchableOpacity
					className='relative flex justify-center items-center'
					activeOpacity={0.7}
					onPress={() => setPlay(true)}>
					<ImageBackground
						source={{
							uri: item.thumbnail,
						}}
						className='w-52 h-72 rounded-[33px] mt-5 mb-3 overflow-hidden shadow-lg shadow-black/40'
						resizeMode='cover'
					/>
					<Image
						source={icons.play}
						className='w-12 h-12 absolute'
						resizeMode='contain'
					/>
				</TouchableOpacity>
			)}
		</Animatable.View>
	);
};

const Trending = ({ posts }) => {
	const [activeItem, setActiveItem] = useState(posts[0]);

	const viewableItemsChanged = ({ viewableItems }) => {
		if (viewableItems.length) {
			setActiveItem(viewableItems[0].key);
		}
	};

	return (
		<FlatList
			data={posts}
			keyExtractor={(item) => item.$id}
			onViewableItemsChanged={viewableItemsChanged}
			renderItem={({ item }) => (
				<TrendingItem activeItem={activeItem} item={item} />
			)}
			viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
			horizontal
		/>
	);
};

export default Trending;
