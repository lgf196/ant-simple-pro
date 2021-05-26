import React, { memo, useState, useCallback } from 'react';
import PageLayout from '@/layouts/pageLayout';
import Editor from 'for-editor';

const Markdown = memo(function Markdown(props) {
  const [value, setValue] = useState(`# ant-simple-pro
#### 简洁，美观，快速上手，支持3大框架(vue3.0,react,angular,typescript)`);

  const handleChange = useCallback((val) => {
    setValue(val);
  });

  return (
    <PageLayout>
      <Editor
        value={value}
        onChange={(val) => handleChange(val)}
        subfield={true}
        preview={true}
      />
    </PageLayout>
  );
});

export default Markdown;
