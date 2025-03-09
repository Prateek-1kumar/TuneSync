/*
 * @Author: zhen qian xhdp123@126.com
 * @Date: 2025-03-07 03:39:17
 * @LastEditors: zhen qian xhdp123@126.com
 * @LastEditTime: 2025-03-10 04:37:42
 * @FilePath: /TuneSync/src/components/MediaCenter.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { unknownTrackImageUri } from '@/constants/images'
import { Playlist } from '@/helpers/types'
import { useIndexStore } from '@/store/library'
import { utilsStyles } from '@/styles'
import { useIsFocused } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { memo, useEffect, useState } from 'react'
import { FlatListProps, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { DirectoryItem } from './DirectoryItem'

type MediaCenterProps = {
	data: any
	onDirPress: any
} & Partial<FlatListProps<Playlist>>

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginLeft: 40, marginVertical: 12 }} />
)

export const MediaCenter = memo(
	({ data, onDirPress: handleDirPress, ...flatListProps }: MediaCenterProps) => {
		const [pinnedList, setPinnedList] = useState(undefined)
		const { indexingList } = useIndexStore((state) => state)
		const isFocused = useIsFocused()
		useEffect(() => {
			if (isFocused) {
				const el = indexingList
				setPinnedList(el as any)
			}
			return () => {}
		}, [indexingList, isFocused])
		return (
			<FlashList
				style={{
					padding: 8,
					paddingHorizontal: 12,
				}}
				estimatedItemSize={30}
				// keyExtractor={({ item }) => item.filename}
				contentContainerStyle={{ padding: 10, paddingBottom: 128 }}
				ItemSeparatorComponent={ItemDivider}
				ListFooterComponent={ItemDivider}
				ListEmptyComponent={
					<View>
						<Text style={utilsStyles.emptyContentText}>Empty Folder</Text>

						<FastImage
							source={{ uri: unknownTrackImageUri, priority: FastImage.priority.normal }}
							style={utilsStyles.emptyContentImage}
						/>
					</View>
				}
				data={data}
				renderItem={({ item }: any) => {
					const isPinned = (pinnedList || []).some((el: any) => el.dir === item.filename)
					return (
						<DirectoryItem
							mode="edit"
							pinned={isPinned}
							data={item}
							onPress={(dir) => handleDirPress(item)}
						/>
					)
				}}
				// {...flatListProps}
			/>
		)
	},
)
