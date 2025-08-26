import { useDispatch, useSelector } from "react-redux";
import SidebarRail from "./SidebarRail";
import { selectShowSidebar, toggleSidebar, closeSidebar } from "../../Redux/reducers/interfaceSettingsSlice";

import { useWindowSize } from "../../hooks/useWindowSize";

import SidebarPanel from "./SidebarPanel";
import { useEffect } from "react";
import SidebarDrawer from "./SidebarDrawer";
import { createConversation } from "../../db";
import { getDefaultConversation } from "../../utils/conversationUtils";
import { useNavigate } from "react-router";

export default function SidebarWrapper({ localState, setLocalState, userData, modelsData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showSidebar = useSelector(selectShowSidebar);
  const { isMobile, isTablet, isDesktop } = useWindowSize();

  useEffect(() => {
    if (!isDesktop) {
      // one tablet or mobile default sidebar to closed
      dispatch(closeSidebar());
    }
  }, [isDesktop, dispatch]);

  async function handleNewChat() {
    dispatch({ type: "conversations/setLockConversation", payload: true });
    const newId = await createConversation(getDefaultConversation());
    navigate(`/chat/${newId}`);
  };

  return (
    <>
      <div className="flex relative min-w-[4rem]">
        {/**<div className={`hidden h-full md:flex ${showSidebar && isDesktop && "md:hidden"}`}> */}
        <div className={`h-full absolute
                      transition-all duration-200 ease-in
                      ${showSidebar ? "-translate-x-full opacity-0 pointer-events-none" : "translate-x-0 opacity-100"}
        `}>
          <SidebarRail onOpen={() => { dispatch(toggleSidebar()) }} handleNewChat={handleNewChat} />
        </div>

        {(isDesktop) && (
          <div className={`h-full
                        transition-all duration-300 ease-in-out overflow-hidden
          ${showSidebar ? "opacity-100 w-[13vw]" : "w-0 opacity-0 pointer-events-none"}`}>
            <SidebarPanel localState={localState} handleNewChat={handleNewChat} />
          </div>
        )}
        {(!isDesktop) && (
          <SidebarDrawer localState={localState} handleNewChat={handleNewChat} />
        )}
      </div>
    </>
  );
}
