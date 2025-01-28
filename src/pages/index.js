import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Send } from 'lucide-react';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [email, setEmail] = useState('');
  
  const IntroSection = () => (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <img 
        src="/logo.png" 
        alt="Académie Agentivité" 
        className="h-24 mx-auto mb-8"
      />
      <h1 className="font-playfair text-4xl mb-6 text-primary">La Roue de la Vie</h1>
      <p className="font-montserrat text-lg mb-8 text-secondary">
        La Roue de la Vie est un outil puissant d'auto-évaluation qui vous permet de visualiser votre niveau de satisfaction 
        dans les différents domaines de votre vie. Cette prise de conscience est souvent le premier pas vers un changement positif 
        et une vie plus équilibrée.
      </p>
      <Button 
        onClick={() => setShowIntro(false)}
        className="bg-primary hover:bg-secondary text-white font-montserrat"
      >
        Commencer l'évaluation
      </Button>
    </div>
  );

  if (showIntro) {
    return <IntroSection />;
  }

  return (
    <div className="min-h-screen bg-light">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <img 
            src="/logo.png" 
            alt="Académie Agentivité" 
            className="h-16"
          />
          <h1 className="font-playfair text-3xl text-primary">La Roue de la Vie</h1>
        </div>
        
        {/* Le composant RoueDeLaVie sera ajouté ici dans la prochaine étape */}
        
        <footer className="mt-8 text-center font-montserrat text-sm text-secondary">
          <p>Pour toute question, contactez-nous : contact@academieagentivite.fr</p>
        </footer>
      </main>
    </div>
  );
}
