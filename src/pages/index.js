import React, { useState } from 'react'
import { Card, CardContent } from '../components/ui/card'
import { Slider } from '../components/ui/slider'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Alert, AlertDescription } from '../components/ui/alert'

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [email, setEmail] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  
  const domainesDefaut = [
    "Environnement personnel",
    "Carrière & Travail",
    "Loisirs & Découvertes",
    "Développement personnel",
    "Vie sentimentale",
    "Relations sociales",
    "Santé & Bien-être",
    "Finances",
  ]

  const [domaines, setDomaines] = useState(domainesDefaut)
  const [valeurs, setValeurs] = useState(domainesDefaut.map(() => 5))
  const [nouveauDomaine, setNouveauDomaine] = useState('')

  const IntroSection = () => (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <img 
        src="/logo.png" 
        alt="Académie Agentivité" 
        className="h-24 mx-auto mb-8"
      />
      <h1 className="text-4xl mb-6 text-primary">La Roue de la Vie</h1>
      <p className="text-lg mb-8 text-secondary">
        La Roue de la Vie est un outil puissant d'auto-évaluation qui vous permet de visualiser votre niveau de satisfaction 
        dans les différents domaines de votre vie. Cette prise de conscience est souvent le premier pas vers un changement positif 
        et une vie plus équilibrée.
      </p>
      <Button 
        onClick={() => setShowIntro(false)}
        className="bg-primary hover:bg-secondary text-white"
      >
        Commencer l'évaluation
      </Button>
    </div>
  )

  const calculerPoints = () => {
    const points = valeurs.map((valeur, index) => {
      const angle = (Math.PI * 2 * index) / domaines.length
      const rayon = (valeur * 120) / 10
      return `${160 + rayon * Math.cos(angle - Math.PI/2)},${160 + rayon * Math.sin(angle - Math.PI/2)}`
    })
    return points.join(' ')
  }

  const ajouterDomaine = () => {
    if (nouveauDomaine.trim()) {
      setDomaines([...domaines, nouveauDomaine.trim()])
      setValeurs([...valeurs, 5])
      setNouveauDomaine('')
    }
  }

  const supprimerDomaine = (index) => {
    if (index >= domainesDefaut.length) {
      const nouveauxDomaines = domaines.filter((_, i) => i !== index)
      const nouvellesValeurs = valeurs.filter((_, i) => i !== index)
      setDomaines(nouveauxDomaines)
      setValeurs(nouvellesValeurs)
    }
  }

  if (showIntro) {
    return <IntroSection />
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
          <h1 className="text-3xl text-primary">La Roue de la Vie</h1>
        </div>

        <Card className="w-full bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* SVG de la roue */}
              <div className="flex-1">
                <svg viewBox="0 0 320 320" className="w-full max-w-md mx-auto">
                  {/* Cercles concentriques */}
                  {[...Array(10)].map((_, i) => (
                    <circle
                      key={`circle-${i}`}
                      cx="160"
                      cy="160"
                      r={12 * (i + 1)}
                      fill="none"
                      stroke="#E4E2DD"
                      strokeWidth="0.5"
                    />
                  ))}
                  
                  {/* Lignes des domaines */}
                  {domaines.map((_, index) => {
                    const angle = (Math.PI * 2 * index) / domaines.length
                    return (
                      <line
                        key={`line-${index}`}
                        x1="160"
                        y1="160"
                        x2={160 + 120 * Math.cos(angle - Math.PI/2)}
                        y2={160 + 120 * Math.sin(angle - Math.PI/2)}
                        stroke="#E4E2DD"
                        strokeWidth="0.5"
                      />
                    )
                  })}

                  {/* Polygone des valeurs */}
                  <polygon
                    points={calculerPoints()}
                    fill="rgba(49, 85, 91, 0.2)"
                    stroke="#31555B"
                    strokeWidth="2"
                  />

                  {/* Labels des domaines */}
                  {domaines.map((domaine, index) => {
                    const angle = (Math.PI * 2 * index) / domaines.length
                    const x = 160 + 140 * Math.cos(angle - Math.PI/2)
                    const y = 160 + 140 * Math.sin(angle - Math.PI/2)
                    return (
                      <text
                        key={`text-${index}`}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fill="#0C2234"
                        fontSize="8"
                        transform={`rotate(${(360 * index) / domaines.length}, ${x}, ${y})`}
                      >
                        {domaine}
                      </text>
                    )
                  })}
                </svg>
              </div>

              {/* Contrôles des valeurs */}
              <div className="flex-1 space-y-4">
                {/* Liste des domaines avec leurs sliders */}
                {domaines.map((domaine, index) => (
                  <div key={`control-${index}`} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm text-primary">{domaine}</label>
                      {index >= domainesDefaut.length && (
                        <Button 
                          variant="ghost"
                          size="sm"
                          onClick={() => supprimerDomaine(index)}
                        >
                          ✕
                        </Button>
                      )}
                    </div>
                    <Slider
                      defaultValue={[valeurs[index]]}
                      max={10}
                      min={0}
                      step={1}
                      onValueChange={(newValue) => {
                        const newValeurs = [...valeurs]
                        newValeurs[index] = newValue[0]
                        setValeurs(newValeurs)
                      }}
                    />
                  </div>
                ))}

                {/* Ajout de nouveau domaine */}
                <div className="flex gap-2 mt-6">
                  <Input
                    type="text"
                    placeholder="Ajouter un domaine personnalisé"
                    value={nouveauDomaine}
                    onChange={(e) => setNouveauDomaine(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && ajouterDomaine()}
                  />
                  <Button 
                    onClick={ajouterDomaine}
                    className="bg-primary hover:bg-secondary"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <footer className="mt-8 text-center text-sm text-secondary">
          <p>Pour toute question, contactez-nous : contact@academie-agentivite.fr</p>
        </footer>
      </main>
    </div>
  )
}
