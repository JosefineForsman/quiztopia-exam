import { ApiResponse } from "../interfaces";

export const createUser = async (username: string, password: string): Promise<boolean> => {
  const settings = {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password
    })
  };

  const url: string = `https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup`;
  const response = await fetch(url, settings);
  const data: ApiResponse = await response.json();
  console.log(data);

  return data.success;
};