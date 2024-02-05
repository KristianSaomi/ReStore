import { useState } from "react";
import { IRoadmap } from "../interface/IRoadmap";

type SectionProps = {
  data: IRoadmap;
};

export default function RoadmapCard({ data }: SectionProps) {
  const [toggle, setToggler] = useState<boolean>(false);

  const minDescription = 82;

  var tagColor =
    data.tag == "BuggFix"
      ? "#FFE8E8"
      : data.tag == "Objective"
      ? "#FFF1E8"
      : data.tag == "Underhåll"
      ? "#E5ECFC"
      : "#E9FFEE";

  return (
    <div className="card">
      <h4>{data.text}</h4>
      {!toggle && data.desc.length > minDescription ? (
        <p>{data.desc.substring(0, minDescription) + " ..."}</p>
      ) : (
        <p>{data.desc}</p>
      )}
      <div className="card-inner">
        <div>
          {data.desc.length > minDescription && (
            <button onClick={() => setToggler(!toggle)}>
              {!toggle ? "Läs mer" : "Läs mindre"}
            </button>
          )}
        </div>
        <div className="card-tag" style={{ backgroundColor: `${tagColor}` }}>
          <p>{data.tag}</p>
        </div>
      </div>
    </div>
  );
}
