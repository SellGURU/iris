/* eslint-disable no-useless-escape */
import { useEffect } from 'react';
import Auth from '../../api/Auth';
import { useLocalStorage } from "@uidotdev/usehooks";

const CheckExpiredData = () => {
  let [accessToken, setAccessToken] = useLocalStorage("token");
  let [uv_token_type,setUvTokenType ] = useLocalStorage("uv_token_type");
  let [uv_token,setUvToken ] = useLocalStorage("uv_token");
  const refreshToken = async () => {
    try {

      // Make the refresh token request
      const response = Auth.refreshToken({
        token:accessToken.replace(/\"/g, ''),
        uv_token:uv_token,
        uv_token_type:uv_token_type
      })
    //   const response = await fetch('/api/refresh-token', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ refreshToken }),
    //   });

      if ((await response).data.status!='success') {
        throw new Error('Failed to refresh token');
      }

      // const data = await (await response).data.json();
      // Assuming the response contains a new access token
      setAccessToken((await response).data.token);
      setUvToken((await response).data.uvToken)
      setUvTokenType((await response).data.uvTokenType)
    } catch (error) {
      console.error('Error refreshing token:', error);
      // Handle error (e.g., log out user, show message, etc.)
    }
  };

  const calculateTokenExpirationTime = (token) => {
    // Decode the JWT token to get the expiration (in seconds)
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
    return decoded.exp * 1000; // Return expiration in milliseconds
  };

  const checkTokenExpiration = () => {
    if (!accessToken) return;

    const expirationTime = calculateTokenExpirationTime(accessToken);
    const timeLeft = expirationTime - Date.now();
    console.log(timeLeft)
    // Check if there are less than 10 minutes remaining
    if (timeLeft < 900000 && timeLeft > 0) {
      refreshToken();
    }
  };

  useEffect(() => {
    // Check token expiration every 5 minutes (300,000 ms)
    checkTokenExpiration()
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 180000); // 5 minutes

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [accessToken]);

  return (
    <></>
  );
};

export default CheckExpiredData;