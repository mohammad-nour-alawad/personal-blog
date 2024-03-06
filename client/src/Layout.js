import NavComp from "./components/NavComp";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <NavComp />
            <div style={{ paddingTop: "70px" }}>
                <Outlet />
            </div>
        </>
    );
}
