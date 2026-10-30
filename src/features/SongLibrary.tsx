import { Alert, Label, TextField, ActionButton, Box, Icon } from '../components/WebUI';
import React, { useEffect, useRef, useState } from 'react';
import { COLORS, styles } from '../theme';
import type { SongItem } from '../types';
import { resolveApiAssetUrl } from '../api/client';

function formatPlaybackTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
}

export function SongLibrary({ songs: songList }: { songs: SongItem[] }) {
  const [activeSong, setActiveSong] = useState<string | null>(null);
  const [playingSongKeys, setPlayingSongKeys] = useState<string[]>([]);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  const [songQuery, setSongQuery] = useState('');
  const soundRefs = useRef(new Map<string, HTMLMediaElement>());
  const playingSongKeysRef = useRef(new Set<string>());
  const activeSongRef = useRef<string | null>(null);

  useEffect(() => () => {
    soundRefs.current.forEach((audio) => {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      if (audio instanceof HTMLVideoElement) audio.remove();
    });
    soundRefs.current.clear();
    playingSongKeysRef.current.clear();
  }, []);

  async function toggleSong(song: SongItem) {
    if (!song.previewUrl) {
      Alert.alert('No preview available', 'This song does not have a preview link yet.');
      return;
    }

    const songKey = song.id ?? song.title;
    const currentAudio = soundRefs.current.get(songKey);

    if (currentAudio && playingSongKeysRef.current.has(songKey)) {
      currentAudio.pause();
      playingSongKeysRef.current.delete(songKey);
      setPlayingSongKeys([...playingSongKeysRef.current]);
      return;
    }

    if (!playingSongKeysRef.current.has(songKey) && playingSongKeysRef.current.size >= 2) {
      Alert.alert('Two previews are already playing', 'Pause one of the playing songs before starting another.');
      return;
    }

    try {
      const previewUrl = resolveApiAssetUrl(song.previewUrl);
      let media = currentAudio;
      if (!media) {
        const extension = new URL(previewUrl).pathname.split('.').pop()?.toLowerCase();
        if (extension === 'mp4') {
          const video = document.createElement('video');
          video.playsInline = true;
          video.preload = 'metadata';
          video.style.position = 'fixed';
          video.style.width = '1px';
          video.style.height = '1px';
          video.style.opacity = '0';
          video.style.pointerEvents = 'none';
          document.body.appendChild(video);
          media = video;
        } else {
          const audio = new window.Audio();
          audio.preload = 'metadata';
          media = audio;
        }
        media.src = previewUrl;
        soundRefs.current.set(songKey, media);
      } else if (media.src !== previewUrl) {
        media.src = previewUrl;
        media.load();
      }

      const mediaElement = media;
      activeSongRef.current = songKey;
      setActiveSong(songKey);
      setPlaybackTime(mediaElement.currentTime);
      setPlaybackDuration(Number.isFinite(mediaElement.duration) ? mediaElement.duration : 0);
      mediaElement.ontimeupdate = () => {
        if (activeSongRef.current === songKey) setPlaybackTime(mediaElement.currentTime);
      };
      mediaElement.ondurationchange = () => {
        if (activeSongRef.current === songKey) {
          setPlaybackDuration(mediaElement.duration);
        }
      };
      mediaElement.onerror = () => {
        playingSongKeysRef.current.delete(songKey);
        setPlayingSongKeys([...playingSongKeysRef.current]);
        if (activeSongRef.current === songKey) {
          const errorCode = mediaElement.error?.code;
          const detail = errorCode === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED
            ? 'The preview format is not supported or the link is not a direct audio/video file.'
            : 'The media server could not provide this file. Check the preview URL and Storage permissions.';
          Alert.alert('Playback unavailable', detail);
        }
      };
      mediaElement.onended = () => {
        if (soundRefs.current.get(songKey) === mediaElement) {
          playingSongKeysRef.current.delete(songKey);
          setPlayingSongKeys([...playingSongKeysRef.current]);
          mediaElement.currentTime = 0;
        }
        if (songKey === activeSongRef.current) {
          setPlaybackTime(0);
        }
      };
      playingSongKeysRef.current.add(songKey);
      setPlayingSongKeys([...playingSongKeysRef.current]);
      await mediaElement.play();
    } catch (error: unknown) {
      const playbackWasStillRequested = playingSongKeysRef.current.has(songKey);
      playingSongKeysRef.current.delete(songKey);
      setPlayingSongKeys([...playingSongKeysRef.current]);
      if (playbackWasStillRequested) {
        const detail = error instanceof Error ? error.message : 'The browser could not start this preview.';
        Alert.alert('Playback unavailable', detail);
      }
    }
  }

  const featuredSong = songList[0] ?? null;
  const currentSong = songList.find((song) => (song.id ?? song.title) === activeSong) ?? null;
  const playerSong = currentSong ?? featuredSong;
  const filteredSongs = songList.filter((song) => {
    const q = songQuery.trim().toLowerCase();
    if (!q) return true;
    return `${song.title} ${song.key ?? ''} ${song.status}`.toLowerCase().includes(q);
  });
  return (
    <Box className="song-library">
        <Box className="song-library-intro">
          <Box className="song-library-intro-mark">
            <Icon name="audio-lines-outline" size={23} color="#dedede" />
          </Box>
          <Box className="song-library-intro-copy">
            <Label className="song-library-intro-kicker">ELAYONE · GOSPEL MUSIC MINISTRY</Label>
            <Label className="song-library-intro-title">Song library</Label>
            <Label className="song-library-intro-caption">
              Search songs, check their key, and listen to a preview.
            </Label>
          </Box>
          <Box className="song-library-note" aria-hidden="true">
            <Icon name="musical-notes-outline" size={66} color="#ffffff" />
          </Box>
        </Box>
          <Box className="song-library-summary">
            <Label>{songList.length} {songList.length === 1 ? 'SONG' : 'SONGS'} IN YOUR LIBRARY</Label>
            <Label>{playingSongKeys.length}/2 PREVIEWS PLAYING</Label>
          </Box>
          <Box className="song-search" style={styles.songSearchWrap}>
            <Icon name="search-outline" size={18} color={COLORS.muted} />
            <TextField value={songQuery} onChangeText={setSongQuery} placeholder="Search songs, key, or status" placeholderTextColor={COLORS.muted} style={styles.songSearchInput} />
          </Box>
          {playerSong && (
            <Box className="song-player">
              <Box className="song-player-art" aria-hidden="true">
                <Box className="song-player-record" />
                <Label className="song-player-art-label">ELAYONE<br />SINGERS</Label>
                <Label className="song-player-art-index">SIDE A · {String(songList.indexOf(playerSong) + 1).padStart(2, '0')}</Label>
              </Box>
              <Box className="song-player-details">
                <Label className="song-player-eyebrow">{playingSongKeys.includes(activeSong ?? '') ? 'NOW PLAYING' : activeSong ? 'PAUSED' : 'A SONG FOR THE JOURNEY'}</Label>
                <Label className="song-player-title">{playerSong.title}</Label>
                <Label className="song-player-meta">{playerSong.key ?? 'Key not set'} <span>·</span> {playerSong.status}</Label>
                <Box className={`song-waveform${playingSongKeys.includes(activeSong ?? '') ? ' is-playing' : ''}`} aria-hidden="true">
                  {Array.from({ length: 18 }, (_, index) => <span key={index} />)}
                </Box>
              </Box>
              <Box className="song-player-controls">
                <ActionButton
                  className="song-main-play"
                  onPress={() => toggleSong(playerSong)}
                  accessibilityLabel={`${playingSongKeys.includes(playerSong.id ?? playerSong.title) ? 'Pause' : 'Play'} ${playerSong.title}`}
                >
                  <Icon name={playingSongKeys.includes(playerSong.id ?? playerSong.title) ? 'pause-circle-outline' : 'play-circle-outline'} size={27} color="#171513" />
                </ActionButton>
                <Box className="song-timeline">
                  <input
                    aria-label={`Seek ${playerSong.title}`}
                    type="range"
                    min={0}
                    max={Number.isFinite(playbackDuration) ? playbackDuration : 0}
                    step={0.1}
                    value={Math.min(playbackTime, playbackDuration || 0)}
                    disabled={!activeSong || !playbackDuration}
                    onChange={(event) => {
                      const nextTime = Number(event.currentTarget.value);
                      const audio = activeSong ? soundRefs.current.get(activeSong) : undefined;
                      if (audio) audio.currentTime = nextTime;
                      setPlaybackTime(nextTime);
                    }}
                  />
                  <Box className="song-time-labels">
                    <Label>{formatPlaybackTime(playbackTime)}</Label>
                    <Label>{formatPlaybackTime(playbackDuration)}</Label>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
          <Box className="song-list-heading">
            <Label>IN THE LIBRARY</Label>
            <Label>{songList.length} {songList.length === 1 ? 'SONG' : 'SONGS'}</Label>
          </Box>
          {filteredSongs.length === 0 ? (
            <Box style={styles.emptyState}>
              <Label style={styles.emptyStateTitle}>No songs found</Label>
              <Label style={styles.emptyStateText}>Try a different title, key, or status.</Label>
            </Box>
          ) : filteredSongs.map((song) => (
            <Box key={song.title + (song.id ?? '')} className={`song-row${playingSongKeys.includes(song.id ?? song.title) ? ' is-active' : ''}`}>
              <Box className="song-row-main">
                <Box className="song-row-art" aria-hidden="true">
                  <Label>{String(songList.indexOf(song) + 1).padStart(2, '0')}</Label>
                </Box>
                <Box className="song-row-info">
                  <Label className="song-title">{song.title}</Label>
                  <Label className="song-meta">{song.key ?? 'No key'} <span>·</span> {song.status}</Label>
                </Box>
              </Box>
              <ActionButton onPress={() => toggleSong(song)} accessibilityLabel={`${playingSongKeys.includes(song.id ?? song.title) ? 'Pause' : 'Play'} ${song.title}`}>
                <Icon name={playingSongKeys.includes(song.id ?? song.title) ? 'pause-circle-outline' : 'play-circle-outline'} size={24} color={COLORS.ink} />
              </ActionButton>
            </Box>
          ))}
    </Box>
  );
}
