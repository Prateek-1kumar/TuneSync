/*
 * @Author: zhen qian xhdp123@126.com
 * @Date: 2024-11-25 13:33:55
 * @LastEditors: zhen qian xhdp123@126.com
 * @LastEditTime: 2025-03-10 04:41:00
 * @FilePath: /TuneSync/src/hooks/useTrackPlayerFavorite.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useFavorites } from '@/store/library'
import { useCallback } from 'react'
import TrackPlayer, { useActiveTrack } from 'react-native-track-player'

export const useTrackPlayerFavorite = () => {
	const activeTrack = useActiveTrack()

	const { favorites, toggleTrackFavorite } = useFavorites()

	// we're updating both the track player internal state and application internal state
	const toggleFavorite = useCallback(async () => {
		const id = await TrackPlayer.getActiveTrackIndex()

		if (id == null) return

		// update track player internal state
		await TrackPlayer.updateMetadataForTrack(id, {
			rating: favorites ? 0 : 1,
		})

		// update the app internal state
		if (activeTrack) {
			toggleTrackFavorite(activeTrack)
		}
	}, [favorites, toggleTrackFavorite, activeTrack])

	return { favorites, toggleFavorite }
}
