import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.REACT_APP_CONVEX_URL);

export default convex;
