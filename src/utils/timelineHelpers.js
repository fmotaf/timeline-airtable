import { TIME_CONSTANTS, TIMELINE_CONSTANTS, DATE_FORMAT_OPTIONS } from './timeConstants.js';

/**
 * Calculate the date range for a timeline
 * @param {Array} items - Array of timeline items with start and end dates
 * @returns {Object} Object containing minDate, maxDate, and totalDays
 */
export const calculateDateRange = (items) => {
    const dates = items.flatMap(item => [new Date(item.start), new Date(item.end)]);
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    const totalDays = Math.ceil((maxDate - minDate) / TIME_CONSTANTS.MILLISECONDS_PER_DAY) + 1;

    return { minDate, maxDate, totalDays };
};

/**
 * Calculate position and width styles for timeline items
 * @param {Object} item - Timeline item with start and end dates
 * @param {Date} minDate - Minimum date in the timeline
 * @param {number} totalDays - Total duration of the timeline in days
 * @returns {Object} CSS styles object with left and width properties
 */
export const calculateItemStyles = (item, minDate, totalDays) => {
    const startDate = new Date(item.start);
    const endDate = new Date(item.end);

    const daysFromStart = Math.ceil((startDate - minDate) / TIME_CONSTANTS.MILLISECONDS_PER_DAY);
    const left = (daysFromStart / totalDays) * 100;

    const itemDurationDays = Math.ceil((endDate - startDate) / TIME_CONSTANTS.MILLISECONDS_PER_DAY) + 1;
    const width = Math.max((itemDurationDays / totalDays) * 100, TIMELINE_CONSTANTS.MINIMUM_ITEM_WIDTH_PERCENT);

    return { left: `${left}%`, width: `${width}%` };
};

/**
 * Format date for display
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
    return date.toLocaleDateString('en-US', DATE_FORMAT_OPTIONS.MONTH_SHORT);
};

/**
 * Generate timeline axis markers
 * @param {Date} minDate - Minimum date in the timeline
 * @param {Date} maxDate - Maximum date in the timeline
 * @param {number} totalDays - Total duration of the timeline in days
 * @returns {Array} Array of marker data objects
 */
export const generateTimelineMarkers = (minDate, maxDate, totalDays) => {
    const markers = [];

    const currentDate = new Date(minDate.getFullYear(), minDate.getMonth(), 1);

    while (currentDate <= maxDate) {
        const daysFromStart = Math.ceil((currentDate - minDate) / TIME_CONSTANTS.MILLISECONDS_PER_DAY);
        const position = Math.max(0, (daysFromStart / totalDays) * 100);

        if (position <= 100) {
            markers.push({
                date: new Date(currentDate),
                position,
                key: currentDate.toISOString()
            });
        }
        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return markers;
};