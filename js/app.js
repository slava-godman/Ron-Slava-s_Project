let calendar;

document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');

  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'timeGridWeek',
    editable: true,
    selectable: true,
    nowIndicator: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek'
    },
    events: [
      { title: 'Angular Meetup', start: '2025-04-20', end: '2025-04-21', color: '#95ec69' },
      { title: 'JS Conference', start: '2025-04-22', color: '#3b82f6' },
      { title: 'Meeting', start: '2025-04-23T08:00:00', color: '#60a5fa' },
    ],
    eventDrop(info) {
      alert(`Moved "${info.event.title}" to ${info.event.start.toLocaleString()}`);
    },
    eventClick(info) {
      if (confirm(`Delete "${info.event.title}"?`)) {
        info.event.remove();
      }
    }
  });

  calendar.render();
});

function addEvent() {
  const title = prompt("Event Title:");
  if (!title) return;

  const dateStr = prompt("Start Date & Time (e.g., 2025-04-23T14:00):");
  if (!dateStr || isNaN(new Date(dateStr))) {
    alert("Invalid date format.");
    return;
  }

  calendar.addEvent({
    title: title,
    start: dateStr,
    color: '#34d399'
  });
}
