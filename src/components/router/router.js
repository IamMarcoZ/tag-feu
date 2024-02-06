import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../main/Main";
import Issues from "../issues/issues"
import RouterLayout from "./routerLayout";

const AppRouter =() => {

    return (

        <BrowserRouter>
            <Routes>
            <Route path="/tag-feu" element={<RouterLayout />}>
                <Route index element={<Main />} />
                <Route path="/tag-feu/issues" element={<Issues />} />
            </Route>
            </Routes>
        </BrowserRouter>
    );
} 

export default AppRouter;