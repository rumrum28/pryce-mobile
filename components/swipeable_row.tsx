import { Ionicons } from '@expo/vector-icons'
import React, { Component, PropsWithChildren } from 'react'
import { Animated, StyleSheet, I18nManager, View } from 'react-native'

import { RectButton } from 'react-native-gesture-handler'

import Swipeable from 'react-native-gesture-handler/Swipeable'

export default class SwipeableRow extends Component<
  PropsWithChildren<unknown & { onDelete: () => void }>
> {
  private renderRightActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    return (
      <RectButton style={styles.rightAction} onPress={this.close}>
        <Ionicons
          name="trash-outline"
          size={24}
          color="white"
          style={{ marginRight: 10 }}
        />
      </RectButton>
    )
  }

  // private renderLeftActions = (
  //   _progress: Animated.AnimatedInterpolation<number>,
  //   dragX: Animated.AnimatedInterpolation<number>
  // ) => {
  //   return (
  //     <RectButton
  //       style={styles.leftAction}
  //       onPress={() => alert('Left Action')}
  //     >
  //       <Ionicons
  //         name="add-circle-outline"
  //         size={24}
  //         color="white"
  //         style={{ marginLeft: 10 }}
  //       />
  //     </RectButton>
  //   )
  // }

  private swipeableRow?: Swipeable

  private updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref
  }
  private close = () => {
    this.swipeableRow?.close()
    this.props.onDelete()
  }
  render() {
    const { children } = this.props
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={80}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        // renderLeftActions={this.renderLeftActions}
        renderRightActions={this.renderRightActions}
      >
        {children}
      </Swipeable>
    )
  }
}

const styles = StyleSheet.create({
  rightAction: {
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    backgroundColor: '#dd2c00',
    flex: 1,
    justifyContent: 'flex-end',
  },
  // leftAction: {
  //   alignItems: 'center',
  //   flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  //   backgroundColor: '#4CAF50',
  //   flex: 1,
  //   justifyContent: 'flex-start', // Aligns content to the start (left)
  // },
})
