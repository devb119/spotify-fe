import React from "react";



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
    color: "bg-cardColor1",
  },

  {
    id: 6,
    title: "New Releases",
    img: "https://i.scdn.co/image/ab67706f000000027ea4d505212b9de1f72c5112",
    color: "bg-cardColor1",
  },
  {
    id: 7,
    title: "Discover",
    img: "https://t.scdn.co/images/d0fb2ab104dc4846bdc56d72b0b0d785.jpeg",
    color: "bg-cardColor1",
  },
];

function Search() {
  return <div className="mx-4 mt-8 mb-12 ">
      <div className="text-white text-xl font-bold">
        Browse all
      </div>
      <div className="grid grid-cols-3 gap-6 mt-4 lg:grid-cols-6 md:grid-cols-4">
       {listCard.map((item, index) => {
            return (
              <div key={index} className={`${item.color} h-32 w-auto lg:h-187 lg:w-187 rounded-md overflow-hidden cursor-pointer`}>
               <div className="text-white text-xl font-bold mt-5 ml-3 mb-5">
                 {item.title}
               </div>
              <img className="rotate-24 h-2/4 mt-12 ml-28" src={item.img} alt="post" />
              </div>
            );
          })}
        </div>
  </div>;
}

export default Search;
