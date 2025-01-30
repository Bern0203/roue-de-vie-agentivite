import React, { useState, useRef } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Slider } from '../components/ui/slider';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Download, Plus, X } from 'lucide-react';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const graphRef = useRef(null);
  
  const domainesDefaut = [
    "Environnement personnel",
    "Carrière & Travail",
    "Loisirs & Découvertes",
    "Développement personnel",
    "Vie sentimentale",
    "Relations sociales",
    "Santé & Bien-être",
    "Finances",
  ];

  const [domaines, setDomaines] = useState(domainesDefaut);
  const [valeurs, setValeurs] = useState(domainesDefaut.map(() => 5));
  const [nouveauDomaine, setNouveauDomaine] = useState('');

  // Fonction pour télécharger l'image
  const handleDownload = () => {
    const svgElement = graphRef.current;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(svgBlob);
    downloadLink.download = 'roue-de-vie.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // ... [Le reste des fonctions reste identique]

  return (
    <div className="min-h-screen bg-light">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <img 
            src="/logo.png" 
            alt="Académie Agentivité" 
            className="h-16"
          />
          <h1 className="text-3xl text-primary">La Roue de la Vie</h1>
        </div>

        <Card className="w-full bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Partie gauche avec le graphique */}
              <div className="flex-1">
                <div className="relative">
                  <svg ref={graphRef} viewBox="0 0 320 320" className="w-full max-w-md mx-auto">
                    {/* ... [Code SVG existant] ... */}
                  </svg>
                  <Button 
                    onClick={handleDownload}
                    className="absolute top-0 right-0 bg-primary hover:bg-secondary"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger
                  </Button>
                </div>
              </div>

              {/* Partie droite avec les contrôles */}
              <div className="flex-1 space-y-4">
                {domaines.map((domaine, index) => (
                  <div key={`control-${index}`} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-primary flex-1">{domaine}</label>
                      <span className="text-sm font-bold text-secondary ml-2">
                        {valeurs[index]}/10
                      </span>
                      {index >= domainesDefaut.length && (
                        <Button 
                          variant="ghost"
                          size="sm"
                          onClick={() => supprimerDomaine(index)}
                          className="ml-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="relative pt-1">
                      <Slider
                        defaultValue={[valeurs[index]]}
                        max={10}
                        min={0}
                        step={1}
                        onValueChange={(newValue) => {
                          const newValeurs = [...valeurs];
                          newValeurs[index] = newValue[0];
                          setValeurs(newValeurs);
                        }}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-xs text-gray-500 px-1">
                        {[...Array(11)].map((_, i) => (
                          <span key={i} className="absolute" style={{left: `${i * 10}%`}}>{i}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Ajout de nouveau domaine */}
                <div className="flex gap-2 mt-6 pt-6 border-t">
                  <Input
                    type="text"
                    placeholder="Ajouter un domaine personnalisé"
                    value={nouveauDomaine}
                    onChange={(e) => setNouveauDomaine(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && ajouterDomaine()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={ajouterDomaine}
                    className="bg-primary hover:bg-secondary"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <footer className="mt-8 text-center text-sm text-secondary">
          <p className="hover:text-primary transition-colors">
            Pour toute question, contactez-nous : contact@academie-agentivite.fr
          </p>
        </footer>
      </main>
    </div>
  );
}
