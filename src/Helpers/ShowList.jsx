import { useEffect } from 'react';

export default function ShowList() {
  useEffect(() => {
    // Fetch the list of PREVIEW objects
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => {
        // Extract IDs from the fetched PREVIEW objects
        const showIds = data.map((preview) => preview.id);

        // Fetch detailed data for each show (if needed)
        showIds.forEach((id) => {
          fetch(`https://podcast-api.netlify.app/id/${id}`)
            .then((response) => response.json())
            .then((detailedData) => {
              console.log(`Fetched data for ID ${id}:`, detailedData);
            });
        });
      })
      .catch((error) => {
        console.error('Error fetching PREVIEW data:', error);
      });
  }, []);

  return (
    <div>
      {/* Render the list of shows or a loading indicator here */}
    </div>
  );
}
