import { SuccessLogin } from "../interfaces";
  
  export async function logInUser(username: string, password: string): Promise<SuccessLogin> {
    
    try{
      const user = {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password
        })
      };
      const url: string = `https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/login`;
      const response = await fetch(url, user);

      if(!response.ok){
        throw new Error(`Error: ${response.status}`)
      }

      const data: SuccessLogin = await response.json();
      console.log(data);
    
      return data;
    } catch (error){
      console.log('Error while logging in', error)
      throw error;
    }
  }