import { proxyOwm } from "../owm.js";

export const GET = (request) => proxyOwm(request, "weather");
