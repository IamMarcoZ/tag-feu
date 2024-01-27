import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../main/Main";
import Issues from "../issues/issues"
import RouterLayout from "./routerLayout";

const AppRouter =() => {

    return (

        <BrowserRouter>
            <Routes>
            <Route path="/" element={<RouterLayout />}>
                <Route index element={<Main />} />
                <Route path="/issues" element={<Issues />} />
            </Route>
            </Routes>
        </BrowserRouter>
    );
} 

export default AppRouter;