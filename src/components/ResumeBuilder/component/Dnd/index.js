import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import equal from 'deep-equal';
import { Tooltip } from 'react-tippy';

import styles from './dnd.module.scss';
import { Util } from 'components/ResumeBuilder/lib';

const getDragIconStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    width: '26px',
    height: '26px',
    background: '#03a9f4',
    position: 'absolute',
    borderRadius: '100%',
    top: -13,
    right: 30,
});
const getAddIconStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    width: '26px',
    height: '26px',
    background: '#03a9f4',
    position: 'absolute',
    borderRadius: '100%',
    top: -13,
    right: 0,
    cursor: 'pointer',
});
const getRemoveIconStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    width: '26px',
    height: '26px',
    background: '#03a9f4',
    position: 'absolute',
    borderRadius: '100%',
    top: -13,
    right: 60,
    cursor: 'pointer',
});
const getdragedStyle = (isDragging) => ({
    position: 'relative',
    // transform: isDragging ? 'scale(1.07)' : 'scale(1)',
    'WebkitBoxShadow': isDragging ? '0px 0px 24px 0px rgba(0,0,0,0.16)' : 'none',
    'MozBoxShadow': isDragging ? '0px 0px 24px 0px rgba(0,0,0,0.16)' : 'none',
    'boxShadow': isDragging ? '0px 0px 24px 0px rgba(0,0,0,0.16)' : 'none',
});

const getListStyle = (isDraggingOver) => ({
    'WebkitBoxShadow': isDraggingOver ? 'inset 0px 0px 18px 0px rgba(0,0,0,0.08)' : 'none',
    'MozBoxShadow': isDraggingOver ? 'inset 0px 0px 18px 0px rgba(0,0,0,0.08)' : 'none',
    'boxShadow': isDraggingOver ? 'inset 0px 0px 18px 0px rgba(0,0,0,0.08)' : 'none',
    background: isDraggingOver ? 'rgba(250,250,250,1)' : '#fff',
});

class Dnd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            windowReady: false
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        // if (!equal(props.data.length, state.data.length)) {
        if (!equal(props.data, state.data)) {
            return {
                data: props.data,
            };
        }
        return true;
    }

    // a little function to help us with reordering the result
    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const data = this.reorder(this.state.data, result.source.index, result.destination.index);

        if (!equal(this.state.data, data)) {
            this.props.reorder(data);
        }

        this.setState({
            data,
        });
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            className={snapshot.isDraggingOver ? styles.selectedDragItems : styles.unselectedDragItems}
                        >
                            {this.state.data.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div ref={provided.innerRef}>
                                            <div {...provided.draggableProps}>
                                                <div className={styles.dragBox} style={getdragedStyle(snapshot.isDragging)}>
                                                    {this.state.data.length > 1 && this.props.reorder && (
                                                        <div
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getDragIconStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                            className={styles.dragBoxIcon}
                                                        >
                                                            <Tooltip title="Change Position" arrow distance={20}>
                                                                <i className={'material-icons ' + styles.dndIcon}>drag_handle</i>
                                                            </Tooltip>
                                                        </div>
                                                    )}
                                                    {this.props.renderItem(item, index)}
                                                    <div
                                                        style={getAddIconStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                        className={styles.dragBoxIcon}
                                                        onClick={() => this.props.addItem()}
                                                    >
                                                        <Tooltip title="Add New Item" arrow distance={20}>
                                                            <i className={'material-icons ' + styles.dndIcon}>add</i>
                                                        </Tooltip>
                                                    </div>
                                                    {this.state.data.length > 1 && (
                                                        <div
                                                            style={getRemoveIconStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                            className={styles.dragBoxIcon}
                                                            onClick={() => this.props.removeItem(index, item,)}
                                                        >
                                                            <Tooltip title="Remove" arrow distance={20}>
                                                                <i className={'material-icons ' + styles.dndIcon}>remove</i>
                                                            </Tooltip>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

export default Dnd;
