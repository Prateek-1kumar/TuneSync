/*
 * @Author: zhen qian xhdp123@126.com
 * @Date: 2024-11-25 13:33:55
 * @LastEditors: zhen qian xhdp123@126.com
 * @LastEditTime: 2025-03-10 04:39:34
 * @FilePath: /TuneSync/src/components/BottomUpPanel/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'

interface BottomUpPanelProps {
	isVisible: boolean
	onClose: () => void
	children: React.ReactNode
	header?: React.ReactNode // 添加 header 的类型定义
	height?: number // 添加 height 的类型定义
}

const BottomUpPanel: React.FC<BottomUpPanelProps> = ({
	isVisible,
	onClose,
	children,
	header,
	height = 250,
}) => {
	return (
		<Modal isVisible={isVisible} onBackdropPress={onClose} backdropOpacity={0} style={styles.modal}>
			<View style={{ ...styles.panel, minHeight: height }}>
				{header ? (
					<View style={styles.header}>{header}</View>
				) : (
					<TouchableOpacity style={styles.closeButton} onPress={onClose}>
						<MaterialIcons style={styles.closeButton} name="close" size={24} color="white" />
					</TouchableOpacity>
				)}
				{children}
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	modal: {
		justifyContent: 'flex-end',
		margin: 0,
	},
	panel: {
		backgroundColor: '#202020',
		padding: 20,
		paddingTop: 0,
		marginTop: 0,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		minHeight: 200,
		position: 'relative',
	},
	closeButton: {
		position: 'absolute',
		height: 30,
		width: 30,
		top: 10,
		right: 10,
		// backgroundColor: 'white',
		borderRadius: 15,
		padding: 5,
	},
	closeButtonText: {
		fontSize: 20,
		zIndex: 100,
		color: 'white',
	},
})

export default BottomUpPanel
