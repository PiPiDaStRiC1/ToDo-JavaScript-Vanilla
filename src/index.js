import { attachEvents } from "./dom/events";
import { attachDragEvents } from "./dom/dragEvents.js";
import { elements } from './dom/elements.js';
import { showTodosAndChangeTheme } from "./utils/theme.js";
import { handleMediaMobile, handleMediaTablet } from "./utils/media.js";

(function appInit() {
    document.addEventListener('DOMContentLoaded', showTodosAndChangeTheme);
    attachEvents();
    attachDragEvents();

    // Initial Media Query Check
    elements.mediaQueryMobile.matches ? handleMediaMobile(elements.mediaQueryMobile) : null; 
    // mobile design update at once
    elements.mediaQueryTablet.matches ? handleMediaTablet(elements.mediaQueryTablet) : null; 
    // tablet design update at once
})();