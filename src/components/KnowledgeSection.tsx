import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Droplets, Wind, Zap, Leaf } from "lucide-react";
import leafChloroplast from "@/assets/leaf-chloroplast.png";
import chloroplastStructure from "@/assets/chloroplast-structure.png";
import plantRoots from "@/assets/plant-roots.png";

const KnowledgeSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <section id="what-is" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* What is Photosynthesis */}
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            What is <span className="text-gradient-leaf">Photosynthesis</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Photosynthesis is the incredible process by which plants, algae, and some bacteria convert light energy into chemical energy stored in glucose (sugar).
          </p>
        </motion.div>

        {/* Key definition card */}
        <motion.div {...fadeInUp} className="mb-20">
          <Card variant="knowledge" className="max-w-4xl mx-auto p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-primary mb-4">The Life-Giving Process</h3>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  The word "photosynthesis" comes from Greek: <strong>"photo"</strong> means light and <strong>"synthesis"</strong> means putting together. 
                  Plants literally put together sugar molecules using the energy from sunlight!
                </p>
                <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <p className="font-semibold text-primary text-center text-lg">
                    🌱 Without photosynthesis, there would be no oxygen for us to breathe and no food for any living thing!
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <img src={leafChloroplast} alt="Leaf with chloroplasts" className="w-64 rounded-2xl shadow-lg" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Ingredients of Photosynthesis */}
        <motion.div {...fadeInUp} className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">The Three Essential Ingredients</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card variant="elevated" className="text-center p-6">
              <CardHeader>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-sunlight/20 flex items-center justify-center">
                  <Sun className="w-10 h-10 text-sunlight" />
                </div>
                <CardTitle className="text-sunlight">Sunlight</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The energy source! Sunlight provides the power needed to drive the chemical reactions. 
                  Plants capture light using a green pigment called <strong>chlorophyll</strong>.
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated" className="text-center p-6">
              <CardHeader>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-water/20 flex items-center justify-center">
                  <Droplets className="w-10 h-10 text-water" />
                </div>
                <CardTitle className="text-water">Water (H₂O)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absorbed through the roots from the soil. Water molecules are split apart to release 
                  hydrogen atoms and oxygen. The oxygen is released into the air!
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated" className="text-center p-6">
              <CardHeader>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-co2/20 flex items-center justify-center">
                  <Wind className="w-10 h-10 text-co2" />
                </div>
                <CardTitle className="text-co2">Carbon Dioxide (CO₂)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Taken in through tiny pores on leaves called <strong>stomata</strong>. 
                  CO₂ from the air provides the carbon atoms needed to build sugar molecules.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Where does photosynthesis happen */}
        <motion.div {...fadeInUp} className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">Where Does Photosynthesis Happen?</h3>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src={chloroplastStructure} alt="Chloroplast structure" className="w-full rounded-2xl shadow-lg" />
            </div>
            <div className="space-y-6">
              <Card variant="knowledge" className="p-6">
                <h4 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                  <Leaf className="w-6 h-6" /> In the Leaves
                </h4>
                <p className="text-muted-foreground">
                  Most photosynthesis occurs in plant leaves. The flat, broad shape of leaves helps 
                  capture maximum sunlight.
                </p>
              </Card>

              <Card variant="knowledge" className="p-6">
                <h4 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                  <Zap className="w-6 h-6" /> Inside Chloroplasts
                </h4>
                <p className="text-muted-foreground">
                  Within leaf cells are special organelles called <strong>chloroplasts</strong>. 
                  These contain the green pigment chlorophyll that absorbs light energy.
                </p>
              </Card>

              <Card variant="knowledge" className="p-6">
                <h4 className="text-xl font-bold text-primary mb-3">The Chloroplast Structure</h4>
                <ul className="text-muted-foreground space-y-2">
                  <li>• <strong>Thylakoids:</strong> Disc-shaped structures where light reactions occur</li>
                  <li>• <strong>Grana:</strong> Stacks of thylakoids</li>
                  <li>• <strong>Stroma:</strong> Fluid-filled space where sugar is made</li>
                </ul>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* The Equation */}
        <motion.div {...fadeInUp} className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">The Photosynthesis Equation</h3>
          <Card variant="elevated" className="max-w-4xl mx-auto p-8 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 flex-wrap text-xl md:text-2xl font-bold mb-8">
              <span className="px-4 py-2 rounded-xl bg-co2/20 text-co2">6CO₂</span>
              <span className="text-muted-foreground">+</span>
              <span className="px-4 py-2 rounded-xl bg-water/20 text-water">6H₂O</span>
              <span className="text-muted-foreground">+</span>
              <span className="px-4 py-2 rounded-xl bg-sunlight/20 text-sunlight">Light Energy</span>
              <span className="text-muted-foreground">→</span>
              <span className="px-4 py-2 rounded-xl bg-glucose/20 text-glucose">C₆H₁₂O₆</span>
              <span className="text-muted-foreground">+</span>
              <span className="px-4 py-2 rounded-xl bg-oxygen/20 text-oxygen">6O₂</span>
            </div>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="font-bold text-lg mb-3 text-primary">Reactants (Inputs):</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>6CO₂:</strong> Six molecules of carbon dioxide</li>
                  <li>• <strong>6H₂O:</strong> Six molecules of water</li>
                  <li>• <strong>Light Energy:</strong> From the sun</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-3 text-primary">Products (Outputs):</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>C₆H₁₂O₆:</strong> One molecule of glucose (sugar)</li>
                  <li>• <strong>6O₂:</strong> Six molecules of oxygen</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Two Stages */}
        <motion.div {...fadeInUp} className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">The Two Stages of Photosynthesis</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <Card variant="interactive" className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-sunlight/20 flex items-center justify-center">
                  <Sun className="w-8 h-8 text-sunlight" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold">Light-Dependent Reactions</h4>
                  <p className="text-muted-foreground">Happens in the thylakoid membranes</p>
                </div>
              </div>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-sunlight font-bold">1.</span>
                  Chlorophyll absorbs sunlight energy
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sunlight font-bold">2.</span>
                  Water molecules are split (photolysis)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sunlight font-bold">3.</span>
                  Oxygen is released as a byproduct
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sunlight font-bold">4.</span>
                  Energy is stored in ATP and NADPH molecules
                </li>
              </ul>
            </Card>

            <Card variant="interactive" className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold">Light-Independent Reactions</h4>
                  <p className="text-muted-foreground">Happens in the stroma (Calvin Cycle)</p>
                </div>
              </div>
              <ul className="space-y-3 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  CO₂ is captured from the air
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  ATP and NADPH provide energy
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  Carbon atoms are assembled into glucose
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">4.</span>
                  Glucose stores energy for the plant
                </li>
              </ul>
            </Card>
          </div>
        </motion.div>

        {/* Factors affecting photosynthesis */}
        <motion.div {...fadeInUp}>
          <h3 className="text-3xl font-bold text-center mb-12">Factors Affecting Photosynthesis</h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <Card variant="knowledge" className="p-6">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Sun className="w-5 h-5 text-sunlight" /> Light Intensity
                </h4>
                <p className="text-muted-foreground">
                  More light = faster photosynthesis (up to a point). Too much light can damage the plant.
                </p>
              </Card>

              <Card variant="knowledge" className="p-6">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Wind className="w-5 h-5 text-co2" /> CO₂ Concentration
                </h4>
                <p className="text-muted-foreground">
                  Higher CO₂ levels increase the rate of photosynthesis until other factors become limiting.
                </p>
              </Card>

              <Card variant="knowledge" className="p-6">
                <h4 className="font-bold text-lg mb-2">🌡️ Temperature</h4>
                <p className="text-muted-foreground">
                  Enzymes work best at optimal temperatures (25-35°C). Too hot or cold slows the process.
                </p>
              </Card>

              <Card variant="knowledge" className="p-6">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-water" /> Water Availability
                </h4>
                <p className="text-muted-foreground">
                  Water stress causes stomata to close, reducing CO₂ intake and slowing photosynthesis.
                </p>
              </Card>
            </div>
            <div className="flex justify-center">
              <img src={plantRoots} alt="Plant with roots absorbing water" className="w-full max-w-sm rounded-2xl shadow-lg" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default KnowledgeSection;
