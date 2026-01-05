import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, RotateCcw, Sparkles } from "lucide-react";

interface MatchItem {
  id: string;
  content: string;
  type: "left" | "right";
  matchId: string;
  color: string;
}

const leftItems: MatchItem[] = [
  { id: "l1", content: "6CO₂", type: "left", matchId: "r1", color: "bg-co2/20 border-co2 text-co2" },
  { id: "l2", content: "6H₂O", type: "left", matchId: "r2", color: "bg-water/20 border-water text-water" },
  { id: "l3", content: "C₆H₁₂O₆", type: "left", matchId: "r3", color: "bg-glucose/20 border-glucose text-glucose" },
  { id: "l4", content: "6O₂", type: "left", matchId: "r4", color: "bg-oxygen/20 border-oxygen text-oxygen" },
  { id: "l5", content: "Light Energy", type: "left", matchId: "r5", color: "bg-sunlight/20 border-sunlight text-sunlight" },
];

const rightItems: MatchItem[] = [
  { id: "r1", content: "Carbon Dioxide (from air)", type: "right", matchId: "l1", color: "bg-co2/20 border-co2 text-co2" },
  { id: "r2", content: "Water (from roots)", type: "right", matchId: "l2", color: "bg-water/20 border-water text-water" },
  { id: "r3", content: "Glucose (sugar produced)", type: "right", matchId: "l3", color: "bg-glucose/20 border-glucose text-glucose" },
  { id: "r4", content: "Oxygen (released)", type: "right", matchId: "l4", color: "bg-oxygen/20 border-oxygen text-oxygen" },
  { id: "r5", content: "From the Sun (powers reaction)", type: "right", matchId: "l5", color: "bg-sunlight/20 border-sunlight text-sunlight" },
];

const MatchingGame = () => {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [incorrectPair, setIncorrectPair] = useState<string | null>(null);
  const [shuffledRight, setShuffledRight] = useState(() => 
    [...rightItems].sort(() => Math.random() - 0.5)
  );

  const handleLeftClick = (id: string) => {
    if (matches[id]) return;
    setSelectedLeft(id);
    setIncorrectPair(null);
  };

  const handleRightClick = (rightId: string) => {
    if (!selectedLeft) return;
    if (Object.values(matches).includes(rightId)) return;

    const leftItem = leftItems.find(item => item.id === selectedLeft);
    if (leftItem?.matchId === rightId) {
      setMatches(prev => ({ ...prev, [selectedLeft]: rightId }));
      setSelectedLeft(null);
    } else {
      setIncorrectPair(rightId);
      setTimeout(() => setIncorrectPair(null), 500);
    }
  };

  const reset = useCallback(() => {
    setSelectedLeft(null);
    setMatches({});
    setIncorrectPair(null);
    setShuffledRight([...rightItems].sort(() => Math.random() - 0.5));
  }, []);

  const isComplete = Object.keys(matches).length === leftItems.length;
  const matchCount = Object.keys(matches).length;

  return (
    <section id="matching" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            🧩 <span className="text-gradient-leaf">Equation Matching Game</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Match each element of the photosynthesis equation with its description!
          </p>
        </motion.div>

        {/* Progress indicator */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{matchCount}/{leftItems.length} matched</span>
          </div>
          <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-leaf-light"
              initial={{ width: 0 }}
              animate={{ width: `${(matchCount / leftItems.length) * 100}%` }}
            />
          </div>
        </div>

        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center mb-8"
            >
              <Card variant="knowledge" className="inline-flex items-center gap-3 px-8 py-4">
                <Sparkles className="w-8 h-8 text-sunlight" />
                <span className="text-2xl font-bold text-primary">
                  🎉 Excellent! All matched correctly!
                </span>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
          {/* Left column - Formula */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-center mb-4">Chemical Formula</h3>
            {leftItems.map((item) => {
              const isMatched = !!matches[item.id];
              const isSelected = selectedLeft === item.id;
              
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: isMatched ? 1 : 1.02 }}
                  whileTap={{ scale: isMatched ? 1 : 0.98 }}
                >
                  <Card
                    variant={isMatched ? "result" : isSelected ? "interactive" : "quiz"}
                    className={`p-4 cursor-pointer transition-all duration-300 ${
                      isMatched ? `${item.color} border-2` : ""
                    } ${isSelected ? "ring-2 ring-primary ring-offset-2" : ""}`}
                    onClick={() => handleLeftClick(item.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold">{item.content}</span>
                      {isMatched && <CheckCircle className="w-6 h-6 text-primary" />}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Right column - Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-center mb-4">Description</h3>
            {shuffledRight.map((item) => {
              const isMatched = Object.values(matches).includes(item.id);
              const isIncorrect = incorrectPair === item.id;
              const matchedLeftId = Object.keys(matches).find(key => matches[key] === item.id);
              const matchedItem = matchedLeftId ? leftItems.find(l => l.id === matchedLeftId) : null;
              
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: isMatched ? 1 : 1.02 }}
                  whileTap={{ scale: isMatched ? 1 : 0.98 }}
                  animate={isIncorrect ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <Card
                    variant={isMatched ? "result" : isIncorrect ? "quiz" : "quiz"}
                    className={`p-4 cursor-pointer transition-all duration-300 ${
                      isMatched && matchedItem ? `${matchedItem.color} border-2` : ""
                    } ${isIncorrect ? "border-destructive bg-destructive/10" : ""}`}
                    onClick={() => handleRightClick(item.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.content}</span>
                      {isMatched && <CheckCircle className="w-6 h-6 text-primary" />}
                      {isIncorrect && <XCircle className="w-6 h-6 text-destructive" />}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" onClick={reset}>
            <RotateCcw className="w-5 h-5" />
            Reset Game
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MatchingGame;
