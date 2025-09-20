import React, { useState, useEffect } from 'react';
import {
    assignLanes,
    calculateDateRange,
    calculateItemStyles,
    formatDate,
    generateTimelineMarkers,
    ZOOM_CONSTANTS
} from '../utils/index.js';

const Timeline = ({ items }) => {
    // Zoom state management
    const [zoomLevel, setZoomLevel] = useState(ZOOM_CONSTANTS.DEFAULT_ZOOM);
    
    const { minDate, maxDate, totalDays } = calculateDateRange(items);

    const lanes = assignLanes(items);

    const markers = generateTimelineMarkers(minDate, maxDate, totalDays, zoomLevel);
    
    // Zoom functions
    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + ZOOM_CONSTANTS.ZOOM_STEP, ZOOM_CONSTANTS.MAX_ZOOM));
    };
    
    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev - ZOOM_CONSTANTS.ZOOM_STEP, ZOOM_CONSTANTS.MIN_ZOOM));
    };
    
    const handleZoomReset = () => {
        setZoomLevel(ZOOM_CONSTANTS.DEFAULT_ZOOM);
    };
    
    // Keyboard shortcuts for zoom
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey || event.metaKey) {
                if (event.key === '=' || event.key === '+') {
                    event.preventDefault();
                    handleZoomIn();
                } else if (event.key === '-') {
                    event.preventDefault();
                    handleZoomOut();
                } else if (event.key === '0') {
                    event.preventDefault();
                    handleZoomReset();
                }
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="timeline-container">
            <div className="timeline-header">
                <div className="timeline-header-left">
                    <h2>Project Timeline</h2>
                    <div className="timeline-info">
                        {items.length} items • {lanes.length} lanes • {formatDate(minDate)} to {formatDate(maxDate)}
                        <span className="timeline-shortcuts" title="Keyboard shortcuts: Ctrl/Cmd + (+/-/0) to zoom">
                            • Use Ctrl/Cmd + (+/-/0) to zoom
                        </span>
                    </div>
                </div>
                <div className="timeline-header-right">
                    <div className="timeline-zoom-controls">
                        <button 
                            className="zoom-btn zoom-btn--out" 
                            onClick={handleZoomOut}
                            disabled={zoomLevel <= ZOOM_CONSTANTS.MIN_ZOOM}
                            title="Zoom Out"
                        >
                            −
                        </button>
                        <span className="zoom-level">
                            {Math.round(zoomLevel * 100)}%
                        </span>
                        <button 
                            className="zoom-btn zoom-btn--in" 
                            onClick={handleZoomIn}
                            disabled={zoomLevel >= ZOOM_CONSTANTS.MAX_ZOOM}
                            title="Zoom In"
                        >
                            +
                        </button>
                        <button 
                            className="zoom-btn zoom-btn--reset" 
                            onClick={handleZoomReset}
                            title="Reset Zoom"
                        >
                            ⌂
                        </button>
                    </div>
                </div>
            </div>

            <div className="timeline-wrapper">
                <div className="timeline-content" style={{ width: `${zoomLevel * 100}%` }}>
                    {/* Timeline axis */}
                    <div className="timeline-axis">
                        {markers.map((marker) => (
                            <div
                                key={marker.key}
                                className={`timeline-marker ${marker.isMinor ? 'timeline-marker--minor' : ''}`}
                                style={{ left: `${marker.position}%` }}
                            >
                                <div className="timeline-marker-line"></div>
                                <div className="timeline-marker-label">
                                    {marker.isMinor ? 
                                        marker.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) :
                                        formatDate(marker.date)
                                    }
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Timeline lanes */}
                    <div className="timeline-lanes">
                        {lanes.map((lane, laneIndex) => (
                            <div key={laneIndex} className="timeline-lane">
                                {lane.map((item) => {
                                    const styles = calculateItemStyles(item, minDate, totalDays, zoomLevel);
                                    const actualWidth = parseFloat(styles.width) * zoomLevel; // Calculate actual pixel width percentage
                                    const isShortItem = actualWidth < 8; // Items less than 8% actual width are short
                                    const isLongItem = actualWidth > 20; // Items more than 20% actual width are long
                                    const showText = actualWidth > 3; // Only show text if item is wide enough

                                    return (
                                        <div
                                            key={item.id}
                                            className={`timeline-item ${isShortItem ? 'timeline-item--short' : ''} ${isLongItem ? 'timeline-item--long' : ''} ${!showText ? 'timeline-item--no-text' : ''}`}
                                            style={styles}
                                            title={`${item.name}\nDuration: ${item.start} → ${item.end}`}
                                        >
                                            {showText && (
                                                <div className="timeline-item-content">
                                                    <div className="timeline-item-name" title={item.name}>
                                                        {item.name}
                                                    </div>
                                                    {!isShortItem && (
                                                        <div className="timeline-item-dates">
                                                            {item.start} → {item.end}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timeline;