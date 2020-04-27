import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import clsx from "clsx";

interface Props {
  content: string;
}

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    width: "67%",
    marginTop: 20,
    marginBottom: 100,
    lineHeight: "2.7rem",
    color: theme.secondary1,
    "& p": {
      margin: "20px 0",
    },
    "& br": {
      content: '""',
      display: "block",
      margin: "20px 0",
    },
    "& strong": {
      marginRight: 5,
      fontWeight: theme.bold,
      fontSize: "1.8rem",
    },
    "& a": {
      color: theme.primary1,
      textDecoration: "underline",
    },
  },
}));

const ProposalContent: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const {} = props;
  // TODO: Markdown에 전부 대응하는 디자인 만들어야함.
  return (
    <div className={classes.wrap}>
      <div className="content">
        <p>
          <strong>Goal</strong>: The ICON ecosystem, as a digital nation, needs
          more DAOs to be built to increase the blockchain activity and active
          wallet numbers, which will ultimately increase its attractiveness as a
          blockchain. We believe we need to embrace more developers to make it
          happen. Thus, we would like to propose using part of the block reward
          from ICX Station for one of the options mentioned below and would like
          opinion of our voters.
        </p>
        <p>
          <strong>Option 1.</strong>
          <br />
          MLH operates student hackathons and ICON Foundation is working with
          them to host weekly workshops across the world with developers. We
          would like to propose distributing a small amount of ICX (&lt;$10) to
          each developer who participates in the workshop so that he or she can
          start following ICX and participate in the ICON ecosystem.
          <br />
          MLH: <a href="https://mlh.io/">https://mlh.io/</a>
          <br />
          ICON workshop hosted by MLH:{" "}
          <a href="https://localhost.mlh.io/activities/icon/">
            https://localhost.mlh.io/activities/icon/
          </a>
        </p>
        <p>
          <strong>Option 2.</strong>
          <br />
          ICX Station is based in San Francisco and there are a few P-reps in
          San Francisco, such as Insight and Blockchain at Berkeley, that have
          access to a group of students interested in blockchain. We can host
          offline workshops for developers with other P-reps and distribute a
          small amount of ICX (&lt;$10) to each developer so that he or she can
          gain more interest in the ICON ecosystem.
          <br />
          Insight Consensus:{" "}
          <a href="https://www.insightconsensus.com/">
            https://www.insightconsensus.com/
          </a>
          <br />
          Blockchain at Berkeley:{" "}
          <a href="https://blockchain.berkeley.edu/">
            https://blockchain.berkeley.edu/
          </a>
        </p>
        <p>
          <strong>Option 3.</strong>
          <br />
          We can officially start an ICON Ambassador program for developers, who
          can start building more simple dapps, provide documentation around it,
          and answer other developers’ questions.
          <br />
          Main ICON developer channel:{" "}
          <a href="https://t.me/icondevs">https://t.me/icondevs</a>
        </p>
        <p>
          <strong>Option 4.</strong>
          <br />
          ICONbet has been a leading dapp on ICON ecosystem and they are trying
          to build a platform of exciting games. We can provide grants to
          developers who are interested in building games on top of ICONbet,
          given that they get the community’s consent.
          <br />
          ICONbet website: <a href="https://iconbet.io/">https://iconbet.io/</a>
          <br />
          ICONbet telegram channel:{" "}
          <a href="https://t.me/iconbet_official">
            https://t.me/iconbet\_official
          </a>
        </p>
      </div>
    </div>
  );
};

export default ProposalContent;
