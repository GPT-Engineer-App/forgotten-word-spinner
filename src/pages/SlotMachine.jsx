import React, { useState } from "react";
import slotMachineData from "../data/slotMachineData.json";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SlotMachine = () => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");

  const spinSlotMachine = () => {
    const randomIndex = Math.floor(Math.random() * slotMachineData.length);
    const selectedWord = slotMachineData[randomIndex];
    setWord(selectedWord.word);
    setDefinition(selectedWord.definition);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Slot Machine</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="slot-machine">
            <div className="slot-machine-window">{word}</div>
            <div className="slot-machine-window">{definition}</div>
          </div>
          <Button onClick={spinSlotMachine} className="mt-4">
            Spin
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SlotMachine;