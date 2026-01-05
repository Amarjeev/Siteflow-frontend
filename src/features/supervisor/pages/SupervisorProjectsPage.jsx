import ProjectDetailsSup from "../components/ProjectDetailsSup";
import ProjectListSup from "../components/ProjectListSup";
import SupervisorNavbar from "../../../layouts/navbar/SupervisorNavbar";
import { useStaffAssignedProjects } from "../../../hooks/common/projects/useStaffAssignedProjects";

function SupervisorProjectsPage() {
  const projectState = useStaffAssignedProjects();
  return (
    <div className="min-h-screen bg-black">
      <SupervisorNavbar />

      <div className="flex flex-col lg:flex-row gap-4 p-4">
        {/* LEFT */}
        <ProjectListSup projectState={projectState} />

        {/* RIGHT */}
        <ProjectDetailsSup projectState={projectState} />
      </div>
    </div>
  );
}

export default SupervisorProjectsPage;
