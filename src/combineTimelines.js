/* global TimelineMax */

const combineTimelines = (timelines) => {
  const masterTimeline = new TimelineMax()
  timelines.forEach(
    timeline => masterTimeline.add(timeline, 0)
  )
  return masterTimeline
}

export default combineTimelines

