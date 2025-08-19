
import { useCallback, useState, useMemo, useEffect, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useModal } from "../../modals/ModalContext";
import { useSelector, useDispatch } from "react-redux";
import Tooltip from "../Others/Tooltip";

import { useUpdateModelsData } from "../../hooks/useUpdateModelsData";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown, faList, faTableCells, faMagnifyingGlass, faLayerGroup, faFilter, faBrain, faImage, faVideo
} from '@fortawesome/free-solid-svg-icons'

import { faCalendar, faRectangleList } from '@fortawesome/free-regular-svg-icons'

import DemandIndicator from "./DemandIndicator";

export default function ModelSelectorExtended({}) {

  const modelsList = useUpdateModelsData();
  const [selectedModel, setSelectedModel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [resultViewMode, setResultViewMode] = useState("list"); // list, expanded, grid
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [sortBy, setSortBy] = useState("name-asc"); // name-asc, name-desc, date-asc, date-desc, params-asc, params-desc

  // Dropdown close on click outside logic
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // close dropdown
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // setSelectedModel to the first element of the modelList if its loaded
  useEffect(() => {
    if (modelsList.length > 0) {
      const foundModel = modelsList.find((model) => model.id === "meta-llama-3.1-8b-instruct");
      setSelectedModel(foundModel || modelsList[0]);
    }
  }, [modelsList]);


  const filteredModelsList = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let result = modelsList;
    if (q && q !== ""){
      result = modelsList.filter((m) =>
        m.name.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q) ||
        m.input.some(input => input.toLowerCase().includes(q)) ||
        m.output.some(output => output.toLowerCase().includes(q))
      );
    }
    // Apply sorting based on sortOption
    if (sortBy === "name-asc") {
      result = result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      result = result.sort((a, b) => b.name.localeCompare(a.name));
    }
    return result;
  }, [searchQuery, modelsList, sortBy]);

  console.log(filteredModelsList)

  /*
    {
      "id": "medgemma-27b-it",
      "object": "model",
      "input": [
          "text",
          "image"
      ],
      "output": [
          "text"
      ],
      "owned_by": "chat-ai",
      "name": "MedGemma 27B Instruct",
      "demand": 0,
      "status": "ready",
      "created": 1755300238
    },
    */

  function listElement(idx, model) {
    return (
      <div role="option" aria-selected="false" data-index={idx} data-id={model.id} tabIndex={idx} class="item cursor-pointer my-1 px-2 py-1 hover:bg-slate-100 rounded-2xl border border-slate-200 bg-white">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div className="pl-1">
              <DemandIndicator demand={model.demand} online={model.status === "ready"} />
            </div>
            {/*<span class="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold">{model.id.charAt(0).toUpperCase()}</span>*/}
            <span class="font-medium">{model.name}</span>
          </div>
          <div class="ml-2 flex items-center gap-1 text-indigo-600">
            {model.input.includes("image") && <Tooltip text={"Image Input"}><FontAwesomeIcon icon={faImage} /></Tooltip>}
            {model.input.includes("video") && <Tooltip text={"Video Input"}><FontAwesomeIcon icon={faVideo} /></Tooltip>}
            {model.output.includes("thought") && <Tooltip text={"Thinking"}><FontAwesomeIcon icon={faBrain} /></Tooltip>}

          </div>
        </div>
      </div>
    );
  }

  function gridElement(idx, model) {
    return (
      <div class="group rounded-2xl border border-slate-200 bg-white p-3 h-full hover:shadow-md transition dark:border-slate-700 dark:bg-slate-800 focus-within:ring-2 focus-within:ring-indigo-500 flex flex-col justify-between"
       role="listitem" tabIndex={idx}>
        <div class="grid grid-cols-[1fr_auto] gap-2 items-start">
          <div class="flex items-center gap-2 flex-wrap">
            <div class="font-semibold tracking-tight">{model.name}</div>
          </div>
          <DemandIndicator demand={model.demand} online={model.status === "ready"} />
        </div>
        <div class="mt-2 flex gap-2">
          {model.output.includes("thought") && (
            <Tooltip text={"Thinking"}>
              <div class="text-indigo-600 dark:text-indigo-400 size-9 inline-grid place-items-center rounded-xl border border-slate-200 dark:border-slate-700" aria-label="Text input">
                <FontAwesomeIcon icon={faBrain} />
              </div>
            </Tooltip>
          )}
          {model.input.includes("image") && (
            <Tooltip text={"Image Input"}>
              <div class="text-indigo-600 dark:text-indigo-400 size-9 inline-grid place-items-center rounded-xl border border-slate-200 dark:border-slate-700" aria-label="Text input">
                <FontAwesomeIcon icon={faImage} />
              </div>
            </Tooltip>
          )}
          {model.input.includes("video") && (
            <Tooltip text={"Video Input"}>
              <div class="text-indigo-600 dark:text-indigo-400 size-9 inline-grid place-items-center rounded-xl border border-slate-200 dark:border-slate-700" aria-label="Text input">
                <FontAwesomeIcon icon={faVideo} />
              </div>
            </Tooltip>
          )}
        </div>
      </div>
    )
  }

  return (

    <div className="w-full">

      {/** Trigger/Input **/}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        class="w-full text-left desktop:w-full border border-gray-200 dark:border-gray-800 rounded-xl shadow-md bg-white px-3 py-2.5 shadow-sm hover:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30">
        <div id="trigger-content" class="flex justify-between">
          <div class="flex items-center justify-between gap-2">
            <div className="pl-2">
              <DemandIndicator demand={selectedModel?.demand} online={selectedModel?.status === "ready"} />
            </div>
            {/*<span class="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold">M</span>*/}
            <span class="font-medium">{selectedModel?.name}</span>
            {/** 
            <span class="text-xs text-slate-500">
              <FontAwesomeIcon icon={faCalendar} />
              2024-07-23
            </span>*/}

          </div>

          <div class="flex items-center gap-2">
            <div class="ml-2 flex items-center gap-1 text-indigo-600">
              {selectedModel?.input.includes("image") && <Tooltip text={"Image Input"}><FontAwesomeIcon icon={faImage} /></Tooltip>}
              {selectedModel?.input.includes("video") && <Tooltip text={"Video Input"}><FontAwesomeIcon icon={faVideo} /></Tooltip>}
              {selectedModel?.output.includes("thought") && <Tooltip text={"Thinking"}><FontAwesomeIcon icon={faBrain} /></Tooltip>}

            </div>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>

      </button>


      {/** Dropdown Panel **/}
      <div ref={dropdownRef} class={`${dropdownOpen ? "" : "hidden"} absolute z-50 mt-1 w-full rounded-2xl border border-slate-200 bg-white shadow-2xl  pb-4`}>

        {/** Controls **/}
        <div class="text-sm flex items-center gap-2 p-2 border-b border-slate-100 to-white">
          <div class="relative flex-1">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text" placeholder="Search models…" autocomplete="off" class="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30" />
          </div>

          {/** View tabs (kept; default is List) **/}
          <div class=" rounded-xl border border-slate-200 overflow-hidden" role="tablist" aria-label="View mode">
            <button
              onClick={() => setResultViewMode("list")}
              data-view="simple" class="view-btn px-3 py-2 text-sm hover:bg-slate-50 aria-selected:bg-indigo-600 aria-selected:text-white" role="tab" aria-selected={resultViewMode === "list"} title="List">
              <FontAwesomeIcon icon={faList} />
            </button>
            <button
              onClick={() => setResultViewMode("extended")}
              data-view="extended" class="view-btn px-3 py-2 text-sm hover:bg-slate-50 aria-selected:bg-indigo-600 aria-selected:text-white" role="tab" aria-selected={resultViewMode === "extended"} title="Extended">
              <FontAwesomeIcon icon={faRectangleList} />
            </button>
            <button
              onClick={() => setResultViewMode("grid")}
              data-view="grid" class="view-btn px-3 py-2 text-sm hover:bg-slate-50 aria-selected:bg-indigo-600 aria-selected:text-white" role="tab" aria-selected={resultViewMode === "grid"} title="Grid">
              <FontAwesomeIcon icon={faTableCells} />
            </button>
          </div>


          {/** Grouping switch (default ON: by family) **/}
          
          <div class="items-center gap-2 ml-1" title="Group by family">
            <FontAwesomeIcon icon={faLayerGroup} className="text-slate-500" />
            <label class="relative inline-flex items-center cursor-pointer select-none">
              <input id="group-toggle" type="checkbox" class="sr-only peer" checked="" />
              <div class="w-11 h-6 bg-slate-200 rounded-full transition-colors peer-checked:bg-indigo-500"></div>
              <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform"></div>
            </label>
          </div>
          


          {/** Sort **/}
          <label class="md:flex items-center text-sm text-slate-600">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              id="sort-select" class="text-xs rounded-xl border border-slate-200 bg-white px-2 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500/30">
              <option value="name-asc">Name (A→Z)</option>
              <option value="name-desc">Name (Z→A)</option>
              
              <option value="date-desc">Release (new→old)</option>
              <option value="date-asc">Release (old→new)</option>
              <option value="params-desc">Params (high→low)</option>
              <option value="params-asc">Params (low→high)</option>
            </select>
          </label>

          {/** FILTER ICON with popover **/}
          
          <div class="relative">
            <button id="filter-btn" class="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 hover:bg-slate-50" title="Filters">
              <FontAwesomeIcon icon={faFilter} className="text-slate-500" />
            </button>
            <div id="filter-pop" class="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-xl p-2 text-sm hidden">
              <div class="px-2 py-1.5 text-xs font-semibold text-slate-500">Capabilities</div>
              <label class="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
                <input type="checkbox" class="filter-out" data-out="thought" /> <i class="fa-solid fa-brain text-purple-600"></i> Reasoning / Thinking
              </label>
              <label class="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
                <input type="checkbox" class="filter-cap" data-cap="image" /> <i class="fa-regular fa-image text-indigo-600"></i> Image
              </label>
              <label class="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
                <input type="checkbox" class="filter-cap" data-cap="video" /> <i class="fa-solid fa-video text-indigo-600"></i> Video
              </label>
            </div>
          </div>
          
        </div>

        {/** Results List **/}
        <div id="model-listbox" role="listbox" aria-label="Models" tabindex="-1" class="max-h-96 overflow-auto px-2">

          {resultViewMode === 'list' && (
            <div class="rounded-xl overflow-hidden">
              {filteredModelsList.map((m, idx) => (
                <span
                  onClick={() => { setSelectedModel(m); setDropdownOpen(false); }}
                >
                  {listElement(idx, m)}
                </span>

              ))}
            </div>
          )}
          {resultViewMode === 'grid' && (
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 py-2">
              {filteredModelsList.map((m, idx) => (
                <span
                  onClick={() => { setSelectedModel(m); setDropdownOpen(false); }}
                >
                  {gridElement(idx, m)}
                </span>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

//{/** Controls **/}
// <div class="p-3 border-b border-slate-100 space-y-3 from-indigo-50/60 to-white rounded-t-2xl bg-white">
//   <div class="flex flex-wrap items-center gap-2">
//     {/** View Mode **/}
//     <div class="inline-flex rounded-xl border border-slate-200 overflow-hidden" role="tablist" aria-label="View mode">
//       <button data-view="simple" class="view-btn px-3 py-1.5 text-sm hover:bg-slate-50 aria-selected:bg-indigo-600 aria-selected:text-white" role="tab" aria-selected="false">
//         <i class="fa-solid fa-list mr-1">
//           <FontAwesomeIcon icon={faList} />
//         </i>Simple</button>
//       <button data-view="extended" class="view-btn px-3 py-1.5 text-sm hover:bg-slate-50" role="tab" aria-selected="false">
//         <i class="fa-regular fa-rectangle-list mr-1">
//           <FontAwesomeIcon icon={faRectangleList} />
//         </i>Extended</button>
//       <button data-view="grid" class="view-btn px-3 py-1.5 text-sm hover:bg-slate-50" role="tab" aria-selected="true">
//         <i class="fa-solid fa-table-cells mr-1">
//           <FontAwesomeIcon icon={faTableCells} />
//         </i>Grid</button>
//     </div>

//     {/** Grouping Switch: Family / Not grouped **/}
//     <div class="ml-2 flex items-center gap-2">
//       <span class="text-sm text-slate-600">Group by family</span>
//       <label class="relative inline-flex items-center cursor-pointer select-none">
//         <input id="group-toggle" type="checkbox" class="sr-only peer" aria-label="Toggle grouping by model family" />
//         <div class="w-11 h-6 bg-slate-200 rounded-full transition-colors peer-checked:bg-indigo-500">
//         </div>
//         <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform">
//         </div>
//       </label>
//     </div>

//     {/** Sort **/}
//     <label class="text-sm text-slate-600 ml-auto">Sort
//       <select id="sort-select" class="ml-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-sm focus:border-indigo-500 focus:ring-indigo-500/30">
//         <option value="name-asc">Name (A→Z)</option>
//         <option value="name-desc">Name (Z→A)</option>
//         <option value="date-desc">Release (new→old)</option>
//         <option value="date-asc">Release (old→new)</option>
//         <option value="params-desc">Params (high→low)</option>
//         <option value="params-asc">Params (low→high)</option>
//       </select>
//     </label>
//   </div>

//   {/** Filters **/}
//   <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
//     <span class="text-slate-600">Filters:</span>
//     <label class="inline-flex items-center gap-1">
//       <input type="checkbox" class="filter-cap" data-cap="image" /> <i class="fa-regular fa-image text-indigo-600">
//       </i> Image</label>
//     <label class="inline-flex items-center gap-1">
//       <input type="checkbox" class="filter-cap" data-cap="video" /> <i class="fa-solid fa-video text-indigo-600">
//       </i> Video</label>
//     <label class="inline-flex items-center gap-1">
//       <input type="checkbox" class="filter-out" data-out="thought" /> <i class="fa-solid fa-brain text-purple-600">
//       </i> Thinking</label>
//   </div>
// </div>