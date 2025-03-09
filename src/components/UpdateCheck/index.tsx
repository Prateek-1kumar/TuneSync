/*
 * @Author: zhen qian xhdp123@126.com
 * @Date: 2025-03-10 06:06:08
 * @LastEditors: zhen qian xhdp123@126.com
 * @LastEditTime: 2025-03-10 06:12:39
 * @FilePath: /TuneSync/src/components/UpdateCheck/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useEffect } from 'react'
import { Alert, Linking } from 'react-native'
import VersionCheck from 'react-native-version-check'
// yarn add react-native-version-check

export default function UpdateCheck() {
	useEffect(() => {
		checkUpdate()
	}, [])

	const checkUpdate = async () => {
		try {
			// 获取当前应用的版本（如1.0.0）
			const currentVersion = VersionCheck.getCurrentVersion()
			// 从应用商店读取最新版本号（如1.2.3）
			const latestVersion = await VersionCheck.getLatestVersion()

			// 比对
			if (isNewerVersion(latestVersion, currentVersion)) {
				Alert.alert(
					'Found New Version',
					`Latest Version: ${latestVersion}\nCurrent Version: ${currentVersion}`,
					[
						{
							text: 'Cancel',
							style: 'cancel',
						},
						{
							text: 'Update',
							onPress: () => {
								// 跳转到商店
								// iOS 将自动使用 App Store URL, Android 使用 Play Store
								VersionCheck.getStoreUrl().then((url) => {
									Linking.openURL(url)
								})
							},
						},
					],
				)
			}
		} catch (error) {
			console.log('检查更新出错:', error)
		}
	}

	return null
}

// 简单比较函数：v1 > v2 ?
function isNewerVersion(v1: string, v2: string): boolean {
	const toNumArr = (v: string) => v.split('.').map(Number)
	const [a1, a2, a3] = toNumArr(v1)
	const [b1, b2, b3] = toNumArr(v2)
	if (a1 !== b1) return a1 > b1
	if (a2 !== b2) return a2 > b2
	return a3 > b3
}
