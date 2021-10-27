import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import InboxIcon from "@material-ui/icons/Inbox";
import EditIcon from "@material-ui/icons/Edit";

// fake data generator
// const getItems = (count) =>
//   Array.from({ length: count }, (v, k) => k).map((k) => ({
//     id: `item-${k}`,
//     primary: `item ${k}`,
//     secondary: k % 2 === 0 ? `Whatever for ${k}` : undefined,
//   }));

const elements = [
  { id: "one", content: "one" },
  { id: "two", content: "two" },
  { id: "three", content: "three" },
  { id: "four", content: "four" },
];

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: "rgb(235,235,235)",
  }),
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
});

class TestDnD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: elements,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const elements = reorder(
      this.state.elements,
      result.source.index,
      result.destination.index
    );

    this.setState({
      elements,
    });
  }

  render() {
    return (
      <Paper style={{ marginTop: 50 }}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <RootRef rootRef={provided.innerRef}>
                <Grid style={getListStyle(snapshot.isDraggingOver)}>
                  {this.state.elements.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <ListItem
                          ContainerComponent="li"
                          ContainerProps={{ ref: provided.innerRef }}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <ListItemIcon>
                            <InboxIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={item.content}
                            secondary={item.id}
                          />
                          <ListItemSecondaryAction>
                            <IconButton>
                              <EditIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Grid>
              </RootRef>
            )}
          </Droppable>
        </DragDropContext>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TestDnD);

// {(provided, snapshot) => (
//   <ListItem
//     ContainerComponent="li"
//     ContainerProps={{ ref: provided.innerRef }}
//     {...provided.draggableProps}
//     {...provided.dragHandleProps}
//     style={getItemStyle(
//       snapshot.isDragging,
//       provided.draggableProps.style
//     )}
//   >
//     <ListItemIcon>
//       <InboxIcon />
//     </ListItemIcon>
//     <ListItemText
//       primary={item.content}
//       secondary={item.id}
//     />
//     <ListItemSecondaryAction>
//       <IconButton>
//         <EditIcon />
//       </IconButton>
//     </ListItemSecondaryAction>
//   </ListItem>
// )}
