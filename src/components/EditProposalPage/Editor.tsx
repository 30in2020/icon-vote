import React, { useRef } from "react";
import "codemirror/lib/codemirror.css";
import "../../styles/toastui-editor.css";

import { Editor as ReactEditor } from "@toast-ui/react-editor";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../styles/theme";

interface Props {
  handleChange: (value: string) => void;
}

const Editor: React.SFC<Props> = (props) => {
  const classes = useStyles(props);
  const { handleChange } = props;
  const editorRef = useRef<any>();
  return (
    <div className={classes.wrap}>
      <ReactEditor
        previewStyle="tab"
        height="400px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        ref={editorRef}
        events={{
          change: (e) => {
            if (editorRef.current) {
              handleChange(editorRef.current.getInstance().getHtml());
            }
          },
        }}
      />
    </div>
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  wrap: {
    paddingTop: 30,
  },
}));

export default Editor;
