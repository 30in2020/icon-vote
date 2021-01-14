import React, {
  useState,
  useCallback,
  useRef,
  RefObject,
  CSSProperties,
} from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";
import useOutsideClick from "../../hooks/useOutsideClick";
import ArrowIcon from "../../assets/arrow@2x.png";
import DropdownHead from "../../assets/dropdown-head@2x.png";
import Profile from "../../assets/profile@2x.png";

export interface IDropdownMenu {
  icon: string;
  iconHover: string;
  //TODO: Delete iconSize
  iconSize: string;
  text: string;
  onClick: () => void;
}

export enum DropdownType {
  FILTER,
  MENU,
}

function isFilterDropdown(dropdownType: DropdownType) {
  return dropdownType === DropdownType.FILTER;
}

interface DropdownMenuProps {
  menu: IDropdownMenu;
  onClick: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
  const classes = useDropdownMenuStyles(props);
  let { menu, onClick } = props;

  return (
    <li className={classes.wrap} onClick={onClick}>
      {menu.text}
    </li>
  );
};

interface Props {
  menuList: IDropdownMenu[];
  dropdownType: DropdownType;
  style?: CSSProperties;
}

const Dropdown: React.FC<Props> = (props) => {
  const classes = useStyles(props);
  const { menuList, dropdownType, style = {} } = props;
  const ref = useRef<HTMLUListElement>();
  const [selectedIdx, setIdx] = useState<number>(0);
  const [isDropdownOpened, handleDropdown] = useState<boolean>(false);

  const toggleDropdown = useCallback(() => {
    handleDropdown(!isDropdownOpened);
  }, [isDropdownOpened]);

  const handleClick = useCallback(
    (onClick: () => void, idx: number) => {
      if (isFilterDropdown(dropdownType)) {
        setIdx(idx);
      }
      onClick();
      toggleDropdown();
    },
    [dropdownType, toggleDropdown]
  );

  useOutsideClick(ref, () => {
    if (isDropdownOpened) toggleDropdown();
  });

  return (
    <div onClick={toggleDropdown} className={classes.wrap}>
      <div className={classes.toggle}>
        {isFilterDropdown(dropdownType) ? (
          menuList[selectedIdx].text
        ) : (
          <div className={classes.thumbnail} />
        )}
      </div>
      {isDropdownOpened && (
        <ul
          style={style}
          className={classes.dropdown}
          ref={ref as RefObject<HTMLUListElement>}
        >
          {menuList.map((menu, i) => {
            return (
              <DropdownMenu
                key={i}
                menu={menu}
                onClick={() => handleClick(menu.onClick, i)}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

const useDropdownMenuStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    width: 178,
    height: 46,
    backgroundColor: theme.mono1,
    fontSize: "1.6rem",
    fontWeight: theme.semiBold,
    color: theme.primary1,
    backgroundImage: ({ menu }: DropdownMenuProps) => `url(${menu.icon})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "24px center",
    backgroundSize: ({ menu }: DropdownMenuProps) => menu.iconSize,
    "&:hover": {
      backgroundImage: ({ menu }: DropdownMenuProps) =>
        `url(${menu.iconHover})`,
      color: theme.mono1,
      backgroundColor: theme.primary1,
    },
    display: "flex",
    alignItems: "center",
    paddingLeft: 64,
    "&:first-of-type": {
      borderRadius: "8px 8px 0px 0px",
    },
    "&:last-of-type": {
      borderRadius: "0px 0px 8px 8px",
    },
    cursor: "pointer",
  },
}));
const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    position: "relative",
    background: `url(${ArrowIcon}) right center no-repeat`,
    backgroundSize: "20px 14px",
    paddingRight: 30,
    cursor: "pointer",
  },
  toggle: {
    fontWeight: theme.semiBold,
    fontSize: "1.8rem",
    color: theme.primary1,
  },
  dropdown: {
    zIndex: 99999,
    position: "absolute",
    top: 42,
    left: -96,
    border: `1px solid #00b8cc8a`,
    borderRadius: 10,
    "&:before": {
      content: '""',
      display: "block",
      background: `url(${DropdownHead}) center center no-repeat`,
      backgroundSize: "37px 14px",
      marginTop: -14,
      marginLeft: 116,
      width: 37,
      height: 14,
    },
  },
  thumbnail: {
    width: 50,
    height: 50,
    background: `url(${Profile}) center center no-repeat`,
    backgroundSize: "50px 50px",
  },
}));

export default Dropdown;
