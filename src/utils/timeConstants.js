/**
* Time constants used throughout the timeline application
*/

export const TIME_CONSTANTS = {
    MILLISECONDS_PER_SECOND: 1000,
    SECONDS_PER_MINUTE: 60,
    MINUTES_PER_HOUR: 60,
    HOURS_PER_DAY: 24,
    MILLISECONDS_PER_DAY: 1000 * 60 * 60 * 24,
};

export const TIMELINE_CONSTANTS = {
    MINIMUM_ITEM_WIDTH_PERCENT: 8,
    LANE_HEIGHT: 80,
    LANE_MARGIN_BOTTOM: 16,
    ITEM_HEIGHT: 60,
    ITEM_TOP_OFFSET: 10,
    AXIS_HEIGHT: 70,
};

export const DATE_FORMAT_OPTIONS = {
    MONTH_SHORT: {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    },
    MONTH_LONG: {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    },
    YEAR_ONLY: {
        year: 'numeric'
    },
    MONTH_YEAR: {
        month: 'short',
        year: 'numeric'
    }
};

export const RESPONSIVE_BREAKPOINTS = {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1200
};

export const ANIMATION_CONSTANTS = {
    HOVER_TRANSITION_DURATION: '0.2s',
    SCROLL_BEHAVIOR: 'smooth',
    ITEM_HOVER_TRANSFORM: 'translateY(-2px)'
};

export const ZOOM_CONSTANTS = {
    MIN_ZOOM: 0.5,
    MAX_ZOOM: 4,
    ZOOM_STEP: 0.25,
    DEFAULT_ZOOM: 1
};

// Color constants for better contrast and accessibility
export const COLOR_CONSTANTS = {
    TIMELINE_ITEM_GRADIENTS: [
        'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
        'linear-gradient(135deg, #E91E63 0%, #C2185B 100%)',
        'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)',
        'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
        'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
        'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
        'linear-gradient(135deg, #795548 0%, #5D4037 100%)',
        'linear-gradient(135deg, #607D8B 0%, #455A64 100%)'
    ],
    TEXT_SHADOW: '0 2px 4px rgba(0, 0, 0, 0.5)',
    CONTENT_SHADOW: '0 2px 4px rgba(0, 0, 0, 0.4)'
};