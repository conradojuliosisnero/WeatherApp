import { proxyOwm } from "../owm.js";

// Pronóstico de 5 días en tramos de 3 horas (plan gratuito de OpenWeatherMap)
export const GET = (request) => proxyOwm(request, "forecast");
