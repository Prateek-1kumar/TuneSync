/*
 * @Author: zhen qian xhdp123@126.com
 * @Date: 2025-03-10 05:22:24
 * @LastEditors: zhen qian xhdp123@126.com
 * @LastEditTime: 2025-03-10 05:23:27
 * @FilePath: /TuneSync/src/app/(tabs)/setting/Lyrics/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import LyricSetting from '@/components/LyricSetting'
import { defaultStyles } from '@/styles'
import { SafeAreaView, StyleSheet, View } from 'react-native'

const Lyrics = () => {
	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={defaultStyles.container}>
				<LyricSetting></LyricSetting>
			</View>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: 'black',
	},
})

export default Lyrics
