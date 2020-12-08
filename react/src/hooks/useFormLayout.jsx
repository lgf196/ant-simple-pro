import useSetState from './useSetState'

const useModelLayout = (labelColSm = 6, wrapperColSm = 18, labelColXs = 24, wrapperColXs = 24) => {
  const formItemLayouts = {
    labelCol: {
      xs: { span: labelColXs },
      sm: { span: labelColSm },
    },
    wrapperCol: {
      xs: { span: wrapperColXs },
      sm: { span: wrapperColSm },
    },
  };

  const [formItemLayout] = useSetState(formItemLayouts);

  return [formItemLayout];
}
export default useModelLayout
