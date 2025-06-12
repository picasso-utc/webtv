import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

import "./wallpic.css";

function App() {
    const [beers, setBeers] = useState([
        {
            id: 1,
            name: 'Cidre Kerisac',
            price: 1.20,
            change: 0,
            changePercent: 0,
            trend: 'stable',
            history: [{ time: Date.now(), price: 1.20 }]
        },
        {
            id: 2,
            name: 'Cidre Mordue',
            price: 1.80,
            change: 0,
            changePercent: 0,
            trend: 'stable',
            history: [{ time: Date.now(), price: 1.80 }]
        },
        {
            id: 3,
            name: 'Cuvée des Trolls',
            price: 1.80,
            change: 0,
            changePercent: 0,
            trend: 'stable',
            history: [{ time: Date.now(), price: 1.80 }]
        },
        {
            id: 4,
            name: 'Harmony',
            price: 1.80,
            change: 0,
            changePercent: 0,
            trend: 'stable',
            history: [{ time: Date.now(), price: 1.80 }]
        },
        {
            id: 5,
            name: 'Jack\'s',
            price: 1.75,
            change: 0,
            changePercent: 0,
            trend: 'stable',
            history: [{ time: Date.now(), price: 1.75 }]
        },
        {
            id: 6,
            name: 'Lupulus Fructus',
            price: 1.85,
            change: 0,
            changePercent: 0,
            trend: 'stable',
            history: [{ time: Date.now(), price: 1.85 }]
        },
        {
            id: 7,
            name: 'Lupulus Pils',
            price: 1.40,
            change: 0,
            changePercent: 0,
            trend: 'stable',
            history: [{ time: Date.now(), price: 1.40 }]
        },
        {
            id: 8,
            name: 'Quintine',
            price: 1.99,
            change: 0,
            changePercent: 0,
            trend: 'stable',
            history: [{ time: Date.now(), price: 1.99 }]
        },
        {
            id: 9,
            name: 'Silly Rouge',
            price: 1.99,
            change: 0,
            changePercent: 0,
            trend: 'stable',
            history: [{ time: Date.now(), price: 1.99 }]
        },
        {
            id: 10,
            name: 'Silly Swaf',
            price: 1.99,
            change: 0,
            changePercent: 0,
            trend: 'stable',
            history: [{ time: Date.now(), price: 1.99 }]
        },
        {
            id: 11,
            name: 'Tarot d\'or',
            price: 1.99,
            change: 0,
            changePercent: 0,
            trend: 'stable',
            history: [{ time: Date.now(), price: 1.99 }]
        },
        {
            id: 12,
            name: 'EAUUU',
            price: 0,
            change: 0,
            changePercent: 0,
            trend: 'stable',
            history: [{ time: Date.now(), price: 0 }]
        }
    ]);

    const [currentTime, setCurrentTime] = useState(new Date());
    const [marketStatus] = useState('OUVERT');

    // Simulation des fluctuations de prix avec historique
    useEffect(() => {
        const interval = setInterval(() => {
            setBeers(prevBeers =>
                prevBeers.map(beer => {
                    if (beer.id === 12) {
                        return {
                            ...beer,
                            price: 0,
                            change: 0,
                            changePercent: 0,
                            trend: 'stable',
                            history: [
                                ...beer.history.slice(-19),
                                { time: Date.now(), price: 0 }
                            ]
                        };
                    }

                    const fluctuation = (Math.random() - 0.5) * 0.2; // Fluctuation plus douce
                    const newPrice = Math.max(0.5, beer.price + fluctuation);
                    const change = newPrice - beer.price;
                    const changePercent = (change / beer.price) * 100;

                    let trend = 'stable';
                    if (changePercent > 0.5) trend = 'up';
                    else if (changePercent < -0.5) trend = 'down';

                    // Mettre à jour l'historique (garder les 20 derniers points)
                    const newHistory = [
                        ...beer.history.slice(-19),
                        { time: Date.now(), price: newPrice }
                    ];

                    return {
                        ...beer,
                        price: parseFloat(newPrice.toFixed(2)),
                        change: parseFloat(change.toFixed(2)),
                        changePercent: parseFloat(changePercent.toFixed(2)),
                        trend,
                        history: newHistory
                    };
                })
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

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

    const averagePrice = beers.reduce((sum, beer) => sum + beer.price, 0) / beers.length;

    return (
        <div className="min-h-screen bg-black text-white font-mono">
            {/* Header combiné avec statistiques */}
            <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-4 border-b border-gray-700">
                <div className="flex justify-between items-center">
                    {/* Section gauche : Logo + Titre + Status */}
                    <div className="flex items-center space-x-4">
                        <DollarSign className="w-8 h-8 text-yellow-400" />
                        <h1 className="text-2xl font-bold">WALL PIC CENTER</h1>
                        <span className="px-3 py-1 bg-green-600 text-sm rounded-full animate-pulse">
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
                    </div>

                    {/* Section droite : Heure */}
                    <div className="text-right">
                        <div className="text-sm text-gray-300">Heure de marché</div>
                        <div className="text-xl font-bold">{formatTime(currentTime)}</div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 py-2 overflow-hidden border-b border-gray-700">
                <div className="flex animate-scroll">
                    {beers.map((beer, index) => (
                        <div key={index} className="flex items-center space-x-2 mx-6 whitespace-nowrap">
                            <span className="font-semibold">{beer.name.toUpperCase()}</span>
                            <span className="text-yellow-400">{beer.price.toFixed(2)}€</span>
                            <span className={`flex items-center space-x-1 ${getTrendColor(beer.trend)}`}>
                {getTrendIcon(beer.trend)}
                                <span>{beer.change > 0 ? '+' : ''}{beer.change.toFixed(2)}€</span>
              </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Grille de cartes des bières */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {beers.map((beer) => (
                        <div
                            key={beer.id}
                            className={`rounded-lg border-2 p-4 transition-all duration-300 hover:scale-105 border-gray-700 bg-gray-900/50`}
                        >
                            {/* Header de la carte */}
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-bold text-white text-lg mb-1">{beer.name}</h3>
                                    <div className="text-2xl font-bold text-yellow-400">
                                        {beer.price.toFixed(2)}€
                                    </div>
                                </div>
                                <div className={`${getTrendColor(beer.trend)}`}>
                                    {getTrendIcon(beer.trend)}
                                </div>
                            </div>

                            {/* Variation */}
                            <div className="flex justify-between items-center mb-4">
                                <div className={`text-sm font-semibold ${getTrendColor(beer.trend)}`}>
                                    {beer.change > 0 ? '+' : ''}{beer.change.toFixed(2)}€
                                </div>
                                <div className={`text-sm font-semibold ${getTrendColor(beer.trend)}`}>
                                    {beer.changePercent > 0 ? '+' : ''}{(beer.changePercent || 0).toFixed(2)}%
                                </div>
                            </div>

                            {/* Graphique */}
                            <div className="h-24 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={beer.history}>
                                        <YAxis
                                            domain={['dataMin - 0.1', 'dataMax + 0.1']}
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
            </div>

            {/* Footer */}
            <div className="p-4 text-center text-gray-500 text-sm border-t border-gray-700">
                <p>🍺 WALL PIC CENTER 🍺</p>
                <p>Les prix sont mis à jour en temps réel • Buvez avec modération</p>
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