import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import { ProposalType } from "../../types";
import { Divider } from "../";
import FansIcon from "../../assets/rep-type-icon@2x.png";
import FansIconHover from "../../assets/rep-type-icon--hover@2x.png";
import CommunityIcon from "../../assets/com-type-icon@2x.png";
import CommunityIconHover from "../../assets/com-type-icon--hover@2x.png";
import clsx from "clsx";

interface ProposalTypeSelectorCardProps {
  title: string;
  desc: string;
  icon: string;
  hoverIcon: string;
  type: ProposalType;
  selectedProposalType: ProposalType;
  onClick: (type: ProposalType) => void;
}

const ProposalTypeSelectorCard: React.SFC<ProposalTypeSelectorCardProps> = (
  props
) => {
  const classes = useProposalTypeSelectorCardStyles(props);
  const { title, desc, type, selectedProposalType, onClick } = props;
  const isSelected = type === selectedProposalType;

  return (
    <div
      onClick={() => onClick(type)}
      className={clsx(classes.wrap, isSelected && "selected")}
    >
      <p className={classes.title}>{title}</p>
      <p className={classes.desc}>{desc}</p>
    </div>
  );
};

interface ProposalTypeSelectorProps {
  selectedProposalType: ProposalType;
  setProposalType: (type: ProposalType) => void;
}

const ProposalTypeSelector: React.SFC<ProposalTypeSelectorProps> = (props) => {
  const classes = useStyles(props);
  const { selectedProposalType, setProposalType } = props;

  const components = [
    <ProposalTypeSelectorCard
      type={ProposalType.COMMUNITY}
      selectedProposalType={selectedProposalType}
      title={"Community"}
      desc={"Anyone can participate"}
      icon={CommunityIcon}
      hoverIcon={CommunityIconHover}
      onClick={setProposalType}
    />,
    <ProposalTypeSelectorCard
      type={ProposalType.FANS}
      selectedProposalType={selectedProposalType}
      title={"Fans only"}
      desc={"Only your voters can participate"}
      icon={FansIcon}
      hoverIcon={FansIconHover}
      onClick={setProposalType}
    />,
  ];

  return (
    <div className={classes.wrap}>
      <Divider width={"736px"} components={components} />
    </div>
  );
};

const useProposalTypeSelectorCardStyles = createUseStyles(
  (theme: ThemeType) => ({
    wrap: {
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      width: 297,
      height: 180,
      padding: 24,
      textAlign: "center",
      color: theme.secondary1,
      backgroundColor: theme.mono1,
      backgroundImage: (props: ProposalTypeSelectorCardProps) =>
        `url(${props.icon})`,
      backgroundSize: "60px 60px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center 32px",
      boxShadow: `0px 17px 19px -5px rgba(0,107,131,0.2)`,
      border: `1px solid ${theme.dim}`,
      borderRadius: 10,
      "&.selected": {
        color: theme.mono1,
        backgroundColor: theme.primary1,
        backgroundImage: (props: ProposalTypeSelectorCardProps) =>
          `url(${props.hoverIcon})`,
        backgroundSize: "60px 60px",
        border: "none",
        boxShadow: `0px 15px 15px 5px rgba(0,184,204,0.3)`,
      },
      "&:hover": {
        opacity: 0.8,
      },
      [theme["breakpoint-sm-only"]]: {
        width: "38%",
        height: 200,
      },
      [theme["breakpoint-xs"]]: {
        width: "100%",
      },
    },
    title: {
      paddingBottom: 2,
      fontWeight: theme.bold,
      fontSize: "1.8rem",
    },
    desc: {
      fontSize: "1.6rem",
      fontWeight: theme.semiBold,
    },
  })
);

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    paddingTop: 30,
  },
}));

export default ProposalTypeSelector;
