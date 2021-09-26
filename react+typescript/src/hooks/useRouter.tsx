import { useMemo } from "react";
import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import queryString from 'query-string';

/**
 * @author lgf
 * @description 对router的封装操作
 */

const useRouter=()=> {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  return useMemo(() => {
    return {
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      // 获取地址栏的参数，将字符串转为json
      // 例如: /:topic?sort=popular -> { topic: "react", sort: "popular" }
      query: {
        ...queryString.parse(location.search),
        ...params
      },
      match,
      location,
      history
    };
  }, [params, match, location, history]);
};

export default useRouter;
