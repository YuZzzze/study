import { request, useModel } from '@umijs/max';
import { useEffect, useState } from 'react';

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { refresh } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const token = JSON.parse(localStorage.getItem('@auth:token') as any);
    const result = await request('http://49.232.147.77:8080/v1/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTimeout(() => {
      setUserInfo(result.data);
      localStorage.setItem('@auth:role', result.data.role);
      refresh();
    }, 3000);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return {
    userInfo,
  };
};

export default useUserInfo;
