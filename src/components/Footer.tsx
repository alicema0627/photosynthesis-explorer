import { Leaf, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-xl">PhotoLearn</h3>
              <p className="text-primary-foreground/80 text-sm">
                Interactive Photosynthesis Education
              </p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="flex items-center gap-2 text-primary-foreground/80">
              Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> for curious learners
            </p>
            <p className="text-sm text-primary-foreground/60 mt-1">
              © {new Date().getFullYear()} PhotoLearn. All rights reserved.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20">
          <p className="text-center text-sm text-primary-foreground/60">
            🌱 Remember: Plants are the foundation of life on Earth. Every breath you take contains oxygen produced by photosynthesis!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
