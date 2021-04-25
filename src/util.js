export const playAudio = (isPlaying, audioReference) => {
  if (isPlaying) {
    const playPromise = audioReference.current.play();
    if (playPromise !== undefined) {
      playPromise.then((audio) => {
        audioReference.current.play();
      });
    }
  }
};
