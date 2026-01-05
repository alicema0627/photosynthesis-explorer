import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy } from "lucide-react";

interface Question {
  id: number;
  type: "mcq" | "matching";
  question: string;
  options?: string[];
  correctAnswer?: number;
  pairs?: { left: string; right: string }[];
}

const mcqQuestions: Question[] = [
  {
    id: 1,
    type: "mcq",
    question: "What is the primary pigment in plants that absorbs light energy for photosynthesis?",
    options: ["Carotene", "Chlorophyll", "Xanthophyll", "Anthocyanin"],
    correctAnswer: 1,
  },
  {
    id: 2,
    type: "mcq",
    question: "Which gas is released as a byproduct of photosynthesis?",
    options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
    correctAnswer: 2,
  },
  {
    id: 3,
    type: "mcq",
    question: "Where in the plant cell does photosynthesis primarily occur?",
    options: ["Mitochondria", "Nucleus", "Chloroplast", "Ribosome"],
    correctAnswer: 2,
  },
  {
    id: 4,
    type: "mcq",
    question: "What are the tiny pores on leaves called that allow CO₂ to enter?",
    options: ["Stomata", "Cuticle", "Epidermis", "Mesophyll"],
    correctAnswer: 0,
  },
  {
    id: 5,
    type: "mcq",
    question: "The Calvin Cycle (light-independent reactions) occurs in which part of the chloroplast?",
    options: ["Thylakoid membrane", "Outer membrane", "Stroma", "Grana"],
    correctAnswer: 2,
  },
];

const matchingQuestions: { left: string; right: string }[] = [
  { left: "Chlorophyll", right: "Green pigment that captures light" },
  { left: "Thylakoid", right: "Where light-dependent reactions occur" },
  { left: "Stroma", right: "Where the Calvin Cycle takes place" },
  { left: "ATP", right: "Energy currency molecule" },
  { left: "Glucose", right: "Sugar produced during photosynthesis" },
];

