import React from "react";
import { Dropdown, DropdownType } from "..";

import AllIcon from "../../assets/all-icon@2x.png";
import CommunityIcon from "../../assets/community-icon@2x.png";
import FansIcon from "../../assets/fan-icon@2x.png";
import AllIconHover from "../../assets/all-icon--hover@2x.png";
import CommunityIconHover from "../../assets/community-icon--hover@2x.png";
import FansIconHover from "../../assets/fan-icon--hover@2x.png";
import { ProposalType } from "../../types";

interface Props {
  setProposalTypeFilter: React.Dispatch<
    React.SetStateAction<ProposalType | null>
  >;
}

const ProposalFilterDropdown: React.SFC<Props> = ({
  setProposalTypeFilter,
}) => {
  return (
    <Dropdown
      menuList={[
        {
          icon: AllIcon,
          iconHover: AllIconHover,
          iconSize: "34px 20px",
          text: "All",
          onClick: () => setProposalTypeFilter(null),
        },
        {
          icon: CommunityIcon,
          iconHover: CommunityIconHover,
          iconSize: "24px 20px",
          text: "Community",
          onClick: () => setProposalTypeFilter(ProposalType.COMMUNITY),
        },
        {
          icon: FansIcon,
          iconHover: FansIconHover,
          iconSize: "24px 20px",
          text: "Fans only",
          onClick: () => setProposalTypeFilter(ProposalType.FANS),
        },
      ]}
      dropdownType={DropdownType.FILTER}
    />
  );
};

export default ProposalFilterDropdown;
