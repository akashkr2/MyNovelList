import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NovelTemplate from "../components/novel/NovelTemplate";
import axios from "../config/api";
import toast from "react-hot-toast";

// Dummy data (replace with API/fetched data)
const dummyData = {
  reading: [
    // {
    //   title: "Solo Leveling",
    //   author: "Chu-Gong",
    //   cover: "/covers/solo.png",
    //   novelStatus: "Ongoing",
    //   readingStatus: "reading",
    //   description: "A hunter suddenly gains the ability to level up...",
    //   category: "Fantasy",
    //   tags: ["dungeon", "hunter", "power-up"],
    //   isFavorite: true,
    //   isBookmarked: true,
    // },
    // add more...
  ],
  planned: [
    // {
    //   title: "Omniscient Reader",
    //   author: "Sing-Shong",
    //   cover: "/covers/omniscient.png",
    //   novelStatus: "Ongoing",
    //   readingStatus: "planned",
    //   description: "The world changes according to a novel...",
    //   category: "Apocalypse",
    //   tags: ["regression", "reader", "system"],
    //   isFavorite: false,
    //   isBookmarked: false,
    // },
  ],
  completed: [
    // {
    //   title: "Re:Zero",
    //   author: "Tappei Nagatsuki",
    //   cover: "/covers/rezero.png",
    //   novelStatus: "Completed",
    //   readingStatus: "completed",
    //   description:
    //     "A boy is transported to another world with time-loop powers...",
    //   category: "Isekai",
    //   tags: ["loop", "romance", "drama"],
    //   isFavorite: true,
    //   isBookmarked: false,
    // },
  ],
  onHold: [],
  dropped: [],
};

const Section = ({ title, link, novels }) => {
  if (!novels || novels.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link
          to={link}
          className="text-sm text-primary hover:underline transition"
        >
          Show More →
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {novels.slice(0, 3).map((novel, i) => (
          <NovelTemplate key={i} {...novel} />
        ))}
      </div>
    </section>
  );
};

const EmptySection = ({ title, link }) => {
  return (
    <section className="mb-10 opacity-70">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link
          to={link}
          className="text-sm text-primary hover:underline transition"
        >
          Browse All →
        </Link>
      </div>

      <div className="text-center text-gray-500 border border-dashed border-gray-300 p-6 rounded-lg">
        No novels available in this section.
      </div>
    </section>
  );
};

const Homepage = () => {
  const [novelData, setNovelData] = useState(dummyData);

  const location = useLocation();
  useEffect(() => {
    if (location.state?.toastId) {
      const id = location.state?.toastId;
      toast.dismiss(id);
    }
  }, [location]);

  //   useEffect(() => {
  //     const getNovelData = async () => {
  //       const res = await axios.get("/api/user/getNovels");
  //       console.log(res.data.message);
  //     };

  //     getNovelData();
  //   }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">📚 Welcome to MyNovelList</h1>

      {novelData && (
        <>
          {"reading" in novelData &&
            (novelData.reading.length > 0 ? (
              <Section
                title="📖 Currently Reading"
                link="/reading"
                novels={novelData.reading}
              />
            ) : (
              <EmptySection title="📖 Currently Reading" link="/reading" />
            ))}

          {"planned" in novelData &&
            (novelData.planned.length > 0 ? (
              <Section
                title="🗓 Planned to Read"
                link="/planned"
                novels={novelData.planned}
              />
            ) : (
              <EmptySection title="🗓 Planned to Read" link="/planned" />
            ))}

          {"completed" in novelData &&
            (novelData.completed.length > 0 ? (
              <Section
                title="✅ Finished Reading"
                link="/completed"
                novels={novelData.completed}
              />
            ) : (
              <EmptySection title="✅ Finished Reading" link="/completed" />
            ))}

          {"onHold" in novelData &&
            (novelData.onHold.length > 0 ? (
              <Section
                title="⏸ On Hold"
                link="/on-hold"
                novels={novelData.onHold}
              />
            ) : (
              <EmptySection title="⏸ On Hold" link="/on-hold" />
            ))}

          {"dropped" in novelData &&
            (novelData.dropped.length > 0 ? (
              <Section
                title="❌ Dropped"
                link="/dropped"
                novels={novelData.dropped}
              />
            ) : (
              <EmptySection title="❌ Dropped" link="/dropped" />
            ))}
        </>
      )}
    </div>
  );
};

export default Homepage;
