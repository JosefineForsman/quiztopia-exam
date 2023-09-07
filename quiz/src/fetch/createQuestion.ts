
const sendQuizQuestion = async (
  quizId: string,
  question: string,
  answer: string,
  longitude: string,
  latitude: string
): Promise<void> => {
  const token = sessionStorage.getItem('token');

  const data = {
        "name": quizId,
        "question": question,
        "answer": answer,
        "location": {
          "longitude": longitude,
          "latitude": latitude
      }
  };
  console.log('post question data', data)

  const info = {
      method: "POST",
      headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  try {
    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/question';
    const response = await fetch(url, info);
    const responseData= await response.json();
    console.log(responseData)
    if (!response.ok) {
      throw new Error('Request failed');
    }


    if (!responseData.success) {
      throw new Error('Quiz question not added successfully');
    }

    localStorage.setItem('quizObject', JSON.stringify(responseData));

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export { sendQuizQuestion };