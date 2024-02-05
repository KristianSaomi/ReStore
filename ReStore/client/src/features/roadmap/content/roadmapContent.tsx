import { useEffect, useState } from "react";
import { IRoadmap } from "../interface/IRoadmap";
import RoadmapSection from "../roadmapSection";

export const RoadmapContent = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [state, setState] = useState<IRoadmap[]>([
    { id: 0, text: "", desc: "", status: "Planerat", sortOrder: 0, tag: "" },
  ]);

  useEffect(
    () => {
      let unmounted = false;
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/item");
          if (response.ok && response.status === 200) {
            const data = await response.json();
            !unmounted && setState(data);
          } else {
            setHasError(true);
            throw new Error();
          }
          !unmounted && setLoading(false);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log("Could not fetch data");
          !unmounted && setLoading(false);
        }
      };

      fetchData();
      // return a cleanup function to avoid state updates after unmount
      return () => {
        unmounted = true;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <>
      {!loading && !hasError && (
        <div>
          {/* <RoadmapSection data={state} /> */}
          {/* <Roadmaptest data={state}></Roadmaptest> */}
        </div>
      )}
    </>
  );
};
