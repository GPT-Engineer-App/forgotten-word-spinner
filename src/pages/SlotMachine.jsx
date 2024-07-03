import React, { useState, useEffect } from "react";
import slotMachineData from "../data/slotMachineData.json";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import slotMachineGraphic from "../../public/images/slot-machine-graphic.png";
import { useWindowSize } from "@react-hook/window-size";
import Confetti from "react-confetti";

const SlotMachine = () => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [width, height] = useWindowSize();

  const spinSlotMachine = () => {
    setSpinning(true);
    setShowFireworks(false);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * slotMachineData.length);
      const selectedWord = slotMachineData[randomIndex];
      setWord(selectedWord.word);
      setDefinition(selectedWord.definition);
      setSpinning(false);
      setShowFireworks(true);
    }, 2000);
  };

  useEffect(() => {
    if (showFireworks) {
      const timer = setTimeout(() => setShowFireworks(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showFireworks]);

  const renderReels = () => {
    const letters = word.split("");
    return letters.map((letter, index) => (
      <motion.div
        key={index}
        className="reel"
        animate={{ y: spinning ? [0, -100, 0] : 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        {letter}
      </motion.div>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-2xl p-4">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold">{word}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="slot-machine relative w-full max-w-lg">
            <img src={slotMachineGraphic} alt="Slot Machine" className="w-full h-auto" />
            <div className="slot-machine-window text-2xl mt-2 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 font-bold flex">
              {renderReels()}
            </div>
          </div>
          <motion.div
            className="slot-machine-definition text-lg mt-4 font-medium"
            animate={{ opacity: spinning ? 0 : 1 }}
            transition={{ duration: 1 }}
          >
            {definition}
          </motion.div>
          <Button onClick={spinSlotMachine} className="mt-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-xl py-4 px-6 rounded-lg">
            Appuyer
          </Button>
        </CardContent>
      </Card>
      {showFireworks && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={500}
          recycle={false}
          colors={["#FFC700", "#FF0000", "#00FF00", "#0000FF", "#FF00FF"]}
        />
      )}
    </div>
  );
};

export default SlotMachine;