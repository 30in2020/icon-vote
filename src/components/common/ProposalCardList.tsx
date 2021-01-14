import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import { SubTitle, ProposalCardContainer } from "..";
import { ProposalCardModel } from "../../types";
import ProposalFilterDropdown from "./ProposalFilterDropdown";
import useProposalFilter from "../../hooks/useProposalFilter";

interface Props {
  proposals: ProposalCardModel[];
  hasFilter: boolean;
  pRepName?: string;
}

const ProposalCardList: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { proposals, hasFilter, pRepName } = props;
  const {
    filteredData,
    proposalTypeFilter,
    setProposalTypeFilter,
  } = useProposalFilter<ProposalCardModel>(proposals);

  const proposalTypeFilterString =
    (proposalTypeFilter ? proposalTypeFilter.toLowerCase() : "") + " proposal";

  return (
    <>
      {hasFilter && (
        <div className={classes.header}>
          <SubTitle
            style={{ marginBottom: 54 }}
            text="Proposals"
            dropdown={
              <ProposalFilterDropdown
                setProposalTypeFilter={setProposalTypeFilter}
              />
            }
          />
        </div>
      )}
      {filteredData.length === 0 && (
        <div className={classes.none}>
          <p>{`${
            pRepName || "P-Rep"
          } hasn't created a ${proposalTypeFilterString} yet`}</p>
        </div>
      )}
      <div className={classes.wrap}>
        {filteredData.map((proposal, i) => {
          return <ProposalCardContainer key={i} proposal={proposal} />;
        })}
      </div>
    </>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  header: {},
  wrap: {
    display: "flex",
    flexWrap: "wrap",
    [theme["breakpoint-xs"]]: {
      flexDirection: "column",
    },
  },
  none: {
    width: "100%",
    padding: "70px 0px 100px",
    color: theme.secondary1,
    fontWeight: theme.semiBold,
    textAlign: "center",
  },
}));

export default ProposalCardList;
