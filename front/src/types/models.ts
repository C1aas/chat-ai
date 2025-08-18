interface BaseModelInfo {
  id: string;
  object: "model";
  input: string[];
  output: string[];
  owned_by: string;
  name: string;
  demand: number;
  status: "ready" | "offline";
  created: number;
  extended: false;
};

interface ExtendedModelInfo extends Omit<BaseModelInfo, 'extended'> {
  extended: true;
  release_date: string;
  company: string;
  model_family: string;
  context_length: string;
  num_parameters: string;
  description: string;
};

export type ModelInfo = BaseModelInfo | ExtendedModelInfo;