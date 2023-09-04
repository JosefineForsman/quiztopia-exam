export const deleteUserQuizById = async (quizId: string): Promise<boolean> => {
    const token = sessionStorage.getItem('token')
    const settings = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
  
    const url: string = `https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/${quizId}`;
  
    try {
      const response = await fetch(url, settings);
      const data = await response.json();
      console.log(data);
  
      return data.success;
    } catch (error) {
      console.error(error);
      return false;
    }
  };