import React, { useMemo } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

export default function Braft(props) {
  const { value, onChange, ...restProps } = props
  const onEditorChange = useMemo(() => {
    return  onChange && onChange()
  }, [onChange])

  return (
    <BraftEditor
      {...restProps}
      value={BraftEditor.createEditorState(value)}
      onChange={onEditorChange}
    />
  )
}
