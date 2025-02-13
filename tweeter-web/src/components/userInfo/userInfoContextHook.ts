import { useContext } from "react";
import { UserInfoContext } from "./UserInfoProvider"

const useuserInfoHook = () => useContext(UserInfoContext);

export default useuserInfoHook