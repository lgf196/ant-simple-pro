import React, { useCallback } from 'react';
import BraftEditor, { BraftEditorProps } from 'braft-editor';
import 'braft-editor/dist/index.css';

export default function Braft(props: BraftEditorProps) {
  const { value, onChange, ...restProps } = props;
  const onEditorChange = useCallback(
    (e) => {
      return onChange && onChange(e);
    },
    [onChange],
  );

  return (
    <BraftEditor
      {...restProps}
      value={BraftEditor.createEditorState(value)}
      onChange={onEditorChange}
    />
  );
}
