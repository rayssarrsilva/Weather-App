import "./style/theme.css";
import { showHome } from "./router.js";
import { initPreferences } from "./utils/preferences.js";

initPreferences();
showHome();