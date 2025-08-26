import { useDispatch, useSelector } from "react-redux";
import { closeSettings, selectShowSettings, toggleSettings, toggleSidebar } from "../../Redux/reducers/interfaceSettingsSlice";
import SettingsRail from "./SettingsRail";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useEffect } from "react";
import SettingsDrawer from "./SettingsDrawer";
import SettingsPanel from "./SettingsPanel";

export default function SettingsWrapper({ localState, setLocalState, userData, modelsData }) {
  const dispatch = useDispatch();

  const showSettings = useSelector(selectShowSettings);
  const { isMobile, isTablet, isDesktop } = useWindowSize();

  console.log("Rendering SettingsWrapper showSettings", showSettings);

  useEffect(() => {
    if (!isDesktop) {
      // one tablet or mobile default settings to closed
      dispatch(closeSettings());
    }
  }, [isDesktop, dispatch]);

  return (
    <>
      <div className="flex relative min-w-[4rem]">
        <div className={`h-full absolute right-0
                      transition-all duration-200 ease-in-out
                      ${showSettings ? "translate-x-full opacity-0 pointer-events-none" : "translate-x-0 opacity-100"}
        `}>
          <SettingsRail
            onOpen={() => dispatch(toggleSettings())}
            localState={localState}
            setLocalState={setLocalState}
            userData={userData}
            modelsData={modelsData}
          />
        </div>
        {(isDesktop) && (
          <div className={`h-full 
                        transition-all duration-300 ease-in-out overflow-hidden
          ${showSettings ? "opacity-100 w-[25vw]" : "w-0 opacity-0 pointer-events-none"}`}>
            <SettingsPanel localState={localState} setLocalState={setLocalState} userData={userData} modelsData={modelsData} />
          </div>
        )}
        {(!isDesktop) && (
          <SettingsDrawer localState={localState} setLocalState={setLocalState} userData={userData} modelsData={modelsData} />
        )}
      </div>
    </>
  );
}
