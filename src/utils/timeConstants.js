/**
* Time constants used throughout the timeline application
*/

// Time conversion constants
export const TIME_CONSTANTS = {
    MILLISECONDS_PER_SECOND: 1000,
    SECONDS_PER_MINUTE: 60,
    MINUTES_PER_HOUR: 60,
    HOURS_PER_DAY: 24,
    MILLISECONDS_PER_DAY: 1000 * 60 * 60 * 24,
};

// Timeline display constants
export const TIMELINE_CONSTANTS = {
    MINIMUM_ITEM_WIDTH_PERCENT: 1.5,
    LANE_HEIGHT: 60,
    LANE_MARGIN_BOTTOM: 12,
    ITEM_HEIGHT: 44,
    ITEM_TOP_OFFSET: 8,
    AXIS_HEIGHT: 60,
};

// Date formatting constants
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