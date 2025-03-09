/*
 * @Author: zhen qian xhdp123@126.com
 * @Date: 2025-03-07 03:39:17
 * @LastEditors: zhen qian xhdp123@126.com
 * @LastEditTime: 2025-03-10 05:09:22
 * @FilePath: /TuneSync/src/app/(tabs)/setting/resource.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ResourceManage from '@/components/ResourceManage'
import { useRefreshLibrary } from '@/hooks/useRefreshLibrary'
import { useIndexStore } from '@/store/library'
import { defaultStyles } from '@/styles'
import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import { View } from 'react-native'

const Resouce = () => {
	const { refreshLibraryWithCache } = useRefreshLibrary()
	const { indexingList } = useIndexStore((state) => state)
	useFocusEffect(
		useCallback(() => {
			return () => {
				if (indexingList.length > 0) {
					refreshLibraryWithCache()
				}
			}
		}, []),
	)
	return (
		<View style={defaultStyles.container}>
			<ResourceManage />
		</View>
	)
}

export default Resouce
