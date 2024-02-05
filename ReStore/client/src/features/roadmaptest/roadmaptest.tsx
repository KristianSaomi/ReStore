import { IRoadmap } from "../roadmap/interface/IRoadmap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../roadmap/styling/roadmap.css";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import RoadmapCard from "../roadmap/styling/roadmapCard";

const Roadmaptest = () => {
  const [datas, setDatas] = useState<IRoadmap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.agent()
      .then((response) => setDatas(response))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [DragDropContext]);

  console.log(datas);

  const handleDragDrop = (results: any) => {
    const { source, destination, type } = results;

    //source-index == where we was before
    //destination == where we are dropping the droppable item
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      console.log("fel");
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
                  <div {...provided.droppableProps} ref={provided.innerRef}>
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
                            <RoadmapCard key={index} data={data} />
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

export default Roadmaptest;
