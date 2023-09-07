import { ApiResponse } from "../interfaces";

export async function createUser(username: string, password: string): Promise<boolean>{

  try{
    const settings = {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      })
    };
    const url: string = `https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup`;
    const response = await fetch(url, settings);

    if (!response.ok){
      throw new Error(`${response.status} ${response.statusText}`)
    }
    const data: ApiResponse = await response.json();
    console.log(data);
  
    return data.success;
  } catch (error){
    console.log(error);
    return false;
  }

}