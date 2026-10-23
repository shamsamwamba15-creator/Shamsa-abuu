import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music2, ChevronDown, ChevronUp } from 'lucide-react';
import { weddingAudio, PLAYLIST } from '../services/audioPlayer';

export const MusicPlayerDock: React.FC = () => {
  const [audioState, setAudioState] = useState(weddingAudio.getState());
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const unsub = weddingAudio.subscribe((state) => {
      setAudioState(weddingAudio.getState());
    });
    return unsub;
  }, []);

  const currentTrack = PLAYLIST[audioState.trackIndex];

  return (
    <aside
      aria-label="Wedding Music Soundtrack"
      className="fixed bottom-4 left-4 z-30 transition-all duration-300"
    >
      <div className="bg-[#ffffff]/95 backdrop-blur-xl border border-[#d7c6a9] rounded-2xl shadow-xl p-2.5 sm:p-3 text-[#1d2c20] max-w-sm sm:w-80">
        {/* Header / Collapse Row */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${audioState.isPlaying ? 'bg-[#768e77] text-white' : 'bg-[#f0f4f0] text-[#768e77]'}`}>
              <Music2 className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#768e77] truncate">
              Acoustic Maqam Melodies
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-[#587059] hover:text-[#1d2c20] p-1 rounded-md hover:bg-[#f5efe3] transition cursor-pointer"
            title={isCollapsed ? 'Expand music player' : 'Collapse music player'}
          >
            {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Collapsed vs Expanded body */}
        {!isCollapsed ? (
          <div>
            {/* Track Info */}
            <div className="mb-2.5">
              <h5 className="font-serif text-xs sm:text-sm font-medium text-[#1d2c20] truncate">
                {currentTrack.title}
              </h5>
              <div className="flex items-center justify-between text-[10px] text-[#587059]">
                <span className="truncate">{currentTrack.composer}</span>
                <span className="text-[#768e77] shrink-0 font-medium">{currentTrack.mood}</span>
              </div>
            </div>

            {/* Audio Waveform visualization indicator */}
            <div className="flex items-center gap-1 h-3 mb-2.5 px-0.5">
              {[4, 10, 6, 12, 8, 14, 5, 11, 7, 9, 13, 6, 8, 12].map((height, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    audioState.isPlaying
                      ? 'bg-[#768e77]'
                      : 'bg-[#bcc8bc]'
                  }`}
                  style={{
                    height: audioState.isPlaying ? `${height}px` : '3px',
                    opacity: audioState.isPlaying ? 0.9 : 0.35,
                  }}
                />
              ))}
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between pt-1 border-t border-[#f0f4f0]">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => weddingAudio.prevTrack()}
                  className="p-1 text-[#587059] hover:text-[#1d2c20] hover:bg-[#f5efe3] rounded-lg transition cursor-pointer"
                  title="Previous track"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => weddingAudio.togglePlay()}
                  className="w-7 h-7 rounded-full bg-[#768e77] hover:bg-[#587059] text-white flex items-center justify-center transition cursor-pointer shadow-sm"
                  title={audioState.isPlaying ? 'Pause' : 'Play'}
                >
                  {audioState.isPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-white" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => weddingAudio.nextTrack()}
                  className="p-1 text-[#587059] hover:text-[#1d2c20] hover:bg-[#f5efe3] rounded-lg transition cursor-pointer"
                  title="Next track"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-1.5 w-24">
                <button
                  type="button"
                  onClick={() => weddingAudio.setVolume(audioState.volume > 0 ? 0 : 0.4)}
                  className="text-[#587059] hover:text-[#1d2c20]"
                >
                  {audioState.volume === 0 ? (
                    <VolumeX className="w-3 h-3" />
                  ) : (
                    <Volume2 className="w-3 h-3 text-[#768e77]" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={audioState.volume}
                  onChange={(e) => weddingAudio.setVolume(parseFloat(e.target.value))}
                  className="w-full h-1 bg-[#bcc8bc] rounded-lg appearance-none cursor-pointer accent-[#768e77]"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] text-[#1d2c20] truncate font-serif font-medium">{currentTrack.title}</span>
            <button
              type="button"
              onClick={() => weddingAudio.togglePlay()}
              className="w-6 h-6 rounded-full bg-[#768e77] text-white flex items-center justify-center shrink-0 shadow-sm"
            >
              {audioState.isPlaying ? <Pause className="w-3 h-3 fill-white" /> : <Play className="w-3 h-3 fill-white ml-0.5" />}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
