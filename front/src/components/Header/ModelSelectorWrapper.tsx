
import { useState, useMemo, useEffect, useRef, memo } from "react";
import Tooltip from "../Others/Tooltip";
import { useUpdateModelsData } from "../../hooks/useUpdateModelsData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,  faMagnifyingGlass, faBrain, faImage, faVideo
} from '@fortawesome/free-solid-svg-icons'

import DemandIndicator from "./DemandIndicator";

import { useGetModelsQuery } from "../../Redux/reducers/appApi";

import ModelSelectorSimple from "./ModelSelectorSimple";
import ModelSelectorExtended from "./ModelSelectorExtended";

export default function ModelSelectorWrapper({}) {
    const { data: modelsList, isLoading, isFetching,} = useGetModelsQuery(undefined, {pollingInterval: 30_000, refetchOnMountOrArgChange: true});


  //render either ModelSelectorSimple or ModelSelectorExtended depending if modelsList contains models with extended==true
  const hasExtendedModels = modelsList?.[0]?.extended === true;

  return (
    <>
      {hasExtendedModels ? <ModelSelectorExtended modelsList={modelsList} /> : <ModelSelectorSimple modelsList={modelsList} />}
    </>
  )
}
