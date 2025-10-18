import './App.css';
import AnimeCard from './Components/AnimeCard';
import { useState, useEffect } from 'react';
import { getTrendingAnime, searchAnime, formatAnimeData } from './services/anilistService';

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch trending anime on component mount
  useEffect(() => {
    fetchTrendingAnime();
  }, []);

  const fetchTrendingAnime = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTrendingAnime(1, 12); // Get 12 trending anime
      const formattedData = data.map(formatAnimeData);
      setAnimeList(formattedData);
    } catch (err) {
      setError('Failed to fetch anime. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchTrendingAnime();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await searchAnime(searchTerm, 1, 12);
      const formattedData = data.map(formatAnimeData);
      setAnimeList(formattedData);
    } catch (err) {
      setError('Failed to search anime. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnimeClick = (anime) => {
    console.log("Clicked anime:", anime);
    alert(`${anime.title}\n\nScore: ${anime.score}/100\nEpisodes: ${anime.episodes || 'N/A'}\nStatus: ${anime.status}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Anime Watch Tracker</h1>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search for anime..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '25px',
              border: '2px solid #61dafb',
              width: '300px',
              marginRight: '10px',
              backgroundColor: '#282c34',
              color: 'white'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 30px',
              fontSize: '16px',
              borderRadius: '25px',
              border: 'none',
              backgroundColor: '#61dafb',
              color: '#282c34',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Search
          </button>
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                fetchTrendingAnime();
              }}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '25px',
                border: '2px solid #61dafb',
                backgroundColor: 'transparent',
                color: '#61dafb',
                cursor: 'pointer',
                marginLeft: '10px'
              }}
            >
              Clear
            </button>
          )}
        </form>

        {/* Loading State */}
        {loading && <p>Loading anime...</p>}

        {/* Error State */}
        {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}

        {/* Anime Grid */}
        {!loading && !error && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
            padding: '20px',
            maxWidth: '1200px',
            width: '100%'
          }}>
            {animeList.map((anime) => (
              <AnimeCard 
                key={anime.id} 
                anime={anime} 
                onClick={handleAnimeClick} 
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && animeList.length === 0 && (
          <p>No anime found. Try a different search term.</p>
        )}
      </header>
    </div>
  );
}

export default App;
