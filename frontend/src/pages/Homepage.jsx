import React from "react";
import { Link } from "react-router-dom";
import NovelTemplate from "../components/novel/NovelTemplate";

// Dummy data (replace with API/fetched data)
const novelData = {
  reading: [
    {
      title: "Solo Leveling",
      author: "Chu-Gong",
      cover: "/covers/solo.png",
      novelStatus: "Ongoing",
      readingStatus: "reading",
      description: "A hunter suddenly gains the ability to level up...",
      category: "Fantasy",
      tags: ["dungeon", "hunter", "power-up"],
      isFavorite: true,
      isBookmarked: true,
    },
    // add more...
  ],
  planned: [
    {
      title: "Omniscient Reader",
      author: "Sing-Shong",
      cover: "/covers/omniscient.png",
      novelStatus: "Ongoing",
      readingStatus: "planned",
      description: "The world changes according to a novel...",
      category: "Apocalypse",
      tags: ["regression", "reader", "system"],
      isFavorite: false,
      isBookmarked: false,
    },
  ],
  completed: [
    {
      title: "Re:Zero",
      author: "Tappei Nagatsuki",
      cover: "/covers/rezero.png",
      novelStatus: "Completed",
      readingStatus: "completed",
      description: "A boy is transported to another world with time-loop powers...",
      category: "Isekai",
      tags: ["loop", "romance", "drama"],
      isFavorite: true,
      isBookmarked: false,
    },
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

const Homepage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">📚 Welcome to MyNovelList</h1>

      <Section
        title="📖 Currently Reading"
        link="/reading"
        novels={novelData.reading}
      />
      <Section
        title="🗓 Planned to Read"
        link="/planned"
        novels={novelData.planned}
      />
      <Section
        title="✅ Finished Reading"
        link="/completed"
        novels={novelData.completed}
      />
      <Section
        title="⏸ On Hold"
        link="/on-hold"
        novels={novelData.onHold}
      />
      <Section
        title="❌ Dropped"
        link="/dropped"
        novels={novelData.dropped}
      />
    </div>
  );
};

export default Homepage;
