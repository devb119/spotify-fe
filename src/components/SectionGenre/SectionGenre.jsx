import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSectionsByCategories } from "../../api";
import DotFlashing from "../DotFlashing";
import Section from "./Section";

function SectionGenre() {
  const params = useParams();
  console.log(params.id);
  const [sections, setSections] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    setLoading(true);
    getSectionsByCategories(params.id)
      .then((data) => {
        console.log(data.data);
        setSections(data.data);
      })
      .finally(() => setLoading(false));
  }, [params.id]);
  return (
    <div>
      {!loading ? (
        <div className="p-8 pt-0">
          <div className="mb-4">
            <h1 className="font-bold text-8xl mt-6 mb-20 text-white">
              {sections[0].genre.name}
            </h1>
          </div>

          <div className="">
            {sections.map((s) => (
              <Section section={s}></Section>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex  mt-64 justify-center h-screen">
          <DotFlashing></DotFlashing>
        </div>
      )}
    </div>
  );
}

export default SectionGenre;
