// AniList API Service
const ANILIST_API_URL = 'https://graphql.anilist.co';

/**
 * Make a GraphQL query to AniList API
 * @param {string} query - GraphQL query string
 * @param {object} variables - Variables for the query
 * @returns {Promise} - Response data
 */
const fetchAniListData = async (query, variables = {}) => {
  try {
    const response = await fetch(ANILIST_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const data = await response.json();
    
    if (data.errors) {
      console.error('AniList API errors:', data.errors);
      throw new Error(data.errors[0].message);
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching from AniList:', error);
    throw error;
  }
};

/**
 * Search for anime by title
 * @param {string} searchTerm - Search query
 * @param {number} page - Page number (default: 1)
 * @param {number} perPage - Items per page (default: 10)
 * @returns {Promise} - List of anime
 */
export const searchAnime = async (searchTerm, page = 1, perPage = 10) => {
  const query = `
    query ($search: String, $page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
        }
        media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
            medium
          }
          bannerImage
          description
          episodes
          status
          averageScore
          genres
          seasonYear
        }
      }
    }
  `;

  const variables = {
    search: searchTerm,
    page,
    perPage,
  };

  const data = await fetchAniListData(query, variables);
  return data.Page.media;
};

/**
 * Get trending anime
 * @param {number} page - Page number (default: 1)
 * @param {number} perPage - Items per page (default: 10)
 * @returns {Promise} - List of trending anime
 */
export const getTrendingAnime = async (page = 1, perPage = 10) => {
  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
        }
        media(type: ANIME, sort: TRENDING_DESC) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
            medium
          }
          bannerImage
          description
          episodes
          status
          averageScore
          genres
          seasonYear
        }
      }
    }
  `;

  const variables = {
    page,
    perPage,
  };

  const data = await fetchAniListData(query, variables);
  return data.Page.media;
};

/**
 * Get popular anime
 * @param {number} page - Page number (default: 1)
 * @param {number} perPage - Items per page (default: 10)
 * @returns {Promise} - List of popular anime
 */
export const getPopularAnime = async (page = 1, perPage = 10) => {
  const query = `
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
        }
        media(type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
            medium
          }
          bannerImage
          description
          episodes
          status
          averageScore
          genres
          seasonYear
        }
      }
    }
  `;

  const variables = {
    page,
    perPage,
  };

  const data = await fetchAniListData(query, variables);
  return data.Page.media;
};

/**
 * Get anime by ID
 * @param {number} id - Anime ID
 * @returns {Promise} - Anime details
 */
export const getAnimeById = async (id) => {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
        }
        bannerImage
        description
        episodes
        status
        averageScore
        genres
        seasonYear
        studios {
          nodes {
            name
          }
        }
        relations {
          edges {
            relationType
            node {
              id
              title {
                romaji
              }
              coverImage {
                medium
              }
            }
          }
        }
      }
    }
  `;

  const variables = { id };

  const data = await fetchAniListData(query, variables);
  return data.Media;
};

/**
 * Helper function to format anime data for your app
 * @param {object} anilistAnime - Anime object from AniList
 * @returns {object} - Formatted anime object
 */
export const formatAnimeData = (anilistAnime) => {
  return {
    id: anilistAnime.id,
    title: anilistAnime.title.english || anilistAnime.title.romaji || anilistAnime.title.native,
    image: anilistAnime.coverImage.large || anilistAnime.coverImage.medium,
    bannerImage: anilistAnime.bannerImage,
    description: anilistAnime.description,
    episodes: anilistAnime.episodes,
    status: anilistAnime.status,
    score: anilistAnime.averageScore,
    genres: anilistAnime.genres,
    year: anilistAnime.seasonYear,
  };
};
