import React, { useState, useEffect } from "react";
import slotMachineData from "../data/slotMachineData.json";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import slotMachineGraphic from "../../public/images/slot-machine-graphic.png"; // Import the new slot machine graphic

const SlotMachine = () => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle className="text-center text-2xl">{word}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="slot-machine relative">
            <img src={slotMachineGraphic} alt="Slot Machine" className="w-full h-auto" />
            
            <motion.div
              className="slot-machine-window text-lg mt-2 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
              animate={{ y: spinning ? [0, -100, 0] : 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              {word}
            </motion.div>
          </div>
          <motion.div
            className="slot-machine-definition text-lg mt-4"
            animate={{ opacity: spinning ? 0 : 1 }}
            transition={{ duration: 1 }}
          >
            {definition}
          </motion.div>
          <Button onClick={spinSlotMachine} className="mt-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-xl py-2 px-4 rounded-lg">
            Appuyer
          </Button>
        </CardContent>
      </Card>
      {showFireworks && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className="fireworks"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            🎆
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SlotMachine;