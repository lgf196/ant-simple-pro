import { useCallback, useState } from 'react';

const useSetState = ( initialState= { page: 1, size: 20, sort: 'desc' } ) => {

  const [state, set] = useState(initialState);

  const setState = useCallback(
    patch => {
      set(prevState => Object.assign({}, prevState, patch instanceof Function ? patch(prevState) : patch));
    },
    [set]
  );

  return [state, setState]
};

export default useSetState;
