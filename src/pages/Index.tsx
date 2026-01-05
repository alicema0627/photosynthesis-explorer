import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import KnowledgeSection from "@/components/KnowledgeSection";
import ExperimentSimulation from "@/components/ExperimentSimulation";
import MatchingGame from "@/components/MatchingGame";
import QuizSection from "@/components/QuizSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <KnowledgeSection />
        <ExperimentSimulation />
        <MatchingGame />
        <QuizSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
