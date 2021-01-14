import React from "react";
import TrackVisibility from "react-on-screen";
import { PRepItem } from "..";
import SWR from "../../apis/swr";

interface Props {
  pRepName: string;
  username: string;
}

const PRepItemContainer: React.SFC<Props> = ({ pRepName, username }) => {
  const [fetchData, setFetchData] = React.useState<boolean>(false);
  const { data } = SWR.useGetProposalsStatus(username, fetchData);

  return (
    <TrackVisibility once>
      {({ isVisible }) => (
        <PRepItem
          key={username}
          name={pRepName}
          openCnt={data ? data.openCnt : 0}
          closeCnt={data ? data.closeCnt : 0}
          link={`/proposals/${username}`}
          isLoading={!data}
          isVisible={isVisible}
          fetchData={() => setFetchData(true)}
        />
      )}
    </TrackVisibility>
  );
};

export default PRepItemContainer;
