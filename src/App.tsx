import React, { useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function App() {
  // Hello 원형 애니메이션 가시성 상태 관리
  const [helloVisible, setHelloVisible] = useState(true);

  // 리스트 컴포넌트 가시성 상태 관리
  const [isVisible, setIsVisible] = useState(false);

  // 스위치 상태 관리
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    // 스위치를 클릭하여 상태 토글
  };

  useEffect(() => {
    //isOn 상태 변경에 따라 배경색 변경
    if (isOn) {
      document.body.style.background = "#7b2ff7";
    } else {
      document.body.style.background = "#252525";
    }
  }, [isOn]);

  useEffect(() => {
    // Hello 원형 애니메이션 3초 후에 사라지도록 설정
    const timer = setTimeout(() => {
      setHelloVisible(false);
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 제거
  }, []);

  const list = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="wrap">
      <div className="switch" data-isOn={isOn} onClick={toggleSwitch}>
        <motion.div className="handle" transition={spring} />
      </div>
      {helloVisible && (
        <motion.div
          className="circle"
          animate={{ scale: [1, 1.5, 1.1], opacity: [1, 1, 0] }}
          transition={{ duration: 3, times: [0, 0.2, 1] }}
        >
          Hello world!
        </motion.div>
      )}

      <div className="buttons">
        <button type="button" onClick={() => setIsVisible(true)}>
          Show
        </button>
        <button type="button" onClick={() => setIsVisible(false)}>
          Hide
        </button>
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="box"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.ul variants={list} initial="hidden" animate="visible">
              <motion.li variants={item} whileHover={{ scale: 1.1 }}>
                item 1
              </motion.li>
              <motion.li variants={item} whileHover={{ scale: 1.1 }}>
                item 2
              </motion.li>
              <motion.li variants={item} whileHover={{ scale: 1.1 }}>
                item 3
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

const spring = {
  type: "spring",

  //stiffness : 스프링의 강성 또는 탄력
  //값이 클수록 더 강하고 빠르게 작동
  stiffness: 700,

  //damping : 스프링의 감쇠
  //값이 클수록 스프링의 튀는 정도가 감소하고 움직임이 느려짐
  damping: 30,

  //stiffness가 높고 damping이 낮으면 더 강한 튀는 움직임을 생성하고, stiffness가 낮고 damping이 높으면 부드럽고 점진적인 움직임을 생성합
};
