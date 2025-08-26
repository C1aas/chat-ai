import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faPlus, faSearch, faEdit, faFileImport } from "@fortawesome/free-solid-svg-icons";
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

import { Download, Plus, Sidebar, SquarePen } from "lucide-react";
import { useWindowSize } from "../../hooks/useWindowSize";

export default function SidebarRail({ onOpen, handleNewChat }: { onOpen: () => void, handleNewChat: () => void }) {

  const { isTouch } = useWindowSize();
  return (
    <div
      className="bg-white dark:bg-bg_secondary_dark
              rounded-xl shadow-md
              overflow-hidden
              w-[4rem] h-full"
    >
      <div className="h-full flex flex-col items-center gap-2">
          <div className="mt-1 relative h-10 w-10 group">
            {/* Logo */}
            <img
              className="absolute inset-0 object-contain transition-opacity duration-200 group-hover:opacity-0"
              src={ChatAiLogoMini}
              alt="Chat AI Logo"
            />

            {/* Chevron Button */}
            <button
              onClick={() => onOpen?.()}
              className="absolute h-10 w-10 inset-0 grid place-items-center rounded-xl transition duration-200 opacity-0 group-hover:opacity-100 hover:bg-gray-100 cursor-pointer"
              title="Expand"
            >
              <FontAwesomeIcon size="xl" className="text-tertiary" icon={faChevronRight} />
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3 items-center">
            <button
              onClick={handleNewChat}
              className="grid h-10 w-10 place-items-center rounded-xl hover:bg-gray-100 cursor-pointer"
              title="New chat"
            >
              <Plus strokeWidth={2.5} className="text-tertiary" />
            </button>
            <button
              onClick={() => { }}
              className="grid h-10 w-10 place-items-center rounded-xl hover:bg-gray-100 cursor-pointer"
              title="Edit Conversation"
            >
              <SquarePen strokeWidth={2.5} className="text-tertiary" />
            </button>
            <button
              onClick={() => { }}
              className="grid h-10 w-10 place-items-center rounded-xl hover:bg-gray-100 cursor-pointer"
              title="Import Conversation"
            >
              <Download strokeWidth={2.5} className="text-tertiary" />
            </button>
          </div>
          <div id="placeholder" className="group flex-1 w-full hover:bg-gray-100/50 dark:hover:bg-dark_hover cursor-pointer grid place-items-center"
            onClick={() => onOpen?.()}
          >
            <button
              className={`
                translate-y-[-10vh]
                h-10 w-10 inset-0 grid place-items-center rounded-xl
                transition duration-200 opacity-0 
                group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-dark_hover cursor-pointer
                ${isTouch ? "opacity-100" : "opacity-0"}`}
              title="Expand"
            >
              <FontAwesomeIcon size="xl" className=" text-tertiary" icon={faChevronRight} />
            </button>
          </div>
        </div>
      
    </div>
  );
}