const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>(Array(mcqQuestions.length).fill(null));
  const [quizComplete, setQuizComplete] = useState(false);
  const [matchingPhase, setMatchingPhase] = useState(false);
  const [matchingAnswers, setMatchingAnswers] = useState<string[]>(Array(5).fill(""));
  const [matchingSubmitted, setMatchingSubmitted] = useState(false);
  const [shuffledRightOptions, setShuffledRightOptions] = useState<string[]>([]);

  const currentQ = mcqQuestions[currentQuestion];

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    setShowResult(true);
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = isCorrect;
    setAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < mcqQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Move to matching phase
      setMatchingPhase(true);
      setShuffledRightOptions(
        matchingQuestions.map(q => q.right).sort(() => Math.random() - 0.5)
      );
    }
  };

  const handleMatchingSelect = (questionIndex: number, answer: string) => {
    if (matchingSubmitted) return;
    const newAnswers = [...matchingAnswers];
    newAnswers[questionIndex] = answer;
    setMatchingAnswers(newAnswers);
  };

  const handleMatchingSubmit = () => {
    setMatchingSubmitted(true);
    const correctCount = matchingAnswers.filter((answer, index) => 
      answer === matchingQuestions[index].right
    ).length;
    setScore(prev => prev + correctCount);
  };

  const handleFinishQuiz = () => {
    setQuizComplete(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers(Array(mcqQuestions.length).fill(null));
    setQuizComplete(false);
    setMatchingPhase(false);
    setMatchingAnswers(Array(5).fill(""));
    setMatchingSubmitted(false);
  };

  const totalQuestions = mcqQuestions.length + matchingQuestions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  if (quizComplete) {
    return (
      <section id="quiz" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card variant="elevated" className="p-12">
              <Trophy className="w-24 h-24 mx-auto mb-6 text-sunlight" />
              <h2 className="text-4xl font-extrabold mb-4">Quiz Complete!</h2>
              <p className="text-6xl font-extrabold text-gradient-leaf mb-4">
                {score}/{totalQuestions}
              </p>
              <p className="text-2xl text-muted-foreground mb-8">
                {percentage >= 80 && "🌟 Excellent! You're a photosynthesis expert!"}
                {percentage >= 60 && percentage < 80 && "👍 Great job! Keep learning!"}
                {percentage < 60 && "📚 Good effort! Review the material and try again!"}
              </p>
              <div className="w-full h-4 rounded-full bg-muted overflow-hidden mb-8">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-leaf-light"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <Button variant="hero" size="xl" onClick={resetQuiz}>
                <RotateCcw className="w-5 h-5" />
                Take Quiz Again
              </Button>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  if (matchingPhase) {
    return (
      <section id="quiz" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              📝 <span className="text-gradient-leaf">Matching Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Match each term with its correct definition
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Card variant="knowledge" className="p-8">
              <div className="space-y-6">
                {matchingQuestions.map((q, index) => (
                  <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="w-full md:w-1/3 font-bold text-lg p-3 rounded-lg bg-primary/10 text-primary">
                      {q.left}
                    </div>
                    <ArrowRight className="hidden md:block w-6 h-6 text-muted-foreground" />
                    <select
                      value={matchingAnswers[index]}
                      onChange={(e) => handleMatchingSelect(index, e.target.value)}
                      disabled={matchingSubmitted}
                      className={`w-full md:flex-1 p-3 rounded-lg border-2 font-medium transition-all ${
                        matchingSubmitted
                          ? matchingAnswers[index] === q.right
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-destructive bg-destructive/10 text-destructive"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <option value="">Select a match...</option>
                      {shuffledRightOptions.map((option, optIndex) => (
                        <option key={optIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {matchingSubmitted && (
                      <div className="flex-shrink-0">
                        {matchingAnswers[index] === q.right ? (
                          <CheckCircle className="w-6 h-6 text-primary" />
                        ) : (
                          <XCircle className="w-6 h-6 text-destructive" />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {matchingSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-lg bg-muted"
                >
                  <p className="font-semibold text-center">
                    You got {matchingAnswers.filter((a, i) => a === matchingQuestions[i].right).length}/5 matching questions correct!
                  </p>
                </motion.div>
              )}

              <div className="mt-8 flex justify-center gap-4">
                {!matchingSubmitted ? (
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleMatchingSubmit}
                    disabled={matchingAnswers.some(a => a === "")}
                  >
                    Submit Answers
                  </Button>
                ) : (
                  <Button variant="hero" size="lg" onClick={handleFinishQuiz}>
                    See Final Results
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            📝 <span className="text-gradient-leaf">Test Your Knowledge</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Answer 5 multiple choice questions and 5 matching questions to test what you've learned!
          </p>
        </motion.div>

        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {mcqQuestions.length} (MCQ)</span>
            <span>Score: {score}</span>
          </div>
          <div className="flex gap-2">
            {mcqQuestions.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full transition-all ${
                  answers[index] === true
                    ? "bg-primary"
                    : answers[index] === false
                    ? "bg-destructive"
                    : index === currentQuestion
                    ? "bg-sunlight"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-2xl mx-auto"
          >
            <Card variant="knowledge" className="p-8">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl leading-relaxed">
                  {currentQ.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0 space-y-4">
                {currentQ.options?.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentQ.correctAnswer;
                  const showCorrect = showResult && isCorrect;
                  const showIncorrect = showResult && isSelected && !isCorrect;

                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: showResult ? 1 : 1.02 }}
                      whileTap={{ scale: showResult ? 1 : 0.98 }}
                    >
                      <button
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
                          showCorrect
                            ? "border-primary bg-primary/10 text-primary"
                            : showIncorrect
                            ? "border-destructive bg-destructive/10 text-destructive"
                            : isSelected
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showCorrect && <CheckCircle className="w-5 h-5" />}
                          {showIncorrect && <XCircle className="w-5 h-5" />}
                        </div>
                      </button>
                    </motion.div>
                  );
                })}

                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl ${
                        selectedAnswer === currentQ.correctAnswer
                          ? "bg-primary/10 text-primary"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      <p className="font-semibold">
                        {selectedAnswer === currentQ.correctAnswer
                          ? "🎉 Correct! Great job!"
                          : `❌ Not quite. The correct answer is: ${currentQ.options?.[currentQ.correctAnswer!]}`}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-4 pt-4">
                  {!showResult ? (
                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full"
                      onClick={handleSubmit}
                      disabled={selectedAnswer === null}
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full"
                      onClick={handleNext}
                    >
                      {currentQuestion < mcqQuestions.length - 1 ? "Next Question" : "Continue to Matching"}
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default QuizSection;
