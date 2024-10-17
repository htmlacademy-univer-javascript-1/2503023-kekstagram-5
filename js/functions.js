function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}
function isMeetingWithinWorkday(startWork, endWork, startMeeting, duration) {
  const startWorkMinutes = timeToMinutes(startWork);
  const endWorkMinutes = timeToMinutes(endWork);
  const startMeetingMinutes = timeToMinutes(startMeeting);
  const endMeetingMinutes = startMeetingMinutes + duration;
  return startMeetingMinutes >= startWorkMinutes && endMeetingMinutes <= endWorkMinutes;
}
console.log(isMeetingWithinWorkday('08:00', '17:30', '14:00', 90));  // true
console.log(isMeetingWithinWorkday('8:0', '10:0', '8:0', 120));      // true
console.log(isMeetingWithinWorkday('08:00', '14:30', '14:00', 90));  // false
console.log(isMeetingWithinWorkday('14:00', '17:30', '08:0', 90));   // false
console.log(isMeetingWithinWorkday('8:00', '17:30', '08:00', 900));  // false

