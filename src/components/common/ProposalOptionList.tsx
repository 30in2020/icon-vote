import React, { useCallback, Dispatch, SetStateAction } from "react";
import { ProposalOptionModel } from "../../types";
import { ProposalOption } from "../";

export enum ProposalOptionListType {
  UNSELECTABLE,
  SELECTABLE,
  VOTED,
}

export interface Props {
  options: ProposalOptionModel[];
  proposalOptionListType: ProposalOptionListType;
  selectedOption?: number;
  setOption?: Dispatch<SetStateAction<number>>;
}

const ProposalOptionList: React.SFC<Props> = (props) => {
  const {
    options,
    proposalOptionListType,
    selectedOption,
    setOption = () => {},
  } = props;

  const onClick = useCallback(
    (selectedIdx: number) => {
      if (proposalOptionListType === ProposalOptionListType.SELECTABLE) {
        setOption(selectedIdx);
      }
    },
    [proposalOptionListType, setOption]
  );

  return (
    <>
      {options.map((option, i) => (
        <ProposalOption
          key={option.name}
          option={option}
          proposalOptionListType={proposalOptionListType}
          isSelected={selectedOption === i}
          onClick={() => onClick(i)}
        />
      ))}
    </>
  );
};

export default ProposalOptionList;
