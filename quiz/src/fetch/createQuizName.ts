
const createQuiz = async (quizName:string) => {
    const token = sessionStorage.getItem('token');
  
    const info = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name: quizName })
    };
  
    try {
      const url= 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'
      const response = await fetch(url, info);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  export {createQuiz};