import React from "react";
import { PRepList, Loader } from "..";
import { PRepListItem } from "../../types";
import useDebounce from "../../hooks/useDebounce";
import SWR from "../../apis/swr";

const sortPRepList = (
  data: PRepListItem[]
): {
  [key: string]: PRepListItem[];
} => {
  const dataMap: {
    [key: string]: PRepListItem[];
  } = {};
  data
    .sort((a, b) => a.pRepName.localeCompare(b.pRepName))
    .map((pRep) => {
      const firstChar = pRep.pRepName.trim()[0].toUpperCase();
      if (!dataMap[firstChar]) {
        dataMap[firstChar] = [];
      }
      dataMap[firstChar] = [...dataMap[firstChar], pRep];
      return false;
    });

  return dataMap;
};

const PRepListContainer: React.SFC = () => {
  const [keyword, setKeyword] = React.useState<string>("");
  const debouncedKeyword = useDebounce(keyword, 200);
  const { data = [] } = SWR.useGetPReps();
  const [filteredData, setFilteredData] = React.useState<PRepListItem[]>(data);

  const _setFilteredData = React.useCallback(() => {
    setFilteredData(
      data.filter((data) =>
        new RegExp(debouncedKeyword, "i").test(data.pRepName)
      )
    );
  }, [data, debouncedKeyword]);

  React.useEffect(() => {
    _setFilteredData();
  }, [_setFilteredData]);

  if (data.length === 0) {
    return <Loader height={438} />;
  }

  return (
    <PRepList
      data={sortPRepList(filteredData!)}
      keyword={keyword}
      setKeyword={setKeyword}
    />
  );
};

export default PRepListContainer;
