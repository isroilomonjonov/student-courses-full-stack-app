import { useContext, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { testById } from "../../api/tests-api";
import "./QuizStyle.css";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { submitResult } from "../../api/results-api";
import AppContext from "../../context/AppContext";

const Quiz = () => {
  const { send: getTestById, data } = useHttp(testById);
  const { send: submit } = useHttp(submitResult);
  const params = useParams();
  const ctx = useContext(AppContext);

  useEffect(() => {
    getTestById({ id: params.id });
  }, []);

  const [showResult, setShowResult] = useState(false);
  console.log(data);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    extraScore: 0,
  });
  useEffect(() => {
    console.log(result);
  }, [result]);
  useEffect(() => {
    if (showResult) {
      submit({ data: result, testId: params.id, userId: ctx.user.id });
    }
  }, [showResult]);
  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);
  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: Math.floor(((prev.correctAnswers + 1) / data[0]?.questions?.length) * 100),
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (activeQuestion !== data[0]?.questions?.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (
      answer ===
      data[0]?.questions[activeQuestion]?.answers?.filter((a) => a.isTrue)[0]
        .text
    ) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };
  return (
    <Layout>
      <div className="allContainer">
        {!showResult ? (
          data && (
            <div className="quiz-container">
              <div>
                <span className="active-question-no">
                  {addLeadingZero(activeQuestion + 1)}
                </span>
                <span className="total-question">
                  /{addLeadingZero(data[0]?.questions.length)}
                </span>
              </div>
              <h2>{data[0]?.questions[activeQuestion]?.question}</h2>
              <ul>
                {data[0]?.questions[activeQuestion]?.answers.map(
                  (item, index) => (
                    <li
                      className={
                        selectedAnswerIndex === index ? "selected-answer" : null
                      }
                      onClick={() => onAnswerSelected(item.text, index)}
                      key={item.id}
                    >
                      {item.text}
                    </li>
                  )
                )}
              </ul>
              <button
                onClick={onClickNext}
                disabled={selectedAnswerIndex === null}
              >
                {activeQuestion === data[0]?.questions?.length - 1
                  ? "Finish"
                  : "Next"}
              </button>
            </div>
          )
        ) : (
          <div className="result">
            <h3>Result</h3>
            <div className="resultContainer">
              <p>
                Total Question: <span>{data[0]?.questions?.length}</span>
              </p>
              <p>
                Total Score:<span> {result.score}</span>
              </p>
              <p>
                Correct Answers:<span> {result.correctAnswers}</span>
              </p>
              <p>
                Wrong Answers:<span> {result.wrongAnswers}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default Quiz;
