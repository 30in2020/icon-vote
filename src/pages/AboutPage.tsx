import React from "react";
import { createUseStyles } from "react-jss";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { ThemeType } from "../styles/theme";
import { Button } from "../components";
import about_hero from "../assets/about_hero.png";
import about_icon from "../assets/about_icon.png";
import about_image1 from "../assets/about_image1.png";
import about_image2 from "../assets/about_image2.png";
import about_image3 from "../assets/about_image3.png";

const AboutPage: React.SFC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.about}>
      <div className={classes.hero}>
        <div>
          <h2>Feedback made easy</h2>
          <div className={classes.textWrap}>
            <p>
              ICON Vote is a voting platform that helps public representatives
              (P-Reps) communicate with ICX investors.
            </p>
            <p>
              P-Reps can use it to crowdsource opinions and understand what's
              expected of them. Voters can weigh in on policies and initiatives
              they care about. And the results get recorded on the blockchain,
              so they're indisputable.
            </p>
          </div>
        </div>
      </div>
      <div className={clsx(classes.content, classes.content_1)}>
        <h3>Submit a proposal</h3>
        <img width="701" src={about_image1} alt="Submit a proposal" />
        <div className={classes.textWrap}>
          <p>
            If you're a P-Rep, you can create proposals to get feedback about
            governance, project initiatives, partnerships, funding, and more.
          </p>
          <p>
            Propose a vote to the community or your fans – whichever audience
            matters the most. Set the minimum approval rate for an option to
            guarantee the best outcome. For fan proposals, you can also choose
            the percentage of voters that need to participate.
          </p>
        </div>
      </div>
      <div className={clsx(classes.content, classes.content_2)}>
        <h3>Browse proposals and P-Reps</h3>
        <img width="701" src={about_image2} alt="Browse proposals and P-Reps" />
        <div className={classes.textWrap}>
          <p>
            View all the latest proposals, or browse by P-Rep. Anyone with
            staked ICX can vote on community proposals, but you can only vote on
            fan proposals for the P-Reps you support.
          </p>
          <p>
            Use a P-Rep's proposals to assess their focus, and see how often
            they involve the community in their decisions. Their profile page
            also displays their vote history, so you can support P-Reps that
            represent your interests.
          </p>
        </div>
      </div>
      <div className={clsx(classes.content, classes.content_3)}>
        <h3>Vote on a proposal</h3>
        <div className={classes.textWrap}>
          <img
            width="701"
            height="205"
            src={about_image3}
            alt="Vote on a proposal"
          />
          <p>
            Vote on proposals that are important to you. Whether it's to weigh
            in on policy decisions or support projects you want to succeed, your
            votes can help shape the ICON ecosystem.
          </p>
          <p>
            After you vote, your choice will appear on your profile page, so you
            can keep track as the vote progresses. But don't worry, only a
            P-Rep's votes are public.
          </p>
        </div>
      </div>
      <div className={clsx(classes.content, classes.footer)}>
        <h3>Get started</h3>
        <div className={classes.textWrap}>
          <p>
            Register an account and verify your ICON address. <br />
            Then find a proposal to vote on.
          </p>
        </div>
        <Button
          style={{
            width: 180,
            marginTop: 20,
          }}
          text="Browse proposals"
          onClick={() => history.push("/latest-proposals")}
        />
      </div>
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  about: {
    marginTop: 30,
    color: theme.secondary1,
    "& h2": {
      fontSize: "4.8rem",
      fontWeight: theme.bold,
      [theme["breakpoint-xs"]]: {
        fontSize: "3.2rem",
        textAlign: "center",
      },
    },
  },
  hero: {
    display: "flex",
    alignItems: "flex-end",
    height: 730,
    backgroundImage: `url(${about_hero}), url(${about_icon})`,
    backgroundPosition: "center top, left top",
    backgroundRepeat: "no-repeat, no-repeat",
    backgroundSize: "1110px 514px, 100% auto",
    [theme["breakpoint-md"]]: {
      backgroundSize: "100% auto, 100% auto",
      height: "60vw",
    },
    [theme["breakpoint-sm"]]: {
      height: "78vw",
    },
    [theme["breakpoint-xs"]]: {
      height: 500,
    },
    "& > div": {
      margin: "0 auto",
    },
  },
  textWrap: {
    width: 498,
    margin: "0 auto",
    [theme["breakpoint-xs"]]: {
      width: "100%",
      padding: `0 ${theme.gap}px`,
    },
    "& p": {
      width: 498,
      fontWeight: theme.semiBold,
      marginTop: 20,
      [theme["breakpoint-xs"]]: {
        width: "100%",
      },
    },
  },
  content: {
    [theme["breakpoint-xs"]]: {
      width: "100%",
    },
    "& h3": {
      textAlign: "center",
      fontSize: "3.6rem",
      fontWeight: theme.bold,
      marginTop: 100,
      [theme["breakpoint-xs"]]: {
        fontSize: "2.6rem",
      },
    },
    "& img": {
      margin: "30px auto 0px",
      height: "auto",
      [theme["breakpoint-xs"]]: {
        padding: `0 ${theme.gap}px`,
      },
    },
  },
  content_1: {},
  content_2: {
    "& p:first-of-type": {
      marginTop: 35,
    },
  },
  content_3: {
    "& p:first-of-type": {
      marginTop: 35,
    },
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    paddingBottom: 256,
    [theme["breakpoint-xs"]]: {
      paddingBottom: 200,
    },
    "& > p:first-of-type": {
      marginTop: 10,
    },
  },
}));

export default AboutPage;
