import { useSelector } from "react-redux";
import { useState, useEffect, memo } from 'react'
import { useGetModelsQuery } from "../../Redux/reducers/appApi";
import ModelSelectorSimple from "./ModelSelectorSimple";
import ModelSelectorExtended from "./ModelSelectorExtended";
import { ExtendedModelInfo, ModelInfo } from "../../types/models";
import { setConversationModelDB, useConversationModelDB } from "../../db/queries"
import { selectCurrentConversationId } from "../../Redux/reducers/conversationsSlice";


function ModelSelectorWrapper({modelsList, currentModelId, setLocalState}: {modelsList: ModelInfo, currentModelId: string, setLocalState: any}) {
  /*
  render either ModelSelectorSimple or ModelSelectorExtended depending if modelsList contains models with extended==true
  */
  console.log("Rendering ModelSelectorWrapper");
  //
  const hasExtendedModels = modelsList?.[0]?.description !== undefined;

  function setModel(newModel: ModelInfo) {
    setLocalState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        model: newModel,
      },
    }));
  }
 

  return (
    <>
      {
        hasExtendedModels ? 
          <ModelSelectorExtended currentModelId={currentModelId} modelsList={modelsList} onChange={setModel} /> 
        : 
          <ModelSelectorSimple currentModelId={currentModelId} modelsList={modelsList} onChange={setModel} />
      }
    </>
  )
}


export default memo(ModelSelectorWrapper);