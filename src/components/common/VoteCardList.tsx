import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import { VoteCardModel } from "../../types";
import { Card, SubTitle } from "../";
import useProposalFilter from "../../hooks/useProposalFilter";
import ProposalFilterDropdown from "./ProposalFilterDropdown";

interface Props {
  votes: VoteCardModel[];
  name: string;
}

const VoteCardList: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { votes, name } = props;
  const {
    filteredData,
    proposalTypeFilter,
    setProposalTypeFilter,
  } = useProposalFilter<VoteCardModel>(votes);

  const proposalTypeFilterString =
    (proposalTypeFilter ? proposalTypeFilter.toLowerCase() : "any") +
    " proposals";

  return (
    <>
      <SubTitle
        style={{ marginBottom: 54 }}
        text="Votes"
        dropdown={
          <ProposalFilterDropdown
            setProposalTypeFilter={setProposalTypeFilter}
          />
        }
      />
      {filteredData.length === 0 && (
        <div className={classes.none}>
          <p>{`${name} hasn't voted on ${proposalTypeFilterString} yet`}</p>
        </div>
      )}
      <div className={classes.wrap}>
        {filteredData.map((vote, i) => {
          return <Card key={i} item={vote} />;
        })}
      </div>
    </>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    display: "flex",
    flexWrap: "wrap",
  },
  none: {
    width: "100%",
    padding: "70px 0px 100px",
    color: theme.secondary1,
    fontWeight: theme.semiBold,
    textAlign: "center",
  },
}));

export default VoteCardList;
