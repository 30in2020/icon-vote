import React from "react";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor as ReactEditor } from "@toast-ui/react-editor";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";

interface Props {}

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    paddingTop: 30,
  },
}));

const Editor: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const {} = props;

  return (
    <div className={classes.wrap}>
      <ReactEditor
        initialValue=""
        previewStyle="tab"
        height="345px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
      />
    </div>
  );
};

export default Editor;
