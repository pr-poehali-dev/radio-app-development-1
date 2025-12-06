import RadioPlayer from '@/components/RadioPlayer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4 animate-gradient">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4 animate-float">
          <div className="inline-block">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary via-secondary to-accent animate-pulse-glow" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Radio Station
          </h1>
          <p className="text-xl text-muted-foreground">
            Твоя любимая музыка 24/7
          </p>
        </div>

        <RadioPlayer 
          streamUrl="https://stream.example.com/radio"
          stationName="FM 101.5"
          currentShow="Вечерний эфир"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105">
            <h3 className="text-lg font-semibold mb-2 text-primary">Прямой эфир</h3>
            <p className="text-sm text-muted-foreground">
              Слушай любимые хиты прямо сейчас
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-secondary/50 transition-all duration-300 hover:scale-105">
            <h3 className="text-lg font-semibold mb-2 text-secondary">HD Качество</h3>
            <p className="text-sm text-muted-foreground">
              Кристально чистый звук
            </p>
          </div>
          
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all duration-300 hover:scale-105">
            <h3 className="text-lg font-semibold mb-2 text-accent">Без рекламы</h3>
            <p className="text-sm text-muted-foreground">
              Только музыка, ничего лишнего
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
