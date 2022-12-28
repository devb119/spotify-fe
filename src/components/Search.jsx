import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/StateProvider";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import { useNavigate } from "react-router-dom";
import { SongContainer } from "./HomeMusic";

const listCard = [
  {
    id: 1,
    title: "Podcasts",
    img: "https://i.scdn.co/image/567158eb895ad26718a814345af0fc43ee785ec5",
    color: "bg-cardColor1",
  },
  {
    id: 2,
    title: "Made For You",
    img: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
    color: "bg-cardColor2",
  },
  {
    id: 3,
    title: "Charts",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/weekly/region_global_default.jpg",
    color: "bg-cardColor3",
  },

  {
    id: 4,
    title: "New Releases",
    img: "https://i.scdn.co/image/ab67706f000000027ea4d505212b9de1f72c5112",
    color: "bg-cardColor1",
  },
  {
    id: 5,
    title: "Discover",
    img: "https://t.scdn.co/images/d0fb2ab104dc4846bdc56d72b0b0d785.jpeg",
    color: "bg-cardColor2",
  },

  {
    id: 6,
    title: "New Releases",
    img: "https://i.scdn.co/image/ab67706f000000027ea4d505212b9de1f72c5112",
    color: "bg-cardColor3",
  },
  {
    id: 7,
    title: "Discover",
    img: "https://t.scdn.co/images/d0fb2ab104dc4846bdc56d72b0b0d785.jpeg",
    color: "bg-cardColor2",
  },
];

function Search() {
  const navigate = useNavigate();
  const [allCategories, setAllCategories] = useState([]);
  const [songs, setSongs] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [{ query, searchType }, dispatch] = useStateValue();
  useEffect(() => {
    // getAllCategories().then((res) => {
    //   setAllCategories(res.data);
    // });

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
  console.log(searchType);
  return (
    <div className="p-8 pt-0 mb-12 ">
      {query === "" ? (
        <>
          <div className="text-white text-xl font-bold">Browse all</div>
          {allCategories.length !== 0 ? (
            <div className="grid grid-cols-3 gap-6 mt-4 lg:grid-cols-4 2xl:grid-cols-6 hover:cursor-pointer">
              {allCategories.map((item, i) => {
                return (
                  <div
                    onClick={() => {
                      navigate(`/search/${item}`);
                    }}
                    key={item}
                    className={`${listCard[i].color} h-56 w-auto  rounded-md overflow-hidden cursor-pointer`}
                  >
                    <div className="text-white text-xl font-bold mt-5 ml-3 mb-5">
                      {item}
                    </div>
                    <img
                      className="rotate-24 h-2/4 md:mt-16 md:ml-32 lg:mt-20 lg:ml-36 2xl:mt-16 2xl:ml-28"
                      src={listCard[i].img}
                      alt="post"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center">Loading...</div>
          )}
        </>
      ) : (
        <SongContainer songs={songs} title="Result" />
      )}
    </div>
  );
}

export default Search;
