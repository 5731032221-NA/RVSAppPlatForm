import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

const dataEvent = [
  { title: "ROOM8050", date: "2021-09-09" },
  { title: "ROOM8067", date: "2021-09-15" },
];

const Calendar = () => {
  return (
    <Container maxWidth="xl" disableGutters>
      <Paper elevation={3} style={{ padding: 40 }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          weekends={true}
          events={dataEvent}
          droppable={true}
          draggable={true}
        />
      </Paper>
    </Container>
  );
};

export default Calendar;
