import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface RadioPlayerProps {
  streamUrl?: string;
  stationName?: string;
  currentShow?: string;
}

const RadioPlayer = ({ 
  streamUrl = 'https://stream.example.com/radio', 
  stationName = 'Radio Station',
  currentShow = 'Live Broadcast'
}: RadioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <Card className="w-full mx-auto p-4 sm:p-6 md:p-8 bg-gradient-to-br from-card via-card to-primary/10 border-primary/20 shadow-2xl backdrop-blur-sm touch-manipulation">
      <audio ref={audioRef} src={streamUrl} />
      
      <div className="space-y-4 sm:space-y-6">
        <div className="text-center space-y-1 sm:space-y-2">
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">{currentShow}</p>
        </div>

        <div className="flex justify-center items-center gap-4 my-4 sm:my-6 md:my-8">
          <div className="flex gap-1.5 sm:gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 sm:w-2 h-12 sm:h-16 rounded-full bg-gradient-to-b from-primary to-secondary brightness-75 transition-all ${
                  isPlaying ? 'animate-wave' : 'opacity-30'
                }`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center gap-6">
          <Button
            variant="outline"
            size="lg"
            onClick={togglePlay}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tl from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 active:scale-95 border-none shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation brightness-75"
          >
            <Icon 
              name={isPlaying ? 'Pause' : 'Play'} 
              className="w-8 h-8 sm:w-10 sm:h-10 text-white" 
            />
          </Button>
        </div>

        <div className="space-y-4 pt-2 sm:pt-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="hover:bg-primary/20 active:scale-95 transition-all touch-manipulation shrink-0"
            >
              <Icon 
                name={isMuted ? 'VolumeX' : volume[0] > 50 ? 'Volume2' : 'Volume1'} 
                className="w-5 h-5" 
              />
            </Button>
            
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="flex-1"
              disabled={isMuted}
            />
            
            <span className="text-xs sm:text-sm text-muted-foreground w-10 sm:w-12 text-right shrink-0">
              {isMuted ? '0%' : `${volume[0]}%`}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 border-t border-border/50">
          <div className="text-center space-y-0.5 sm:space-y-1">
            <Icon name="Radio" className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-primary" />
            <p className="text-[10px] sm:text-xs text-muted-foreground">Live</p>
          </div>
          <div className="text-center space-y-0.5 sm:space-y-1">
            <Icon name="Users" className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-secondary" />
            <p className="text-[10px] sm:text-xs text-muted-foreground">1.2K Listeners</p>
          </div>
          <div className="text-center space-y-0.5 sm:space-y-1">
            <Icon name="Heart" className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-accent" />
            <p className="text-[10px] sm:text-xs text-muted-foreground">Favorite</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RadioPlayer;