import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faPlus, faSearch, faGear } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import ThemeToggle from "../Header/ThemeToggle";
import UserContainer from "../Header/UserContainer";

import gwdgLogoSmall from "../../assets/logos/gwdg_sm.png";
import kisskiLogoSmall from "../../assets/logos/kisski_sm.png";

import gwdgLogo from "../../assets/logos/gwdg.png";
import kisskiLogo from "../../assets/logos/kisski.png";


export default function SidebarRight({ localState, setLocalState, userData, modelsData }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /**
   * Sidebar extended width is 25vw and min 20rem to protect against small viewports
   */
  return (
    <div className="
      h-[50vh] bg-white dark:bg-bg_secondary_dark rounded-xl shadow-md
        overflow-hidden">
      <div
        className={`
        transition-[width, min-width] duration-300 ease-in-out
        ${isSidebarOpen ? "w-[25vw] min-w-[25rem]" : "w-[2.5vw] min-w-[2.5rem]"}
        ${isSidebarOpen ? "p-4" : "p-2 py-2"}
      `}
      >
        <div className={`flex items-center  ${isSidebarOpen ? "justify-between" : "justify-center flex-col"}`}>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-expanded={isSidebarOpen}
            className="grid h-8 w-8 place-items-center rounded-xl hover:bg-gray-100"
            title={isSidebarOpen ? "Collapse" : "Expand"}
          >
            <FontAwesomeIcon className="text-tertiary" icon={isSidebarOpen ? faChevronRight : faGear} />
          </button>
          {isSidebarOpen && (
            <>
              <img
                className="h-8 w-auto object-contain"
                src={gwdgLogo}
                alt="Chat AI Logo"
              />
              <img
                className="h-8 w-auto object-contain"
                src={kisskiLogo}
                alt="Chat AI Logo"
              />
              <div className="flex gap-2">
                <UserContainer
                  localState={localState}
                  userData={userData}
                  modelsData={modelsData}
                />
                <ThemeToggle />
              </div>
            </>
          )}
        </div>



        {!isSidebarOpen && (
          <div className="mt-4 flex flex-col gap-2">
            <img
              className="h-8 w-auto object-contain"
              src={gwdgLogoSmall}
              alt="Chat AI Logo"
            />

            <img
              className="h-8 w-auto object-contain"
              src={kisskiLogoSmall}
              alt="Chat AI Logo Mini"
            />

          </div>
        )}

        {/* Slide/fade the content so it feels like a fold instead of a snap */}
        <div
          className={`
          mt-3
          transition-[opacity,transform] duration-300 ease-in-out
          ${isSidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}
        `}
        >
          <div className="flex-shrink-0 m-3 border-b border-gray-100 dark:border-gray-800 pb-3">
            <span className="truncate">Settings Panel</span>
          </div>
        </div>
      </div>
    </div>
  );
}

