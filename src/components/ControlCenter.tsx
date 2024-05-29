import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'


import Icon from 'react-native-vector-icons/MaterialIcons'

import { playBackService } from '../../musicPlayerServices'

const ControlCenter = () => {

  const playBackState = usePlaybackState()
  const state = playBackState?.state;
  // next button
  const skipToNext = async () => {
    await TrackPlayer.skipToNext()
  }
  // Previous button
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious()
  }

  const togglePlayback = async (state: State | undefined) => {
    if (state === undefined) {
      return;
    }

    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack !== null) {
      if (state === State.Paused || state === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Icon style={styles.icon} name="skip-previous" size={40} />
      </Pressable>
      <Pressable onPress={() => togglePlayback(state)}>
        <Icon
          style={styles.icon}
          name={state === State.Playing ? "pause" : "play-arrow"}
          size={75}
        />
      </Pressable>
      <Pressable onPress={skipToNext}>
        <Icon style={styles.icon} name="skip-next" size={40} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 56,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#FFFFFF',
  },
  playButton: {
    marginHorizontal: 24,
  },
});

export default ControlCenter