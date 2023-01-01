import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import { useNavigate } from "react-router-dom";
import { SongContainer } from "./HomeMusic";
import { getAllCategories } from "../api";
import DotFlashing from "./DotFlashing";
const listCard = [
  {
    color: "bg-cardColor1",
  },
  {
    color: "bg-cardColor2",
  },
  {
    color: "bg-cardColor3",
  },
  {
    color: "bg-cardColor1",
  },
  {
    color: "bg-cardColor2",
  },
  {
    color: "bg-cardColor3",
  },
  {
    color: "bg-cardColor1",
  },

  {
    color: "bg-cardColor2",
  },
  {
    color: "bg-cardColor3",
  },
  {
    color: "bg-cardColor4",
  },
  {
    color: "bg-cardColor2",
  },
  {
    color: "bg-cardColor2",
  },
  {
    color: "bg-cardColor1",
  },
  {
    color: "bg-cardColor4",
  },
];

function Search() {
  const navigate = useNavigate();
  const [allCategories, setAllCategories] = useState([]);
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [{ query, searchType }, dispatch] = useStateValue();
  useEffect(() => {
    setIsLoading(true);
    getAllCategories()
      .then((res) => {
        console.log(res);
        setAllCategories(res.data);
      })
      .finally(() => setIsLoading(false));
    return () => {
      dispatch({ type: actionType.SET_QUERY, query: "" });
      dispatch({ type: actionType.SET_SEARCH_TYPE, searchType: "songs" });
    };
  }, [dispatch]);

  useEffect(() => {
    if (query) {
      getAllSongs(query).then((data) => setSongs(data.data));
    }
  }, [query]);
  // console.log(searchType);
  return (
    <div className="p-8 pt-0 mb-12 h-screen">
      {query === "" ? (
        <>
          <div className="text-white text-xl font-bold">Browse all</div>
          {!isLoading ? (
            <div className="grid grid-cols-3 gap-6 mt-4 lg:grid-cols-4 2xl:grid-cols-6 hover:cursor-pointer">
              {allCategories.map((item, i) => {
                return (
                  <div
                    onClick={() => {
                      navigate(`/sections/${item._id}`);
                    }}
                    key={item._id}
                    className={`${
                      listCard[Math.floor(Math.random() * 10)].color
                    } h-56 w-auto  rounded-md overflow-hidden cursor-pointer`}
                  >
                    <div className="text-white text-xl font-bold mt-5 ml-3 mb-5">
                      {item.name}
                    </div>
                    <img
                      className="rotate-24 h-2/4 md:mt-16 md:ml-32 lg:mt-20 lg:ml-36 2xl:mt-16 2xl:ml-28"
                      src={item.imageURL}
                      alt="post"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex  mt-64 justify-center h-screen">
              <DotFlashing></DotFlashing>
            </div>
          )}
        </>
      ) : (
        <SongContainer songs={songs} title="Result" />
      )}
    </div>
  );
}

export default Search;
