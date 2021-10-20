import React from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const elements = [
  { id: "one", content: "one" },
  { id: "two", content: "two" },
  { id: "three", content: "three" },
  { id: "four", content: "four" },
];

export const TestDnD = (props) => {
  const [items, setItems] = useState(elements);

  return (
    <Container maxWidth="xl" disableGutters style={{ marginTop: 50 }}>
      <Paper>
        test
        
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TestDnD);
