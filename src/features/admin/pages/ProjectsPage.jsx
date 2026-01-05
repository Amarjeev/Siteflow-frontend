import ProjectCard from "../components/ProjectCard";
import ProjectSearchBar from "../components/ProjectSearchBar";
import AdminNavbar from "../../../layouts/navbar/AdminNavbar";
import { useAdminProjectListWithFilters } from "../hooks/useAdminProjectListWithFilters";

function ProjectsPage() {
  const {
    projectId,
    setProjectId,
    projectStatus,
    setProjectStatus,
    startDate,
    setStartDate,
    projects,
    loadMore,
    hasMore,
    loading,
    handleClear,
  } = useAdminProjectListWithFilters();

  return (
    <div>
      <AdminNavbar />

      <ProjectSearchBar
        projectId={projectId}
        setProjectId={setProjectId}
        projectStatus={projectStatus}
        setProjectStatus={setProjectStatus}
        startDate={startDate}
        setStartDate={setStartDate}
        handleClear={handleClear}
      />

      <ProjectCard
        projects={projects}
        loadMore={loadMore}
        hasMore={hasMore}
        loading={loading}
      />
    </div>
  );
}

export default ProjectsPage;
