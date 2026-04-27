import { Routes, Route } from "react-router-dom";
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx";
import { DashboardPage } from "../../app/layouts/DashboardPage.jsx";
import { Users } from "../../features/users/components/Users.jsx";
import { Fields } from "../../features/fields/components/Fields.jsx";
import { verifyEmailPage } from "../../features/auth/pages/VerifyEmailPage.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import { RoleGuard } from "./RoleGuard.jsx";
import { UnauthorizedPage } from "../../features/auth/pages/UnauthorizedPage.jsx";
export const AppRoutes = () => {
    return (
        <Routes>
            {/* RUTAS PUBLICAS*/}
            <Route path="/" element={<AuthPage />} />
            <Route path="/verify-email" element={<verifyEmailPage />} />
            <Route path="unauthorized" element={<UnauthorizedPage />} />

            {/* PROCTED ROUTES + ROLE*/}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <RoleGuard allowedRoles={["ADMIN_ROLE"]}>
                            <DashboardPage />
                        </RoleGuard>
                    </ProtectedRoute>
                }
            >
                <Route path="users" element={<Users />} />
                <Route path="fields" element={<Fields />} />
            </Route>
        </Routes>
        
    )
}