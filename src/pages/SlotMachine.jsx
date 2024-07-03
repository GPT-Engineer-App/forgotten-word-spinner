import React, { useState, useEffect } from "react";
import slotMachineData from "../data/slotMachineData.json";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

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
          <CardTitle className="text-center text-2xl">Machine à Sous</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="slot-machine">
            <motion.div
              className="slot-machine-window text-3xl font-bold"
              animate={{ y: spinning ? [0, -100, 0] : 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              {word}
            </motion.div>
            <motion.div
              className="slot-machine-window text-lg mt-2"
              animate={{ y: spinning ? [0, -100, 0] : 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              {definition}
            </motion.div>
          </div>
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