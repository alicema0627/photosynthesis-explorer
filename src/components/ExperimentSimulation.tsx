import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Sun, Droplets, Thermometer, Leaf, Play, RotateCcw } from "lucide-react";

const ExperimentSimulation = () => {
  const [lightIntensity, setLightIntensity] = useState(50);
  const [waterLevel, setWaterLevel] = useState(50);
  const [temperature, setTemperature] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [oxygenBubbles, setOxygenBubbles] = useState<number[]>([]);

  // Calculate photosynthesis rate based on factors
  const calculateRate = () => {
    // Light effect (0-100)
    let lightEffect = lightIntensity;
    if (lightIntensity > 80) lightEffect = 80 - (lightIntensity - 80) * 2; // Too much light damages
    
    // Temperature effect (optimal around 25-30)
    let tempEffect = 100 - Math.abs(temperature - 27.5) * 4;
    if (tempEffect < 0) tempEffect = 0;
    
    // Water effect
    let waterEffect = waterLevel;
    
    // Combined rate
    const rate = (lightEffect * 0.4 + tempEffect * 0.3 + waterEffect * 0.3);
    return Math.max(0, Math.min(100, rate));
  };

  const rate = calculateRate();

  const startExperiment = () => {
    setIsRunning(true);
    setOxygenBubbles([]);
    
    // Generate bubbles based on rate
    const interval = setInterval(() => {
      if (rate > 10) {
        setOxygenBubbles(prev => [...prev, Date.now()]);
      }
    }, 2000 / (rate / 20 + 1));

    setTimeout(() => {
      clearInterval(interval);
      setIsRunning(false);
    }, 5000);
  };

  const reset = () => {
    setLightIntensity(50);
    setWaterLevel(50);
    setTemperature(25);
    setOxygenBubbles([]);
    setIsRunning(false);
  };

  const getRateColor = () => {
    if (rate > 70) return "text-primary";
    if (rate > 40) return "text-sunlight";
    return "text-destructive";
  };

  const getRateMessage = () => {
    if (rate > 70) return "Excellent! Optimal photosynthesis conditions!";
    if (rate > 40) return "Good rate. Try adjusting factors for better results.";
    return "Low rate. Check your conditions - something is limiting photosynthesis.";
  };

  return (
    <section id="experiment" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            🔬 <span className="text-gradient-leaf">Experiment Simulation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Adjust the environmental factors and observe how they affect the rate of photosynthesis!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card variant="knowledge" className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center gap-2">
                  <Sun className="w-6 h-6 text-sunlight" />
                  Light Intensity: {lightIntensity}%
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <Slider
                  value={[lightIntensity]}
                  onValueChange={(v) => setLightIntensity(v[0])}
                  max={100}
                  step={1}
                  className="my-4"
                />
                <p className="text-sm text-muted-foreground">
                  {lightIntensity < 30 && "⚠️ Too dark - not enough energy for photosynthesis"}
                  {lightIntensity >= 30 && lightIntensity <= 80 && "✅ Good light level for photosynthesis"}
                  {lightIntensity > 80 && "⚠️ Very bright - may damage plant cells"}
                </p>
              </CardContent>
            </Card>

            <Card variant="knowledge" className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-6 h-6 text-water" />
                  Water Availability: {waterLevel}%
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <Slider
                  value={[waterLevel]}
                  onValueChange={(v) => setWaterLevel(v[0])}
                  max={100}
                  step={1}
                  className="my-4"
                />
                <p className="text-sm text-muted-foreground">
                  {waterLevel < 30 && "⚠️ Water stress - stomata closing to conserve water"}
                  {waterLevel >= 30 && waterLevel <= 80 && "✅ Adequate water supply"}
                  {waterLevel > 80 && "✅ Excellent hydration"}
                </p>
              </CardContent>
            </Card>

            <Card variant="knowledge" className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="w-6 h-6 text-destructive" />
                  Temperature: {temperature}°C
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <Slider
                  value={[temperature]}
                  onValueChange={(v) => setTemperature(v[0])}
                  min={5}
                  max={45}
                  step={1}
                  className="my-4"
                />
                <p className="text-sm text-muted-foreground">
                  {temperature < 15 && "⚠️ Too cold - enzymes work slowly"}
                  {temperature >= 15 && temperature <= 35 && "✅ Optimal temperature range for enzymes"}
                  {temperature > 35 && "⚠️ Too hot - enzymes may denature"}
                </p>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                variant="hero"
                size="lg"
                onClick={startExperiment}
                disabled={isRunning}
                className="flex-1"
              >
                <Play className="w-5 h-5" />
                Run Experiment
              </Button>
              <Button variant="outline" size="lg" onClick={reset}>
                <RotateCcw className="w-5 h-5" />
                Reset
              </Button>
            </div>
          </motion.div>

          {/* Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card variant="elevated" className="p-8 h-full">
              <div className="relative h-80 rounded-xl bg-gradient-to-b from-water-light/30 to-water/30 overflow-hidden mb-6">
                {/* Sun representation */}
                <div 
                  className="absolute top-4 right-4 w-16 h-16 rounded-full bg-sunlight transition-all duration-500"
                  style={{ 
                    opacity: lightIntensity / 100,
                    boxShadow: `0 0 ${lightIntensity}px ${lightIntensity / 3}px hsl(45 100% 60% / 0.5)`
                  }}
                />

                {/* Plant */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                  <motion.div
                    animate={{ scale: 0.8 + (rate / 200) }}
                    transition={{ duration: 1 }}
                  >
                    <Leaf className="w-24 h-24 text-primary" style={{ opacity: 0.5 + rate / 200 }} />
                  </motion.div>
                </div>

                {/* Oxygen bubbles */}
                {oxygenBubbles.map((id, index) => (
                  <motion.div
                    key={id}
                    initial={{ bottom: 100, left: `${40 + Math.random() * 20}%`, opacity: 1 }}
                    animate={{ bottom: 400, opacity: 0 }}
                    transition={{ duration: 3, ease: "easeOut" }}
                    className="absolute w-4 h-4 rounded-full bg-oxygen/60"
                  />
                ))}

                {/* Water level indicator */}
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-water/40 transition-all duration-500"
                  style={{ height: `${waterLevel / 3}%` }}
                />
              </div>

              {/* Rate display */}
              <div className="text-center">
                <div className="mb-4">
                  <span className="text-lg text-muted-foreground">Photosynthesis Rate:</span>
                  <div className={`text-5xl font-extrabold ${getRateColor()}`}>
                    {Math.round(rate)}%
                  </div>
                </div>
                
                <div className="w-full h-4 rounded-full bg-muted overflow-hidden mb-4">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-leaf-light"
                    initial={{ width: 0 }}
                    animate={{ width: `${rate}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <p className={`font-semibold ${getRateColor()}`}>
                  {getRateMessage()}
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperimentSimulation;
