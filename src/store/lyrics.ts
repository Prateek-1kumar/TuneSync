/*
 * @Author: zhen qian xhdp123@126.com
 * @Date: 2025-03-10 05:39:23
 * @LastEditors: zhen qian xhdp123@126.com
 * @LastEditTime: 2025-03-10 05:45:24
 * @FilePath: /TuneSync/src/store/lyrics.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import library from '@/assets/data/library.json'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { storage } from './mkkv'

interface lricsSettingState {
	syncMode: boolean
	toggleMode: () => void
}

export const useLyricsSettingStore = create<lricsSettingState>()(
	persist(
		(set) => {
			return {
				syncMode: true,
				toggleMode: () => {
					set((state: lricsSettingState) => ({ syncMode: !state.syncMode }))
				},
			} as lricsSettingState
		},
		{
			name: 'lyricsSetting', // 存储在 AsyncStorage 中的键名
			storage: {
				getItem: (name) => {
					const value = storage.getString(name)
					return value ? JSON.parse(value) : null
				},
				setItem: (name, value) => storage.set(name, JSON.stringify(value)),
				removeItem: (name) => storage.delete(name),
			},
		},
	),
)
