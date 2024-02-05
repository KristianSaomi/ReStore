// Import necessary dependencies
import { useEffect, useRef, useState } from "react";
import { IRoadmap } from "./interface/IRoadmap";
import RoadmapCard from "./styling/roadmapCard";
import "./styling/roadmap.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import agent from "../../app/api/agent";
import isEmpty, { result } from "lodash";

// Define the RoadmapSection component
const RoadmapSection = () => {
  // Define the unique statuses
  const uniqueStatuses = ["Planerat", "Pågående", "Testar", "Lanserat"];
  const queryAttr = "data-rbd-drag-handle-draggable-id";

  // State to store data by status
  const [dataByStatus, setDataByStatus] = useState<Record<string, IRoadmap[]>>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [placeholderProps, setPlaceholderProps] = useState<any>({});
  const ref = useRef<any | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    agent.Catalog.item()
      .then((response) => {
        const newDataByStatus: Record<string, IRoadmap[]> = {};
        uniqueStatuses.forEach((status) => {
          newDataByStatus[status] = response.filter(
            (data: { status: string }) => data.status === status
          );
        });
        setDataByStatus(newDataByStatus);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  //Styles applied here
  const grid = 4;
  const flexDirection: any = "column";
  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    grid: grid * 2,
    margin: `2px 2px 2px 2px`,
    padding: 0,
    height: "auto",

    // change background colour if dragging
    background: isDragging ? "#009CCC" : "#009CCC",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? "#009CCC" : "#34eb7d",
    padding: grid,
    borderRadius: `2px`,
    display: "flex",
    flexDirection: flexDirection,
    gap: `2px`,
  });

  //Styles end here

  // Handle drag and drop
  const handleDragDrop = (results: any) => {
    const { source, destination, type } = results;
    const draggedDOM: any = getDraggedDom(results.draggableId);

    if (!destination) return;

    if (type === "group") {
      const sourceStatus = source.droppableId;
      const destinationStatus = destination.droppableId;

      // If dragging within the same droppable container
      if (sourceStatus === destinationStatus) {
        const reorderedStores = [...dataByStatus[sourceStatus]];
        const [removedStore] = reorderedStores.splice(source.index, 1);
        reorderedStores.splice(destination.index, 0, removedStore);

        setDataByStatus({
          ...dataByStatus,
          [sourceStatus]: reorderedStores,
        });
      } else {
        // If dragging between different droppable containers
        const sourceStores = [...dataByStatus[sourceStatus]];
        const destinationStores = [...dataByStatus[destinationStatus]];

        const [draggedStore] = sourceStores.splice(source.index, 1);
        destinationStores.splice(destination.index, 0, draggedStore);

        setDataByStatus({
          ...dataByStatus,
          [sourceStatus]: sourceStores,
          [destinationStatus]: destinationStores,
        });
      }
      //Get
      const { clientHeight, clientWidth } = draggedDOM;
      const sourceIndex = results.source.index;
      var clientY =
        parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
        [...draggedDOM.parentNode.children]
          .slice(0, sourceIndex)
          .reduce((total, curr) => {
            const style = curr.currentStyle || window.getComputedStyle(curr);
            const marginBottom = parseFloat(style.marginBottom);
            return total + curr.clientHeight + marginBottom;
          }, 0);
      setPlaceholderProps({
        clientHeight,
        clientWidth,
        clientY,
        clientX: parseFloat(
          window.getComputedStyle(draggedDOM.parentNode).paddingLeft
        ),
      });
    }
  };
  const getDraggedDom = (draggableId: any) => {
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    return draggedDOM;
  };

  return (
    <>
      {!loading && (
        <DragDropContext onDragEnd={handleDragDrop}>
          <div className="container">
            {uniqueStatuses.map((status) => (
              <div key={status} className="container-inner" ref={ref}>
                <h1>{status}</h1>
                <Droppable droppableId={status} type="group">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {dataByStatus[status]?.map((data, index) => (
                        <Draggable
                          draggableId={data.id.toString()}
                          key={data.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                              ref={provided.innerRef}
                            >
                              <RoadmapCard key={index} data={data} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {!isEmpty(placeholderProps) &&
                        snapshot.isDraggingOver && (
                          <div
                            className="placeholder"
                            style={{
                              top: placeholderProps.client,
                              left: placeholderProps.clientX,
                              height: placeholderProps.clientHeight,
                              width: placeholderProps.clientWidth,
                            }}
                          />
                        )}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      )}
    </>
  );
};

export default RoadmapSection;
