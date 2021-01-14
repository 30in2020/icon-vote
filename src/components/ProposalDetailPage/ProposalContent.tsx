import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import { Viewer } from "@toast-ui/react-editor";

interface Props {
  content: string;
}

const ProposalContent: React.SFC<Props> = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.wrap}>
      <div className="content">
        <Viewer initialValue={props.content} />
      </div>
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    width: "67%",
    marginTop: 20,
    marginBottom: 100,
    lineHeight: "2.7rem",
    wordBreak: "break-all",
    // "& .tui-editor-contents p": {
    //   margin: "20px 0",
    //   color: theme.secondary1,
    //   fontSize: "1.6rem",
    // },
    // "& .tui-editor-contents span": {
    //   color: `${theme.secondary1}!important`,
    //   fontSize: "1.6rem",
    // },
    // "& .tui-editor-contents br": {
    //   content: '""',
    //   display: "block",
    //   margin: "20px 0",
    // },
    // "& .tui-editor-contents strong": {
    //   marginRight: 5,
    //   fontWeight: theme.bold,
    //   fontSize: "1.8rem",
    // },
    // "& .tui-editor-contents a": {
    //   color: theme.primary1,
    //   textDecoration: "underline",
    // },
    // "& .tui-editor-contents hr": {
    //   border: "none",
    //   borderTop: `1px solid ${theme.secondary3}`,
    // },
    [theme["breakpoint-sm"]]: {
      width: "100%",
    },
  },
}));

export default ProposalContent;
