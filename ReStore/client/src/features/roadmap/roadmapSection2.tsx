import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { IRoadmap } from "./interface/IRoadmap";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../roadmap/styling/roadmapSection2.css";

const RoadmapSection2 = () => {
  const [datas, setDatas] = useState<IRoadmap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.agent()
      .then((response) => setDatas(response))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [DragDropContext]);

  const handleDragDrop = (results: any) => {
    const { source, destination, type } = results;

    //source-index == where we was before
    //destination == where we are dropping the droppable item
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (type === "group") {
      const reOrderedStores = [...datas];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedStore] = reOrderedStores.splice(sourceIndex, 1);
      reOrderedStores.splice(destinationIndex, 0, removedStore);

      return setDatas(reOrderedStores);
    }
  };

  return (
    <>
      {!loading && datas.length > 0 && (
        <div className="layout_wrapper">
          <div className="card">
            <DragDropContext onDragEnd={handleDragDrop}>
              <div className="header">
                <h1>Shopping List</h1>
              </div>
              <Droppable droppableId="ROOT" type="group">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="dropmenu"
                  >
                    {datas.map((data, index) => (
                      <Draggable
                        draggableId={data.id.toString()}
                        key={data.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="store-container"
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <h1>{data.status}</h1>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      )}
    </>
  );
};

export default RoadmapSection2;
