import { useEffect, useState } from 'react';

export default function ShowList() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of PREVIEW objects
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => {
        // Extract IDs from the fetched PREVIEW objects
        const showIds = data.map((preview) => preview.id);

        // Fetch detailed data for each show and store it in the state
        Promise.all(showIds.map((id) => fetch(`https://podcast-api.netlify.app/id/${id}`).then((response) => response.json())))
          .then((detailedData) => {
            setShows(detailedData);
            // Simulate a 2-second delay before hiding the spinner
            setTimeout(() => setLoading(false), 2000);
          })
          .catch((error) => {
            console.error('Error fetching detailed data:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching PREVIEW data:', error);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
        <sl-spinner ></sl-spinner>
      </div>
      ) : (
        <sl-carousel navigation pagination slides-per-page="4" slides-per-move="3">
          {shows.map((show, index) => (
            <sl-carousel-item key={index} style={{ background: 'black' }}>
              <a href={show.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={show.image}
                  alt={`Slide ${index + 1}`}
                  style={{ width: '300px', height: '180px', cursor: 'pointer' }}
                />
              </a>
            </sl-carousel-item>
          ))}
        </sl-carousel>
      )}
    </div>
  );
}
