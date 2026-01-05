import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

function ProjectCard({ projects, loadMore, hasMore }) {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <section className="mx-auto max-w-1440px px-4 pt-12">
      <InfiniteScroll
        dataLength={projects.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <p className="py-6 text-center text-sm text-gray-500">
            Loading more projects...
          </p>
        }
        endMessage={
          <p className="py-6 text-center text-sm text-gray-400">
            No more projects
          </p>
        }
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div className="relative rounded-[28px] bg-[#f3f3f3] p-6 shadow-[0px_5px_0px_0px_rgba(25,26,35,1.00)] transition hover:translate-y-2px hover:shadow-[0px_3px_0px_0px_rgba(25,26,35,1.00)]">
              {/* 3 DOTS */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenMenu(openMenu === project._id ? null : project._id);
                }}
                className="absolute right-4 top-4 rounded-full p-2 text-black hover:bg-black/10"
              >
                <MoreVertical size={18} />
              </button>

              {/* DROPDOWN */}
              {openMenu === project._id && (
                <div
                  onClick={(e) => e.preventDefault()}
                  className="absolute right-4 top-10 z-20 w-32 rounded-md border bg-white shadow-md"
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/admin/projects/${project.projectId}/edit`);
                    }}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(
                        `/admin/project-reports?projectId=${project.projectId}`
                      );
                    }}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    📊 Reports
                  </button>
                </div>
              )}

              {/* CONTENT */}
              <h2 className="text-lg font-semibold">{project.projectName}</h2>
              <p className="text-xs text-gray-600">{project.projectId}</p>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </section>
  );
}

export default ProjectCard;
