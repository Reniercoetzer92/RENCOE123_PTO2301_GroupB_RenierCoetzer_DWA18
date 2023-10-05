import { useState } from "react";
import "./Cards.css";


export default function Card() {
  const [isPlayDialogOpen, setIsPlayDialogOpen] = useState(false);

  const handlePlayButtonClick = () => {
    // Open the play dialog by setting isPlayDialogOpen to true
    setIsPlayDialogOpen(true);
  };

  const closePlayDialog = () => {
    // Close the play dialog by setting isPlayDialogOpen to false
    setIsPlayDialogOpen(false);
  };

  return (
    <div className="card">
      <sl-card class="card-overview">
        <img
          slot="image"
          src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
          alt="A kitten sits patiently between a terracotta pot and decorative grasses."
        />
        <strong>Title</strong>
        <br />
        description
        <br />
        <small>file</small>

        <div slot="footer">
          <sl-button variant="primary" pill onClick={handlePlayButtonClick}>
            Play
          </sl-button>
          <sl-rating></sl-rating>
        </div>
         {/* Render the play dialog if isPlayDialogOpen is true */}
      {isPlayDialogOpen && (
        <div className="play-dialog">
          {/* Add your play dialog content here */}
          <h2>Play Dialog</h2>
          {/* You can add additional content for the play dialog */}
          <sl-button variant="primary" onClick={closePlayDialog}>
            Close
          </sl-button>
        </div>
      )}
        
      </sl-card>
    </div>
  );
}
