import { Sun } from "./icons/sun";
import { Moon } from "./icons/moon";
import { CloudSun } from "./icons/cloud-sun";
import { CloudMoon } from "./icons/cloud-moon";
import { CloudRain } from "./icons/cloud-rain";
import { CloudLightning } from "./icons/cloud-lightning";
import { CloudSnow } from "./icons/cloud-snow";
import { Waves } from "./icons/waves";

/** Icono animado para cada cielo: [día, noche] */
export const SKY_ICONS = {
  clear: [Sun, Moon],
  clouds: [CloudSun, CloudMoon],
  rain: [CloudRain, CloudRain],
  storm: [CloudLightning, CloudLightning],
  snow: [CloudSnow, CloudSnow],
  mist: [Waves, Waves],
};
