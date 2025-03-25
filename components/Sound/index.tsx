import React, { useEffect } from "react";
import Sound from "react-native-sound";

interface SoundProps {
  sunkSoundRef: React.MutableRefObject<Sound | null>;
  clickSoundRef: React.MutableRefObject<Sound | null>;
  lossSoundRef: React.MutableRefObject<Sound | null>;
  winSoundRef: React.MutableRefObject<Sound | null>;
}

const SoundComponent: React.FC<SoundProps> = ({
  sunkSoundRef,
  clickSoundRef,
  lossSoundRef,
  winSoundRef,
}) => {
  useEffect(() => {
    // Enable playback in silence mode
    Sound.setCategory("Playback");

    // Initialize sound files
    sunkSoundRef.current = new Sound(
      "ship_sunk.wav",
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log("Failed to load ship_sunk.wav", error);
        }
      }
    );

    clickSoundRef.current = new Sound(
      "click.wav",
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log("Failed to load click.wav", error);
        }
      }
    );

    lossSoundRef.current = new Sound("lose.wav", Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log("Failed to load lose.wav", error);
      }
    });

    winSoundRef.current = new Sound("win.wav", Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log("Failed to load win.wav", error);
      }
    });

    // Cleanup function
    return () => {
      sunkSoundRef.current?.release();
      clickSoundRef.current?.release();
      lossSoundRef.current?.release();
      winSoundRef.current?.release();
    };
  }, [sunkSoundRef, clickSoundRef, lossSoundRef, winSoundRef]);

  return null;
};

export default SoundComponent;
