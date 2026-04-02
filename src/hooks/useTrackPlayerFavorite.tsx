import { useFavorateStore, useLibraryStore } from '@/store/library'
import { useCallback, useMemo } from 'react'
import TrackPlayer, { useActiveTrack } from 'react-native-track-player'

export const useTrackPlayerFavorite = () => {
	const activeTrack = useActiveTrack()
	const { toggleTrackFavorite } = useLibraryStore((state) => state)
	const favorateTracks = useFavorateStore((state) => state.favorateTracks)

	const isFavorite = useMemo(
		() => favorateTracks.some((track: any) => track.url === activeTrack?.url),
		[favorateTracks, activeTrack],
	)

	const toggleFavorite = useCallback(async () => {
		const id = await TrackPlayer.getActiveTrackIndex()

		if (id == null) return

		await TrackPlayer.updateMetadataForTrack(id, {
			rating: isFavorite ? 0 : 1,
		})

		if (activeTrack) {
			toggleTrackFavorite(activeTrack)
		}
	}, [isFavorite, toggleTrackFavorite, activeTrack])

	return { isFavorite, toggleFavorite }
}
