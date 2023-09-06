import React from "react";
import App from "./App";
import { Ingredients } from "./pages/ingredients/Ingredients";

export const routes = [
    {
        path: "/",
        element: <p>Home</p>,
    },
    {
        path:"/ingredients",
        element: <Ingredients/>
    }
]