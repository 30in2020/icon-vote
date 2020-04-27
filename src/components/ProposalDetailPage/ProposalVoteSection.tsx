import React, { useCallback, useState } from "react";

import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import { Button, ProposalOption } from "../";
import { ProposalOptionModel } from "../../types";

interface Props {
  options: ProposalOptionModel[];
  minApprovalRate: number;
}

const useStyles = createUseStyles((theme: ThemeType) => ({
  proposal__vote__options: {
    paddingRight: "6%",
  },
  proposal__vote__button: {
    display: "flex",
    alignItems: "center",
    paddingTop: "29px",
    marginLeft: "5.5%",
    "& > p": {
      fontWeight: theme.semiBold,
      color: theme.primary1,
      paddingLeft: 27,
    },
  },
}));

const ProposalVoteSection: React.SFC<Props> = (props) => {
  const classes = useStyles(props);

  const { options, minApprovalRate } = props;

  const [selectedOption, setOption] = useState<number>(-1);

  const onClick = useCallback((selectedIdx: number) => {
    setOption(selectedIdx);
  }, []);

  return (
    <>
      <div className={classes.proposal__vote__options}>
        {options.map((option, i) => (
          <ProposalOption
            key={option.name}
            option={option}
            isSelectMode={true}
            isSelected={selectedOption === i}
            onClick={() => onClick(i)}
          />
        ))}
      </div>
      <div className={classes.proposal__vote__button}>
        <Button text="Vote" />
        <p>An option needs {minApprovalRate}% for it to be approved</p>
      </div>
    </>
  );
};

export default ProposalVoteSection;
