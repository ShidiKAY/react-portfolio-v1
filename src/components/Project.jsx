import React from "react";
import Bubo from "./modals/Bubo";

import "/src/styles/radixui.css";

const Project = ({ title, description, image, technologies, link }) => {
  return (
    <div className="project-card">
      <img src={image} alt="Image du projet" />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <Bubo></Bubo>
      </div>

      <style>
        {`\
          /* Project card styles */
          .project-grid {
            display: grid;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0px;
            justify-content: center; /* Center items horizontally */
            align-items: center; /* Center items vertically (optional for vertical centering) */          
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }
          
          
          .project-card {
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: 10px;
            padding: 20px;
            text-align: center;
            transition: all 0.2s ease-in-out;
            width: 300px; /* Adjust width as needed */\
            display: inline-block; /* Allow multiple cards per row */
          }


          /* Media query for smaller screens (adjust breakpoint as needed) */
          @media (max-width: 768px) {
            .project-card {
              max-width: 100%; /* Full width on smaller screens */
            }
          }

          .project-card img {
            border-radius: 10px;
            display: block;
            margin: 0 auto;
            max-width: 100%;
          }

          .project-card h3 {
            font-size: 18px;
            font-weight: bold;
            margin: 10px 0;
          }

          .project-card p {
            font-size: 16px;
            line-height: 1.5;
            margin: 10px 0;
          }

          .project-card a {
            color: #000;
            font-size: 16px;
            font-weight: bold;
            text-decoration: none;
            margin-bottom: 10px; /* Add space between link and button */

            &:hover {
              text-decoration: underline;
            }
          }

          .project-card button {
            background-color: #3498db; /* Adjust button color */
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            padding: 5px 10px;
            transition: all 0.2s ease-in-out;
          }

          .project-card button:hover {
            background-color: #2980b9; /* Adjust button hover color */
          }

          /* Modal styles */
          .modal {
            background-color: rgba(0, 0, 0, 0.8);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 100;
            display: flex;
          }

          .modal.open {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .modal-content {
            background-color: #fff;
            border-radius: 10px;
            margin: 50px auto; /* Adjust margin as needed */
            padding: 20px;
            position: relative;
            width: 80%;
            max-width: 500px; /* Set a maximum width for responsiveness */
          }

          .modal-content h2 {
            font-size: 20px;
            font-weight: bold;
            margin: 10px 0;
          }

          .modal-content p {
            font-size: 16px;
            line-height: 1.5;
            margin: 10px 0;
          }

          .modal-content ul {
            list-style: none;
            margin: 10px 0;
            padding: 0;
          }

          .modal-content li {
            margin: 5px 0;
          }

          .modal-content a {
            color: #000;
            font-size: 16px;
            font-weight: bold;
            text-decoration: none;

            &:hover {
              text-decoration: underline;
            }
          }

          /* Close button styles */
          .modal-content .close-modal-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: #fff;
            border: none;
            border-radius: 50%; /* Circular close button */
            color: #000;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            padding: 5px;
            transition: all 0.2s ease-in-out;
          }

          .modal-content .close-modal-btn:hover {
            background-color: #ddd;
          }
        }
      `}
      </style>
    </div>
  );
};

export default Project;
