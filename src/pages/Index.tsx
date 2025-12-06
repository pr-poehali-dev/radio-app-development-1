import RadioPlayer from '@/components/RadioPlayer';

const Index = () => {
  return (
    <div className="min-h-screen h-screen overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 flex flex-col justify-between p-4 sm:p-6 animate-gradient safe-area-inset">
      <div className="flex-1 flex flex-col justify-center items-center space-y-6 sm:space-y-8 pb-safe">
        <div className="text-center space-y-3 sm:space-y-4 animate-float">
          <div className="inline-block">
            <img 
              src="https://cdn.poehali.dev/files/logo (1).jpg" 
              alt="Колывань 54" 
              className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-2 sm:mb-4 rounded-full animate-pulse-glow object-cover"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Колывань 54
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground">
            Твоя любимая музыка 24/7
          </p>
        </div>

        <div className="w-full max-w-2xl">
          <RadioPlayer 
            streamUrl="https://region-ru4.tunio.ai/klvn54.aac"
            stationName="Колывань 54"
            currentShow="Вечерний эфир"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-2xl">
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 text-center">
            <h3 className="text-xs sm:text-sm font-semibold mb-1 text-primary">Прямой эфир</h3>
          </div>
          
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 text-center">
            <h3 className="text-xs sm:text-sm font-semibold mb-1 text-secondary">HD Качество</h3>
          </div>
          
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 text-center">
            <h3 className="text-xs sm:text-sm font-semibold mb-1 text-accent">Без рекламы</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;