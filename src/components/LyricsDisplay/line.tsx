import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Easing, LayoutChangeEvent, StyleSheet, Text, View } from 'react-native'

type LyricMaskProps = {
	lyric: string
	currentTime: number
	startTime: number
	endTime: number
	isFinished: boolean
	transY: Animated.Value
}

/** clamp：限制 value 在 [min, max] 之间 */
function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max)
}

export default function LyricMaskView({
	transY,
	isFinished,
	lyric,
	currentTime,
	startTime,
	endTime,
}: LyricMaskProps) {
	const [textWidth, setTextWidth] = useState(0)
	const animatedStyle = {
		transform: [
			{
				translateY: isFinished || !transY ? 0 : transY,
			},
		],
	}

	const animatedProgress = useRef(new Animated.Value(0)).current

	// 用于测量 Text 宽度
	const onLayoutText = useCallback((e: LayoutChangeEvent) => {
		setTextWidth(e.nativeEvent.layout.width)
	}, [])

	/** 1) 计算目标进度: [0~1] */
	let targetProgress = 0
	if (currentTime < startTime) {
		targetProgress = 0
	} else if (currentTime >= endTime) {
		targetProgress = 1
	} else {
		targetProgress = clamp((currentTime - startTime) / (endTime - startTime), 0, 1)
	}

	/**
	 * 2) 用 Animated 进行平滑过渡：
	 * 当 targetProgress 改变时，启动一个定长动画
	 */
	useEffect(() => {
		Animated.timing(animatedProgress, {
			toValue: targetProgress,
			duration: 300, // 动画时长(毫秒)；可自行调整
			easing: Easing.linear,
			useNativeDriver: false,
		}).start()
	}, [targetProgress, animatedProgress])

	/**
	 * 3) 将 animatedProgress 映射到像素宽度：
	 * outputRange: [0, textWidth]
	 */
	const highlightWidth = animatedProgress.interpolate({
		inputRange: [0, 1],
		outputRange: [0, textWidth],
		extrapolate: 'clamp',
	})

	// 文字作为遮罩，不断刷新时也会更新底层渐变区域
	const maskElement = (
		<View style={styles.maskWrapper}>
			<Text onLayout={onLayoutText} adjustsFontSizeToFit numberOfLines={1} style={styles.lyricText}>
				{lyric}
			</Text>
		</View>
	)

	return (
		<Animated.View style={[animatedStyle]}>
			<MaskedView style={styles.maskedView} maskElement={maskElement}>
				{/* 容器 = "渐变" + "灰色" */}
				<View style={[styles.lineContainer, { width: textWidth }]}>
					{/* 左侧渐变(Animated.View) */}
					<Animated.View style={{ width: highlightWidth }}>
						<LinearGradient
							colors={['lightgray', 'white']}
							start={[0, 1]}
							end={[1, 0]}
							style={StyleSheet.absoluteFill}
						/>
					</Animated.View>

					{/* 右侧灰色 */}
					<Animated.View
						style={{
							flex: 1,
							backgroundColor: '#888',
						}}
					/>
				</View>
			</MaskedView>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	maskedView: {
		marginHorizontal: 16,
	},
	lineContainer: {
		justifyContent: 'center',
		height: 40,

		// alignItems: 'center',
		flexDirection: 'row',
		overflow: 'scroll',
	},
	lyricText: {
		textAlign: 'center',
		fontSize: 20,
		color: '#fff', // 遮罩文字本身要有颜色
		fontWeight: 'bold',
	},
	maskWrapper: {
		// width: '80%',
		justifyContent: 'center',
	},
})
