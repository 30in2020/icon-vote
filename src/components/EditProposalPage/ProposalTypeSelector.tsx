import React, { useState, SetStateAction } from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import { ProposalType } from "../../types";
import RepresentativeIcon from "../../assets/rep-type-icon@2x.png";
import RepresentativeIconHover from "../../assets/rep-type-icon--hover@2x.png";
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

const useProposalTypeSelectorCardStyles = createUseStyles(
  (theme: ThemeType) => ({
    wrap: {
      marginTop: 35,
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      width: 320,
      height: 246,
      padding: 36,
      textAlign: "center",
      color: theme.secondary1,
      backgroundColor: theme.mono1,
      backgroundImage: (props: ProposalTypeSelectorCardProps) =>
        `url(${props.icon})`,
      backgroundSize: "74px 74px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center 32px",
      boxShadow: `0px 17px 19px -5px rgba(0,107,131,0.2)`,
      border: `1px solid ${theme.secondary3}`,
      borderRadius: 10,
      "&.selected": {
        color: theme.mono1,
        backgroundColor: theme.primary1,
        backgroundImage: (props: ProposalTypeSelectorCardProps) =>
          `url(${props.hoverIcon})`,
        backgroundSize: "74px 74px",
        boxShadow: `0px 15px 15px 5px rgba(0,184,204,0.3)`,
      },
      "&:hover": {
        opacity: 0.8,
      },
    },
    title: {
      paddingTop: 2,
      fontWeight: theme.bold,
      fontSize: "2.4rem",
    },
    desc: {
      fontSize: "1.8rem",
    },
  })
);

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

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "77%",
    margin: "0 auto",
  },
}));

const ProposalTypeSelector: React.SFC<ProposalTypeSelectorProps> = (props) => {
  const classes = useStyles(props);
  const { selectedProposalType, setProposalType } = props;

  return (
    <div className={classes.wrap}>
      <ProposalTypeSelectorCard
        type={ProposalType.REPRESENTATIVE}
        selectedProposalType={selectedProposalType}
        title={"Representative vote"}
        desc={"A proposal that only your\nvoters can vote on"}
        icon={RepresentativeIcon}
        hoverIcon={RepresentativeIconHover}
        onClick={setProposalType}
      />
      <ProposalTypeSelectorCard
        type={ProposalType.COMMUNITY}
        selectedProposalType={selectedProposalType}
        title={"Community vote"}
        desc={"A proposal that anyone can\nvote on"}
        icon={CommunityIcon}
        hoverIcon={CommunityIconHover}
        onClick={setProposalType}
      />
    </div>
  );
};

export default ProposalTypeSelector;
