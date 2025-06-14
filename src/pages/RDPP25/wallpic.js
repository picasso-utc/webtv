import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

function App() {
    const [beers, setBeers] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [marketStatus, setMarketStatus] = useState('CHARGEMENT...');
    
    // Utiliser useRef pour garder une référence persistante aux prix précédents
    const previousPricesRef = useRef({});
    const isFirstLoadRef = useRef(true);

    const [refreshTime, setRefreshTime] = useState(10000);

    // Fonction pour récupérer les données depuis l'API
    const fetchBeerData = async () => {
        try {
            const response = await fetch('https://pic.assos.utc.fr/bourse');
            const res = await response.json();

            setRefreshTime(res.refresh);
            const data = res.data;
            
            setMarketStatus('OUVERT');
            
            // Traiter les données reçues
            const processedBeers = data.map(beer => {
                const currentPrice = parseFloat(beer.price);
                const previousPrice = previousPricesRef.current[beer.article_id];
                
                // Calculer les variations seulement si on a un prix précédent
                let change = 0;
                let changePercent = 0;
                let trend = 'stable';
                
                if (previousPrice !== undefined && !isFirstLoadRef.current) {
                    change = currentPrice - previousPrice;
                    changePercent = previousPrice !== 0 ? (change / previousPrice) * 100 : 0;
                    
                    // Seuil plus sensible pour détecter les changements
                    if (Math.abs(changePercent) > 0.01) {
                        trend = change > 0 ? 'up' : 'down';
                    }
                }

                return {
                    id: beer.article_id,
                    name: beer.article_name,
                    price: currentPrice,
                    change: parseFloat(change.toFixed(2)),
                    changePercent: parseFloat(changePercent.toFixed(2)),
                    trend,
                    history: [] // L'historique sera géré séparément
                };
            });

            // Mettre à jour l'historique pour chaque bière
            setBeers(prevBeers => {
                return processedBeers.map(newBeer => {
                    const existingBeer = prevBeers.find(b => b.id === newBeer.id);
                    const newHistory = existingBeer ? [
                        ...existingBeer.history.slice(-19),
                        { time: Date.now(), price: newBeer.price }
                    ] : [{ time: Date.now(), price: newBeer.price }];

                    return {
                        ...newBeer,
                        history: newHistory
                    };
                });
            });

            // Mettre à jour les prix précédents APRÈS le calcul
            data.forEach(beer => {
                previousPricesRef.current[beer.article_id] = parseFloat(beer.price);
            });
            
            // Marquer que le premier chargement est terminé
            isFirstLoadRef.current = false;

        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            setMarketStatus('ERREUR');
        }
    };

    useEffect(() => {
        fetchBeerData();

        const interval = setInterval(fetchBeerData, refreshTime);

        return () => clearInterval(interval);
    }, [refreshTime]);

    // Mise à jour de l'horloge
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const getTrendColor = (trend) => {
        switch (trend) {
            case 'up': return 'text-green-400';
            case 'down': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    const getTrendBgColor = (trend) => {
        switch (trend) {
            case 'up': return 'border-green-500 bg-green-900/20';
            case 'down': return 'border-red-500 bg-red-900/20';
            default: return 'border-gray-700 bg-gray-900/50';
        }
    };

    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'up': return <TrendingUp className="w-5 h-5" />;
            case 'down': return <TrendingDown className="w-5 h-5" />;
            default: return <BarChart3 className="w-5 h-5" />;
        }
    };

    const getLineColor = (trend) => {
        switch (trend) {
            case 'up': return '#22c55e';
            case 'down': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const averagePrice = beers.length > 0 ? 
        beers.reduce((sum, beer) => sum + beer.price, 0) / beers.length : 0;

    return (
        <div className="min-h-screen bg-black text-white font-mono">
            {/* Header combiné avec statistiques */}
            <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-4 border-b border-gray-700">
                <div className="flex justify-between items-center">
                    {/* Section gauche : Logo + Titre + Status */}
                    <div className="flex items-center space-x-4">
                        <DollarSign className="w-8 h-8 text-yellow-400" />
                        <h1 className="text-2xl font-bold">WALL PIC CENTER</h1>
                        <span className={`px-3 py-1 text-sm rounded-full ${
                            marketStatus === 'OUVERT' ? 'bg-green-600 animate-pulse' :
                            marketStatus === 'ERREUR' ? 'bg-red-600' : 'bg-yellow-600'
                        }`}>
                            {marketStatus}
                        </span>
                    </div>

                    {/* Statistiques centrées */}
                    <div className="flex items-center space-x-8 text-center">
                        <div>
                            <div className="text-xs text-gray-300">Prix Moyen</div>
                            <div className="text-lg font-bold text-yellow-400">{averagePrice.toFixed(2)}€</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-300">En hausse</div>
                            <div className="text-lg font-bold text-green-400">
                                {beers.filter(beer => beer.trend === 'up').length}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-300">En baisse</div>
                            <div className="text-lg font-bold text-red-400">
                                {beers.filter(beer => beer.trend === 'down').length}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-300">Stable</div>
                            <div className="text-lg font-bold text-gray-400">
                                {beers.filter(beer => beer.trend === 'stable').length}
                            </div>
                        </div>
                    </div>

                    {/* Section droite : Heure */}
                    <div className="text-right">
                        <div className="text-sm text-gray-300">Heure de marché</div>
                        <div className="text-xl font-bold">{formatTime(currentTime)}</div>
                    </div>
                </div>
            </div>

            {/* Bandeau défilant */}
            <div className="bg-gray-900 py-2 overflow-hidden border-b border-gray-700">
                <div className="flex animate-scroll">
                    {beers.map((beer, index) => (
                        <div key={`${beer.id}-${index}`} className="flex items-center space-x-2 mx-6 whitespace-nowrap">
                            <span className="font-semibold">{beer.name.toUpperCase()}</span>
                            <span className="text-yellow-400">{beer.price.toFixed(2)}€</span>
                            <span className={`flex items-center space-x-1 ${getTrendColor(beer.trend)}`}>
                                {getTrendIcon(beer.trend)}
                                <span>{beer.change > 0 ? '+' : ''}{beer.change.toFixed(2)}€</span>
                                <span>({beer.changePercent > 0 ? '+' : ''}{beer.changePercent.toFixed(2)}%)</span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Grille de cartes des bières */}
            <div className="p-6">
                {beers.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-lg">Chargement des données...</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {beers.map((beer) => (
                            <div
                                key={beer.id}
                                className={`rounded-lg border-2 p-4 transition-all duration-300 hover:scale-105 ${getTrendBgColor(beer.trend)}`}
                            >
                                {/* Header de la carte */}
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-bold text-white text-xl mb-1">{beer.name}</h3>
                                        <div className="text-3xl font-bold text-yellow-400">
                                            {beer.price.toFixed(2)}€
                                        </div>
                                    </div>
                                    <div className={`${getTrendColor(beer.trend)}`}>
                                        {getTrendIcon(beer.trend)}
                                    </div>
                                </div>

                                {/* Variation */}
                                <div className="flex justify-between items-center mb-4">
                                    <div className={`text-base font-semibold ${getTrendColor(beer.trend)}`}>
                                        {beer.change > 0 ? '+' : ''}{beer.change.toFixed(2)}€
                                    </div>
                                    <div className={`text-base font-semibold ${getTrendColor(beer.trend)}`}>
                                        {beer.changePercent > 0 ? '+' : ''}{beer.changePercent.toFixed(2)}%
                                    </div>
                                </div>

                                {/* Graphique */}
                                <div className="h-24 w-full">
                                    {beer.history && beer.history.length > 1 ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={beer.history}>
                                                <YAxis
                                                    domain={['dataMin - 0.01', 'dataMax + 0.01']}
                                                    hide
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="price"
                                                    stroke={getLineColor(beer.trend)}
                                                    strokeWidth={2}
                                                    dot={false}
                                                    activeDot={{ r: 3, fill: getLineColor(beer.trend) }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                                            Données insuffisantes
                                        </div>
                                    )}
                                </div>

                                {/* Indicateur de tendance */}
                                <div className="mt-3 text-center">
                                    <span className={`text-xs uppercase tracking-wider font-semibold ${getTrendColor(beer.trend)}`}>
                                        {beer.trend === 'up' ? 'HAUSSE' : beer.trend === 'down' ? 'BAISSE' : 'STABLE'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 text-center text-gray-500 text-sm border-t border-gray-700">
                <p>🍺 WALL PIC CENTER 🍺</p>
                <p>Les prix sont mis à jour toutes les 5 secondes • Buvez avec modération</p>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-scroll {
                    animation: scroll 30s linear infinite;
                }
            `}</style>
        </div>
    );
}

export default App;