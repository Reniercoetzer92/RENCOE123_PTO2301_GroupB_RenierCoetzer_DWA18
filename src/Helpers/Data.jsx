export const fetchShowData = async () => {
  try {
    const previewResponse = await fetch('https://podcast-api.netlify.app/shows');
    const previewData = await previewResponse.json();

    const showIds = previewData.map((preview) => preview.id);

    const detailedData = await Promise.all(
      showIds.map(async (id) => {
        const detailedResponse = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        return await detailedResponse.json();
      })
    );

    return { previewData, detailedData };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
};
