import React, { useState, useEffect } from 'react';
import {
    assignLanes,
    calculateDateRange,
    calculateItemStyles,
    formatDate,
    generateTimelineMarkers,
    ZOOM_CONSTANTS
} from '../utils/index.js';

const Timeline = ({ items: initialItems }) => {
    // State management
    const [items, setItems] = useState(initialItems);
    const [zoomLevel, setZoomLevel] = useState(ZOOM_CONSTANTS.DEFAULT_ZOOM);
    const [editingItemId, setEditingItemId] = useState(null);
    const [editingValue, setEditingValue] = useState('');
    
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
    
    // Editing functions
    const startEditing = (item) => {
        setEditingItemId(item.id);
        setEditingValue(item.name);
    };

    const saveEdit = () => {
        if (editingValue.trim()) {
            setItems(items.map(item => 
                item.id === editingItemId 
                    ? { ...item, name: editingValue.trim() }
                    : item
            ));
        }
        setEditingItemId(null);
        setEditingValue('');
    };

    const cancelEdit = () => {
        setEditingItemId(null);
        setEditingValue('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            cancelEdit();
        }
    };

    // Keyboard shortcuts for zoom
    useEffect(() => {
        const handleGlobalKeyDown = (event) => {
            // Only handle zoom shortcuts if not editing
            if (editingItemId) return;
            
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
        
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [editingItemId]);

    return (
        <div className="timeline-container">
            <div className="timeline-header">
                <div className="timeline-header-left">
                    <h2>Project Timeline</h2>
                                        <div className="timeline-info">
                        {items.length} items • {lanes.length} lanes • {formatDate(minDate)} to {formatDate(maxDate)}
                        <span className="timeline-shortcuts" title="Editing: Double-click items to edit names, or hover and click the edit icon">
                            • Double-click to edit item names
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
                                    const isShortItem = actualWidth < 6; // Items less than 6% actual width are short
                                    const isLongItem = actualWidth > 20; // Items more than 20% actual width are long
                                    const showText = actualWidth > 2; // Show text for items wider than 2%

                                    return (
                                        <div
                                            key={item.id}
                                            className={`timeline-item ${isShortItem ? 'timeline-item--short' : ''} ${isLongItem ? 'timeline-item--long' : ''} ${!showText ? 'timeline-item--no-text' : ''} ${editingItemId === item.id ? 'editing' : ''}`}
                                            style={styles}
                                            title={editingItemId === item.id ? '' : `${item.name}\nDuration: ${item.start} → ${item.end}\nDouble-click to edit`}
                                        >
                                            {showText && (
                                                <div className="timeline-item-content">
                                                    {editingItemId === item.id ? (
                                                        <>
                                                            <input
                                                                className="timeline-item-edit-input"
                                                                value={editingValue}
                                                                onChange={(e) => setEditingValue(e.target.value)}
                                                                onKeyDown={handleKeyDown}
                                                                onBlur={saveEdit}
                                                                autoFocus
                                                                placeholder="Enter item name..."
                                                            />
                                                            <div className="timeline-item-edit-controls">
                                                                <button className="edit-btn save" onClick={saveEdit}>
                                                                    ✓
                                                                </button>
                                                                <button className="edit-btn cancel" onClick={cancelEdit}>
                                                                    ✕
                                                                </button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div 
                                                                className="timeline-item-name" 
                                                                title={`${item.name} (double-click to edit)`}
                                                                onDoubleClick={() => startEditing(item)}
                                                            >
                                                                {item.name}
                                                            </div>
                                                            <div className="edit-indicator" onClick={() => startEditing(item)}></div>
                                                        </>
                                                    )}
                                                    {!isShortItem && editingItemId !== item.id && (
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