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
  const [currentTrack, setCurrentTrack] = useState('Загрузка...');
  const [artist, setArtist] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchTrackInfo = async () => {
      try {
        const response = await fetch('https://region-ru4.tunio.ai/status-json.xsl?mount=/klvn54.aac');
        const data = await response.json();
        const trackInfo = data.icestats?.source?.title || 'Колывань 54';
        
        if (trackInfo.includes(' - ')) {
          const [artistName, trackName] = trackInfo.split(' - ');
          setArtist(artistName);
          setCurrentTrack(trackName);
        } else {
          setCurrentTrack(trackInfo);
          setArtist('');
        }
      } catch (error) {
        setCurrentTrack('В эфире');
        setArtist('');
      }
    };

    fetchTrackInfo();
    const interval = setInterval(fetchTrackInfo, 10000);

    return () => clearInterval(interval);
  }, []);

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
    <Card className="w-full max-w-2xl mx-auto p-8 bg-gradient-to-br from-card via-card to-primary/10 border-primary/20 shadow-2xl backdrop-blur-sm">
      <audio ref={audioRef} src={streamUrl} />
      
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {stationName}
          </h1>
          <p className="text-muted-foreground text-lg">{currentShow}</p>
          <div className="mt-4 p-4 rounded-xl bg-muted/30 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Icon name="Music" className="w-4 h-4 text-primary" />
              <p className="text-sm text-muted-foreground">Сейчас играет</p>
            </div>
            {artist && (
              <p className="text-lg font-semibold text-secondary">{artist}</p>
            )}
            <p className="text-xl font-bold text-foreground">{currentTrack}</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 my-8">
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-16 rounded-full bg-gradient-to-t from-primary to-secondary transition-all ${
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
            className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Icon 
              name={isPlaying ? 'Pause' : 'Play'} 
              className="w-10 h-10 text-white" 
            />
          </Button>
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="hover:bg-primary/20 transition-colors"
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
            
            <span className="text-sm text-muted-foreground w-12 text-right">
              {isMuted ? '0%' : `${volume[0]}%`}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50">
          <div className="text-center space-y-1">
            <Icon name="Radio" className="w-6 h-6 mx-auto text-primary" />
            <p className="text-xs text-muted-foreground">Live</p>
          </div>
          <div className="text-center space-y-1">
            <Icon name="Users" className="w-6 h-6 mx-auto text-secondary" />
            <p className="text-xs text-muted-foreground">1.2K Listeners</p>
          </div>
          <div className="text-center space-y-1">
            <Icon name="Heart" className="w-6 h-6 mx-auto text-accent" />
            <p className="text-xs text-muted-foreground">Favorite</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RadioPlayer;