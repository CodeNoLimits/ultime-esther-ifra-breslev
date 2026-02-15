export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const APP_TITLE =
  import.meta.env.VITE_APP_TITLE || "Esther Ifrah - Littérature Breslev";

export const APP_LOGO = "/logo-esther-ifrah.png";

export function getLoginUrl() {
  return "/connexion";
}
