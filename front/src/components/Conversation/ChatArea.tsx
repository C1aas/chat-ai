import { useSelector } from "react-redux";
import ModelSelectorWrapper from "../Header/ModelSelectorWrapper";
import { selectShowSettings } from "../../Redux/reducers/interfaceSettingsSlice";
import WarningExternalModel from "../Others/WarningExternalModel";
import HallucinationWarning from "../Others/HallucinationWarning";
import Conversation from "./Conversation";
import Prompt from "../Prompt/Prompt";

export default function ChatArea({localState, setLocalState, userData, modelsData}) {

  const showSettings = useSelector(selectShowSettings);

  return (
    <main className={`min-w-0 flex justify-center`}>
      <div className={`h-full w-full md:max-w-[85vw] xl:max-w-[75vw] xl:max-w-[1300px]
                        transition-[max-width] duration-300 ease-in-out motion-reduce:transition-none
            `}
      >
        <div className="h-full grid grid-rows-[auto_1fr_auto] gap-2">
          {/* Model selector */}
          <ModelSelectorWrapper
            modelsList={modelsData}
            currentModelId={localState.settings.model?.id}
            setLocalState={setLocalState}
          />

          {/* Conversation Area */}
          <div className="h-full flex flex-col relative rounded-xl bg-white dark:bg-bg_secondary_dark p-4 shadow-md">
            {/* External model warning aligned top right in the Chat Area */}
            {!showSettings && (
              <WarningExternalModel localState={localState} userData={userData} />
            )}
            <div className="flex-1 min-h-0 overflow-y-auto flex flex-col relative w-full">
              <HallucinationWarning />
              <Conversation
                localState={localState}
                setLocalState={setLocalState}
              />
            </div>
            
          </div>

          <Prompt
            localState={localState}
            setLocalState={setLocalState}
          />
          
        </div>

      </div>
    </main>
  );
}
