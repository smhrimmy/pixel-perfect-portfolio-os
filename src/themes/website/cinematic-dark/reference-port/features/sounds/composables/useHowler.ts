import gsap from "gsap";
import { lerp } from "../../../utils/math";
import { Howler } from "howler";
import { isFeatureEnabled } from "../../../utils/features";
import { tick as contactTick } from "../core/contact";
import { isTouch } from "../../../composables/useAgent";
import { stopSnoreRepetition } from "../core/contact";
import { tick as roomTick } from "../core/room";
import { sounds } from "../definitions/sounds";
import { getSoundsHowl } from "../utils/sounds";
import type { SoundKey } from "../types";

export const howlerUnlocked = { value: false };
export const soundsEnabled = { value: false };

Howler.volume(0);

const enabledVolume = { value: 0 };

const handleUnlocked = () => {
  howlerUnlocked.value = true;
  if (isTouch.value) {
    soundsEnabled.value = false;
    return;
  }
  const storeItem = localStorage.getItem("portfolio-soundsEnabled");
  if (storeItem) {
    soundsEnabled.value = storeItem === "true";
  } else {
    soundsEnabled.value = true;
    localStorage.setItem("portfolio-soundsEnabled", "true");
  }
  enabledVolume.value = soundsEnabled.value ? 1 : 0;
};

const tick = () => {
  if (!howlerUnlocked.value) {
    if (Howler.ctx.state !== "running") return;
    handleUnlocked();
  } else if (!isTouch.value) {
    contactTick();
    roomTick();
    const currentVolume = Howler.volume();
    if (currentVolume > 0.99 && enabledVolume.value === 1) {
      return;
    }
    const speed = enabledVolume.value === 1 ? 0.01 : 0.05;
    Howler.volume(lerp(currentVolume, enabledVolume.value, speed));
  }
};

const handleVisibilityChange = () => {
  Howler.mute(document.visibilityState === "hidden");
};

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.code === "KeyM" && !isTouch.value) {
    soundsEnabled.value = !soundsEnabled.value;
    enabledVolume.value = soundsEnabled.value ? 1 : 0;
    localStorage.setItem("portfolio-soundsEnabled", soundsEnabled.value.toString());
  }
};

const loadAllSounds = () => {
  for (const sound of Object.keys(sounds) as SoundKey[]) {
    const howl = getSoundsHowl(sound);
    if (howl) {
      howl.load();
    }
  }
};

export const initHowler = () => {
  if (!isFeatureEnabled("sounds")) return;
  Howler.volume(0);

  if (howlerUnlocked.value) {
    soundsEnabled.value = localStorage.getItem("portfolio-soundsEnabled") === "true";
    enabledVolume.value = soundsEnabled.value ? 1 : 0;
  }

  gsap.ticker.add(tick);
  window.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("keydown", handleKeyPress);

  if (!isTouch.value) {
    loadAllSounds();
  }
};

export const destroyHowler = () => {
  if (!isFeatureEnabled("sounds")) return;
  gsap.ticker.remove(tick);
  window.removeEventListener("visibilitychange", handleVisibilityChange);
  window.removeEventListener("keydown", handleKeyPress);
  stopSnoreRepetition();
};
