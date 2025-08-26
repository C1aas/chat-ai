import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  selectDarkMode,
  selectShowSettings,
  selectShowSidebar,
  toggleSidebar,
} from "../../Redux/reducers/interfaceSettingsSlice";

import ChatAiLogo from "../../assets/logos/chat_ai.svg";
import ChatAiLogoMini from "../../assets/logos/chat_ai_small.ico";
import { useDispatch, useSelector } from "react-redux";
import { createConversation } from "../../db";
import { useNavigate } from "react-router";
import {
  getDefaultConversation,
  getDefaultSettings,
} from "../../utils/conversationUtils";
import SidebarContent from "./SidebarContent";

export default function SidebarLeft({localState, isMobileSidebarOpen, setIsMobileSidebarOpen}: {localState: any, isMobileSidebarOpen: boolean, setIsMobileSidebarOpen: (open: boolean) => void}) {
  /*
    Handles the Desktop and mobile Sidebar
    On Desktop its a collapsible sidebar
    On Mobile its a drawer that pops open

    The Content of the Sidebar is Handled by the Component SidebarContent
  */
  const isSidebarOpen = useSelector(selectShowSidebar);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Sidebar extended width is 15vw and min 13rem to protect against small viewports 
   */
  return (
    <>
    
    {/* Mobile drawer */}
    <div id="drawer-example" 
      className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform 
        ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        bg-white dark:bg-gray-800`}
      aria-labelledby="drawer-label">
      <SidebarContent
          localState={localState}
          onClose={() => { setIsMobileSidebarOpen(!isMobileSidebarOpen) }}
        />
    </div>
    {/* Desktop sidebar */}
      <div
        className={`
          relative isolate
          bg-white dark:bg-bg_secondary_dark
          rounded-xl shadow-md
          overflow-hidden
          transition-[width,min-width] duration-300 ease-in-out
          max-w-[280px]
          ${isSidebarOpen ? "w-[13vw] min-w-[13rem]" : "w-[2.5vw] min-w-[3rem]"}
        `}
      >
        {/* LAYER 1: collapsed rail (logo + quick actions) */}
        <div
          className={`
            absolute inset-0 z-10
            flex items-start justify-center
          `}
          style={{ pointerEvents: isSidebarOpen ? "none" : "auto" }}
        >
          <div
            className={`
              p-2
              flex flex-col items-center gap-2
              transition-[opacity,transform] duration-300 ease-in-out
              ${isSidebarOpen ? "opacity-0 -translate-x-2" : "opacity-100 translate-x-0"}
            `}
          >
            <img
              className="h-8 w-auto object-contain"
              src={ChatAiLogoMini}
              alt="Chat AI Logo"
            />

            <button
              onClick={() => dispatch(toggleSidebar())}
              className="grid h-8 w-8 place-items-center rounded-xl hover:bg-gray-100"
              title="Expand"
            >
              <FontAwesomeIcon className="text-tertiary" icon={faChevronLeft} />
            </button>

            <div className="mt-4 flex flex-col gap-3 items-center">
              <button
                onClick={() => {}}
                className="grid h-8 w-8 place-items-center rounded-xl hover:bg-gray-100"
                title="New chat"
              >
                <FontAwesomeIcon className="text-tertiary" icon={faPlus} />
              </button>
              <button
                onClick={() => {}}
                className="grid h-8 w-8 place-items-center rounded-xl hover:bg-gray-100"
                title="Search"
              >
                <FontAwesomeIcon className="text-tertiary" icon={faSearch} />
              </button>
            </div>
          </div>
        </div>

        {/* LAYER 2: expanded sidebar content */}
        <div
          className={`
            absolute inset-0 z-20
            h-full
            transition-[opacity,transform] duration-300 ease-in-out
            ${isSidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}
          `}
          style={{ pointerEvents: isSidebarOpen ? "auto" : "none" }}
        >
          <SidebarContent localState={localState} onClose={() => dispatch(toggleSidebar())} />
        </div>
      </div>
    </>
  );
}

