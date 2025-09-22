import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Set slower playback speed for more cinematic effect
      video.playbackRate = 0.6;
      
      // Ensure seamless looping
      const handleTimeUpdate = () => {
        // Restart video slightly before it ends to prevent any flicker
        if (video.currentTime >= video.duration - 0.1) {
          video.currentTime = 0;
        }
      };

      const handleLoadedData = () => {
        video.playbackRate = 0.6;
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadeddata', handleLoadedData);
      
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="/videos/metro-bg-complete.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-overlay" />
        
        {/* Network Pattern Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-metro-cyan rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-metro-glow rounded-full animate-pulse delay-200" />
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-metro-teal rounded-full animate-pulse delay-500" />
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-metro-cyan rounded-full animate-pulse delay-700" />
          <div className="absolute bottom-1/4 right-1/2 w-2 h-2 bg-metro-glow rounded-full animate-pulse delay-1000" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-metro-cyan rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-foreground rounded-sm" />
              </div>
              <span className="text-lg font-metro font-medium text-foreground">
                Kochi Metro Rail Limited
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-metro font-bold leading-tight text-foreground">
                <span className="block">AI-DRIVEN</span>
                <span className="block bg-gradient-accent bg-clip-text text-transparent">
                  PRECISION
                </span>
                <span className="block">FOR TOMORROW'S</span>
                <span className="block text-metro-cyan">METRO</span>
              </h1>

              {/* Sub-headline */}
              <p className="text-xl md:text-2xl font-metro font-light text-muted-foreground max-w-3xl leading-relaxed">
                Optimized Train Induction & Scheduling for Unrivaled Efficiency
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-6 h-auto"
              >
                DISCOVER THE PLATFORM
              </Button>
            </div>
          </div>

          {/* Right Content - Video CTA */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end space-y-6">
            <div className="relative group cursor-pointer">
              {/* Play Button */}
              <div className="w-20 h-20 md:w-24 md:h-24 border-2 border-metro-cyan rounded-full flex items-center justify-center bg-metro-surface/30 backdrop-blur-sm hover:bg-metro-cyan hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-metro-cyan group-hover:text-primary-foreground ml-1" fill="currentColor" />
              </div>
              
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border border-metro-cyan opacity-50 animate-ping" />
              <div className="absolute inset-0 rounded-full border border-metro-glow opacity-30 animate-ping delay-200" />
            </div>
            
            {/* Video CTA Text */}
            <p className="text-sm font-metro font-medium text-muted-foreground tracking-wider text-center lg:text-right">
              WATCH INTRODUCTION VIDEO
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-metro-cyan rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-metro-glow rounded-full animate-bounce delay-200" />
          <div className="w-2 h-2 bg-metro-teal rounded-full animate-bounce delay-500" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;