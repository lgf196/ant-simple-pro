import useSetState from './useSetState'

const useModelLayout = (labelColSm: number = 6, wrapperColSm: number = 18, labelColXs: number = 24, wrapperColXs: number = 24) => {
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

  return [formItemLayout] as const;
}
export default useModelLayout
