import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSongsByCategories } from "../api";
import DotFlashing from "./DotFlashing";

function Section({ sectionId }) {
  return <div> Section</div>;
}

function SectionGenre() {
  const params = useParams();
  console.log(params.id);
  const [sections, setSections] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    setLoading(true);
    getSongsByCategories(params.id)
      .then((data) => {
        console.log(data);
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

          <div className="flex flex-wrap gap-6">
            {sections.map((s) => (
              <Section sectionId={s._id}></Section>
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
