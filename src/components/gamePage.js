import React, { useState } from "react";

const GamePage = () => {
  let [finalArray, setFinalArray] = useState([]);
  let [count, setCount] = useState(0);
  let [showResult, setShowResult] = useState(false);
  let [clicked, setClicked] = useState("");
  let [rightAnswers, setRightAnswers] = useState(0);
  let [badAnswers, setBadAnswers] = useState(0);

  const questionArray = ["Hliník", "Měď", "Nikl", "Olovo", "Titan", "Železo"];

  function shuffleQuestions(array, questionAnswer) {
    let answerInTopFour = false;
    while (!answerInTopFour) {
      for (let i = 0; i < array.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }

      let topFour = array.slice(0, 4);

      for (let i = 0; i < topFour.length; i++) {
        if (topFour[i] == questionAnswer) {
          answerInTopFour = true;
        }
      }
    }
    return array.slice(0, 4);
  }

  function setQuestions() {
    let answer;
    let questionArrayCopy;
    for (let i = 0; i < questionArray.length; i++) {
      questionArrayCopy = [...questionArray];
      answer = [questionArrayCopy[i]];
      let shuffle = shuffleQuestions(questionArrayCopy, answer);
      finalArray.push({
        answer: answer.toString(),
        questions: shuffle,
        image: answer
          .toString()
          .toLowerCase()
          .replace(/[ ]/g, "_")
          .replace(/[á]/g, "a")
          .replace(/[č]/g, "c")
          .replace(/[ď]/g, "d")
          .replace(/[é]/g, "e")
          .replace(/[ě]/g, "e")
          .replace(/[í]/g, "i")
          .replace(/[ň]/g, "n")
          .replace(/[ó]/g, "o")
          .replace(/[ř]/g, "r")
          .replace(/[š]/g, "s")
          .replace(/[ť]/g, "t")
          .replace(/[ú]/g, "u")
          .replace(/[ů]/g, "u")
          .replace(/[ý]/g, "y")
          .replace(/[ž]/g, "z"),
        key: (i + 1) * new Date(),
        id: i,
      });
    }
  }

  setQuestions();

  function getImageUrl(array) {
    return require("../img/" + array.image + ".jpg");
  }

  function translatePage(id) {
    return "translateX(" + id * 100 + "%)";
  }

  function slidesWidth(array) {
    return array.length * 100 + "%";
  }

  function slidePage(num) {
    return num * 100 + "%";
  }

  const onSubmit = (btn, pageId) => {
    setClicked(btn);
    if (btn === pageId.answer) {
      rightAnswers++;
      setRightAnswers(rightAnswers);
    }
    if (btn !== pageId.answer) {
      badAnswers++;
      setBadAnswers(badAnswers);
    }
    setShowResult(true);
    setTimeout(pageSwitch, 1500);
  };

  const pageSwitch = () => {
    count--;
    if (count * -1 > questionArray.length - 1) {
      count = 0;
    }
    setShowResult(false);
    setCount(count);
  };

  return (
    <div>
      <div className="screen_crop">
        <div
          className="slide"
          style={{ width: slidesWidth(finalArray), left: slidePage(count) }}
        >
          {finalArray.map((page) => {
            return (
              <div
                className="section"
                key={page.key}
                style={{ transform: translatePage(page.id) }}
              >
                <div className="grid-container">
                  <div className="img_container">
                    <img
                      className="q_img"
                      src={getImageUrl(finalArray[page.id])}
                      alt=""
                    />
                  </div>
                  <div className="btn_container">
                    <ul>
                      {finalArray[page.id].questions.map((btn) => {
                        return (
                          <li key={btn}>
                            <button
                              disabled={showResult ? true : false}
                              key={btn}
                              onClick={() => onSubmit(btn, finalArray[page.id])}
                              className={
                                btn === finalArray[page.id].answer &&
                                showResult === true &&
                                btn === clicked
                                  ? "q_button btn_right"
                                  : "q_button " &&
                                    btn !== finalArray[page.id].answer &&
                                    showResult === true &&
                                    btn === clicked
                                  ? "q_button btn_wrong"
                                  : "q_button " &&
                                    showResult === true &&
                                    btn !== clicked
                                  ? "q_button btn_blur"
                                  : "q_button "
                              }
                            >
                              {btn}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
          ;
        </div>
      </div>
    </div>
  );
};

export default GamePage;
