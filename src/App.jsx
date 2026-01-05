import { Routes, Route } from "react-router-dom";

import { useAuthRedirect } from "./security/useAuthRedirect.js";

import AdminSignupForm from "./auth/components/AdminSignupForm";
import LandingPage from "./components/common/LandingPage";
import ForgotPwdEmailForm from "./auth/components/ForgotPwdEmailForm.jsx";
import OtpForm from "./auth/components/ForgotPwdOtpForm.jsx";
import ResetPasswordForm from "./auth/components/ResetPasswordForm.jsx";
import CreateProjectPage from "./features/admin/pages/CreateProjectPage.jsx";
import ProjectsPage from "./features/admin/pages/ProjectsPage.jsx";
import CreateStaffProfile from "./features/admin/components/CreateStaffProfile.jsx";
import AssignProjects from "./features/admin/components/AssigneProjects.jsx";
import ProjectEdit from "./features/admin/components/ProjectEdit.jsx";
import StaffProfileEdit from "./features/admin/components/StaffProfileEdit.jsx";
import LaboursProfile from "./features/admin/components/LaboursProfile.jsx";
import LoginAdminPage from "./auth/pages/LoginAdminPage.jsx";
import LoginStaffPage from "./auth/pages/LoginStaffPage.jsx";
import LoginOtpVerifyForm from "./auth/components/LoginOtpVerifyForm.jsx";
import MyProjects from "./features/engineer/pages/MyProjects.jsx";
import ProjectReports from "./features/engineer/components/ProjectReports.jsx";
import ProfileDeatiles from "./features/engineer/components/ProfileDeatiles.jsx";
import CreateLabourProfile from "./features/supervisor/components/CreateLabourProfile.jsx";
import AssigneJobsToLabour from "./features/supervisor/components/AssigneJobsToLabour.jsx";
import SupervisorProjects from "./features/supervisor/pages/SupervisorProjectsPage.jsx";
import ProfileDeatilesSup from "./features/supervisor/components/ProfileDeatilesSup.jsx";
import EditJobAssignment from "./features/supervisor/components/EditJobAssignment.jsx";
import ProjectReportsAdmin from "./features/admin/components/ProjectReportsAdmin.jsx";
import LabourAssignedJobsView from "./features/labour/components/LabourAssignedJobsView.jsx";

function App() {
  useAuthRedirect();
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* auth */}
      <Route path="/auth/verify-otp" element={<LoginOtpVerifyForm />} />
      <Route path="/forgot-password" element={<ForgotPwdEmailForm />} />
      <Route path="/forgot-password/otp" element={<OtpForm />} />
      <Route path="/forgot-password/reset" element={<ResetPasswordForm />} />

      {/* ADMIN */}
      <Route path="/admin/login" element={<LoginAdminPage />} />
      <Route path="/admin/signup" element={<AdminSignupForm />} />

      {/* ENGINEER/SUPERVISOR */}
      <Route path="/staff/login" element={<LoginStaffPage />} />

      {/* ENGINEER */}
      <Route path="/engineer/my-projects" element={<MyProjects />} />
      <Route path="/engineer/project-reports" element={<ProjectReports />} />
      <Route path="/engineer/profile" element={<ProfileDeatiles />} />

      {/* SUPERVISOR */}
      <Route path="/supervisor/labours" element={<CreateLabourProfile />} />
      <Route path="/supervisor/assign-jobs" element={<AssigneJobsToLabour />} />
      <Route path="/supervisor/projects" element={<SupervisorProjects />} />
      <Route path="/supervisor/profile" element={<ProfileDeatilesSup />} />
      <Route
        path="/supervisor/job-assignments/edit"
        element={<EditJobAssignment />}
      />

      {/* ADMIN */}
      <Route path="/admin/create-project" element={<CreateProjectPage />} />
      <Route path="/admin/projects" element={<ProjectsPage />} />
      <Route path="/admin/projects/:projectId/edit" element={<ProjectEdit />} />
      <Route
        path="/admin/create/staff-profile"
        element={<CreateStaffProfile />}
      />
      <Route path="/admin/projects/assign" element={<AssignProjects />} />
      <Route path="/admin/staff/profile/edit" element={<StaffProfileEdit />} />
      <Route path="/admin/labour/profile" element={<LaboursProfile />} />
      <Route path="/admin/project-reports" element={<ProjectReportsAdmin />} />

      {/* LABOUR */}
      <Route path="/labour/assigned-jobs" element={<LabourAssignedJobsView />} />

    </Routes>
  );
}

export default App;
