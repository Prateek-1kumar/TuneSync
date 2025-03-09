/*
 * @Author: zhen qian xhdp123@126.com
 * @Date: 2025-03-06 02:08:05
 * @LastEditors: zhen qian xhdp123@126.com
 * @LastEditTime: 2025-03-10 05:38:45
 * @FilePath: /TuneSync/src/store/player.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import library from '@/assets/data/library.json'
import { create } from 'zustand'

interface PlayerState {
	playing: boolean
	setIsPlaying: (isPlaying?: boolean) => void
	cacheResetTrigger: boolean
	fireCacheResetTrigger: () => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
	playing: false, // 使用外部传入的初始值
	cacheResetTrigger: false,
	setIsPlaying: (isPlaying) =>
		set(() => {
			return { playing: isPlaying }
		}), // 更新状态的方法
	fireCacheResetTrigger: () => set((state) => ({ cacheResetTrigger: !state.cacheResetTrigger })),
}))
