import { Outlet } from "react-router-dom"
import SideBar from "./SideBar/SideBar"

function DashboardLayout() {
    return (
        <div style={{ display: 'flex' }}>
            <SideBar />
            <div style={{ flex: 1 }}>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout