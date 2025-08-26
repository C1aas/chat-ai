import { useDispatch, useSelector } from "react-redux";
import SidebarContent from "./SidebarContent";
import { selectShowSidebar, toggleSidebar } from "../../Redux/reducers/interfaceSettingsSlice";

export default function SidebarPanel({ localState, handleNewChat }: { localState: any, handleNewChat: () => void }) {
  /*
  Small Container for the Desktop Extended Sidebar
  */
  console.log("Rendering SidebarPanel");
  const showSidebar = useSelector(selectShowSidebar);
  const dispatch = useDispatch();
  return (
    <div
      className={`h-full bg-white dark:bg-bg_secondary_dark
              rounded-xl shadow-md
              overflow-hidden
              max-w-[280px] w-[13vw] min-w-[15rem]`}

    >
      <SidebarContent localState={localState} handleNewChat={handleNewChat} />
    </div>
  );
}
