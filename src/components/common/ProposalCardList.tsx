import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import { ProposalCard } from "..";
import { ProposalType, ProposalModel } from "../../types";

interface Props {
  proposals: ProposalModel[];
}

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 42,
  },
}));

const ProposalCardList: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { proposals } = props;

  return (
    <div className={classes.wrap}>
      {proposals.map((proposal) => {
        return <ProposalCard proposal={proposal} />;
      })}
    </div>
  );
};

export default ProposalCardList;
