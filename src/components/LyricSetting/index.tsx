/*
 * @Author: zhen qian xhdp123@126.com
 * @Date: 2025-03-10 05:21:29
 * @LastEditors: zhen qian xhdp123@126.com
 * @LastEditTime: 2025-03-10 05:51:00
 * @FilePath: /TuneSync/src/components/LyricSetting/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { colors } from '@/constants/tokens'
import { useLyricsSettingStore } from '@/store/lyrics'
import React from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'

export default function LyricSetting() {
	// 管理「同步歌词」的开关状态
	const { syncMode, toggleMode } = useLyricsSettingStore()
	// 当开关切换时更新状态
	const handleToggleSyncLyric = (value: boolean) => {
		toggleMode()
		// 如果需要，调用持久化逻辑，如 AsyncStorage 或 Redux / Context 存储
	}

	return (
		<View style={styles.container}>
			{/* <Text style={styles.title}>配置页面</Text> */}

			<View style={styles.settingItem}>
				<Text style={styles.label}>Synchronized Mode</Text>
				<Switch
					value={syncMode}
					onValueChange={handleToggleSyncLyric}
					thumbColor={syncMode ? '#fff' : '#f4f3f4'}
					trackColor={{ false: '#767577', true: colors.primary }}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		padding: 20,
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 16,
		color: '#333',
	},
	settingItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 12,
		paddingVertical: 8,
		backgroundColor: '#333',
		borderRadius: 8,
		paddingHorizontal: 16,
	},
	label: {
		fontSize: 16,
		color: colors.text,
	},
})
