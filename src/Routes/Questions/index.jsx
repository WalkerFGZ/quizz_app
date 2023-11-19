import "../Category/App.css";

import { Button, ConfigProvider, Layout, Modal, Space, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Content } from "antd/es/layout/layout";

const Category = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [listOfAnswers, setListOfAnswers] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
const [questionsCompleted, setQuestionsCompleted] = useState(false);

  const { category } = params;
  let categoryValue = 0;
  if (category === "mythology") {
    categoryValue = 20;
  } else if (category === "sports") {
    categoryValue = 21;
  } else if (category === "history") {
    categoryValue = 23;
  } else if (category === "video_games") {
    categoryValue = 15;
  }

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${categoryValue}&difficulty=easy&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.response_code === 0) {
          const incorrectAnswer = data.results[0].incorrect_answers;
          const correctAnswer = data.results[0].correct_answer;
          const answers = [correctAnswer, ...incorrectAnswer];
          answers.sort(() => Math.random() - 0.5);
          setQuestions(data.results);
          setCurrentQuestion(data.results[0]);
          setListOfAnswers(answers);
        }
      });
  }, []);

  const validateAnswer = (answer) => {
    const correctAnswer = currentQuestion.correct_answer;

    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
      messageApi.open({
        type: "success",
        content: "Correct Answer",
      });
      setScore(score + 1);
    } else {
      messageApi.open({
        type: "error",
        content: `Incorrect Answer. The correct answer is ${correctAnswer}`,
      });
    }

    if (questionIndex === 9) {
        setQuestionsCompleted(true);
        return;
    }
    const nextIncorrectAnswer = questions[questionIndex + 1].incorrect_answers;
    const nextCorrectAnswer = questions[questionIndex + 1].correct_answer;
    const answers = [nextCorrectAnswer, ...nextIncorrectAnswer];

    setCurrentQuestion(questions[questionIndex + 1]);
    setQuestionIndex(questionIndex + 1);
    answers.sort(() => Math.random() - 0.5);
    setListOfAnswers(answers);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#E7E9E2",
        },
      }}
    >
      {contextHolder}
      <Layout className="layout">
        <Space>
          <h2 className="score-title">Score: {score} / 10</h2>
        </Space>
        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <div>
            <h2 className="secondary-title">{currentQuestion?.question}</h2>
            <Button
              block
              className="option-button"
              onClick={() => validateAnswer(listOfAnswers[0])}
            >
              {listOfAnswers[0]}
            </Button>

            <Button
              block
              className="option-button"
              onClick={() => validateAnswer(listOfAnswers[1])}
            >
              {listOfAnswers[1]}
            </Button>

            <Button
              block
              className="option-button"
              onClick={() => validateAnswer(listOfAnswers[2])}
            >
              {listOfAnswers[2]}
            </Button>

            <Button
              block
              className="option-button"
              onClick={() => validateAnswer(listOfAnswers[3])}
            >
              {listOfAnswers[3]}
            </Button>
          </div>
        </Content>
      </Layout>
      <Modal
        title="Score Result"
        centered
        open={questionsCompleted}
        footer={null}
        closable={false}
      >
        <div className="modal-container">
          <p>You scored {score} points. Thanks for playing!</p>
          <Button
            onClick={() => navigate("/")}
            className="modal-return-btn"
          >
            Play Again
          </Button>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default Category;
