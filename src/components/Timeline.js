import React from 'react';
import {
    assignLanes,
    calculateDateRange,
    calculateItemStyles,
    formatDate,
    generateTimelineMarkers
} from '../utils/index.js';

const Timeline = ({ items }) => {
    const { minDate, maxDate, totalDays } = calculateDateRange(items);

    const lanes = assignLanes(items);

    const markers = generateTimelineMarkers(minDate, maxDate, totalDays);

    return (
        <div className="timeline-container">
            <div className="timeline-header">
                <h2>Project Timeline</h2>
                <div className="timeline-info">
                    {items.length} items • {lanes.length} lanes • {formatDate(minDate)} to {formatDate(maxDate)}
                </div>
            </div>

            <div className="timeline-wrapper">
                <div className="timeline-axis">
                    {markers.map((marker) => (
                        <div
                            key={marker.key}
                            className="timeline-marker"
                            style={{ left: `${marker.position}%` }}
                        >
                            <div className="timeline-marker-line"></div>
                            <div className="timeline-marker-label">
                                {formatDate(marker.date)}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="timeline-lanes">
                    {lanes.map((lane, laneIndex) => (
                        <div key={laneIndex} className="timeline-lane">
                            {lane.map((item) => {
                                const styles = calculateItemStyles(item, minDate, totalDays);
                                const isShortItem = parseFloat(styles.width) < 15;
                                const isLongItem = parseFloat(styles.width) > 25;

                                return (
                                    <div
                                        key={item.id}
                                        className={`timeline-item ${isShortItem ? 'timeline-item--short' : ''} ${isLongItem ? 'timeline-item--long' : ''}`}
                                        style={styles}
                                        title={`${item.name}\nDuration: ${item.start} → ${item.end}`}
                                    >
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
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timeline;