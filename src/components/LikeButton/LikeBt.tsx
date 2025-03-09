/*
 * @Author: zhen qian xhdp123@126.com
 * @Date: 2025-03-10 03:27:18
 * @LastEditors: zhen qian xhdp123@126.com
 * @LastEditTime: 2025-03-10 04:37:55
 * @FilePath: /TuneSync/src/components/LikeButton/LikeBt.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useMemo, useRef } from 'react'
import { Animated, Easing, StyleSheet, TouchableOpacity } from 'react-native'
// 如果是Expo环境，可以从 '@expo/vector-icons/Ionicons' 引入
import { useFavorateStore } from '@/store/library'
import { AntDesign } from '@expo/vector-icons'
import { useActiveTrack } from 'react-native-track-player'

export default function LikeButton() {
	const { favorateTracks, addTracks, setFavorateTracks } = useFavorateStore()
	console.log('favorateTracks', favorateTracks)

	// 是否喜欢
	// const [liked, setLiked] = useStat(isFavorite)
	const activeTrack = useActiveTrack()
	const isFavorite = useMemo(() => {
		if (activeTrack) {
			return favorateTracks.some((el: { title: any }) => el.title === activeTrack.title)
		}
		return false
	}, [activeTrack, favorateTracks])

	// 动画值：初始为 1 (正常大小)
	const scaleAnim = useRef(new Animated.Value(1)).current

	// 点击喜欢
	const handlePress = () => {
		// 更新喜欢状态
		if (isFavorite) {
			setFavorateTracks(favorateTracks.filter((el: any) => el.title !== activeTrack?.title))
		} else {
			addTracks(activeTrack, favorateTracks)
		}

		// 先放大到1.3，再回到1
		Animated.sequence([
			Animated.timing(scaleAnim, {
				toValue: 1.3,
				duration: 150,
				easing: Easing.out(Easing.quad),
				useNativeDriver: true,
			}),
			Animated.spring(scaleAnim, {
				toValue: 1,
				friction: 3, // 越小弹性越大
				useNativeDriver: true,
			}),
		]).start()
	}

	// 根据喜欢状态切换图标样式
	const iconName = isFavorite ? 'heart' : 'hearto'
	const iconColor = isFavorite ? '#FF4D4F' : '#aaa'

	return (
		<TouchableOpacity onPress={handlePress} activeOpacity={0.7} style={styles.button}>
			<Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
				<AntDesign name={iconName} size={24} color={iconColor} />
			</Animated.View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		padding: 16,
		paddingRight: 0,
		// 可添加背景或其他布局
	},
})
