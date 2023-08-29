import { SuccessLogin } from "../interfaces";
  
  export async function logInUser(username: string, password: string): Promise<SuccessLogin> {
    const user = {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      })
    };
    const url: string = `https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/login`;
    const response = await fetch(url, user);
    const data: SuccessLogin = await response.json();
    console.log(data);
  
    return data;
  }