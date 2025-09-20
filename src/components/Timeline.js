import React from 'react';
import assignLanes from '../utils/assignLanes.js';
import {
    calculateDateRange,
    calculateItemStyles,
    formatDate,
    generateTimelineMarkers
} from '../utils/timelineHelpers.js';

const Timeline = ({ items }) => {
    // Calculate date range
    const { minDate, maxDate, totalDays } = calculateDateRange(items);

    // Assign items to lanes
    const lanes = assignLanes(items);

    // Generate timeline axis markers
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
                {/* Timeline axis */}
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

                {/* Timeline lanes */}
                <div className="timeline-lanes">
                    {lanes.map((lane, laneIndex) => (
                        <div key={laneIndex} className="timeline-lane">
                            {lane.map((item) => {
                                const styles = calculateItemStyles(item, minDate, totalDays);
                                return (
                                    <div
                                        key={item.id}
                                        className="timeline-item"
                                        style={styles}
                                        title={`${item.name}\n${item.start} to ${item.end}`}
                                    >
                                        <div className="timeline-item-content">
                                            <span className="timeline-item-name">{item.name}</span>
                                            <span className="timeline-item-dates">
                                                {item.start} → {item.end}
                                            </span>
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