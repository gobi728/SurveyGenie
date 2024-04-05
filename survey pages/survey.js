const apiKey =  "YOUR_API_HERE"

async function run(question, textAnswer, option) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Generate a concise, text-based question in English focusing on the quality aspect of ${option} 
            in a survey context. Utilize insights from the preceding question '${question}' and its response '${textAnswer}' 
            to inform the question generation process. Ensure that the generated question remains pertinent to the specific quality aspect under 
            examination and maintains logical coherence with the preceding context. Please provide only the question and refrain from including any additional information.`,
          },
        ],
      }),
    });

    const responseData = await response.json();
    const responseText = responseData.choices[0].message.content;
    return responseText;
  } catch (error) {
    console.error('Failed to generate response:', error);
    throw error;
  }
}

const option = localStorage.getItem('type');

const question = document.querySelector('#question');
const progressText = document.querySelector('#progressText');
const progressBarFull = document.querySelector('#progressBarFull');
const submit = document.querySelector('#submit');
//run();

let currentQuestion = {};
let acceptingAnswers = true
let questionCounter = 0
let availibleQuestions = []
let questionsIndex = -1
let textAnswer = ""



let questions = [
  {
    question: "What is the "+option+" quality like in your area?"
  },
  {
    question: run(question, textAnswer, option)
  },
  {
    question: run(question, textAnswer, option)
  },
  {
    question: run(question, textAnswer, option)
  }
]

const MAX_QUESTIONS = 4
let startSurvey = "";
let getNewQuestions = "";
let enter = "";

startSurvey = () => {
  questionCounter = 0
  questionsIndex=-1
  availibleQuestions = [...questions]
  getNewQuestions()
}

getNewQuestions = () =>{
  if((questionCounter+1)>MAX_QUESTIONS){
    none;
  }
  else{
    questionCounter++
    questionsIndex++
    console.log(run(question, textAnswer, option))
    textAnswer = document.getElementById("answerTextArea").value
    progressText.innerHTML = ('Question '+questionCounter+' of '+MAX_QUESTIONS)
    progressBarFull.style.width = (((questionCounter/MAX_QUESTIONS)*100)+'%')
    currentQuestion = availibleQuestions[questionsIndex]
    async function process(){
      question.innerHTML = await(currentQuestion.question)
    }
    process()

    acceptingAnswers = true
  }
}

submit.onclick = function(){
  if((questionCounter+1)>MAX_QUESTIONS){
    window.location.href = "end.html";
  }
  document.getElementById("answerTextArea").value = ""
  getNewQuestions()
}

startSurvey()