import React from "react";
import Home from "./components/Home";
import "./styles/globals.css"; // Import your main CSS file (optional)

import { BrowserRouter } from "react-router-dom";
import About from "./components/About";
import Bubble from "./components/Bubble";
import Bubbles from "./components/Bubbles";
// import Navbar from "./components/Navbar";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          {/* <Head> */}
          <meta
            name="google-site-verification"
            content="VJs2G3ynvYQ1KG06ciOhdPdklC1gIUEkJ2KcplrnfWU"
          />
          <meta
            name="description"
            content="Kamal AIT YOUS portfolio. I am web developer, data analyst and machine learning enthusiast. PrasadChavan, Prasadchavan, Kamal AIT YOUS"
          />
          <title>Kamal AIT YOUS</title>
          {/* </Head> */}
          {/* Your Home page content goes here */}
          {/* <h1>Kamal AIT YOUS</h1>
          <p>Welcome to my portfolio!</p> */}
          <div className=" bg-wendyBlue">
            <div className="bg-blue-100 h-full relative">
              <Bubbles>
                <Bubble language="JS" color="#f0db4f" />
                <Bubble language="PHP" color="#778899" />
                <Bubble language="Python" color="#3572A5" />
              </Bubbles>
            </div>
            {/* <Navbar></Navbar> */}
            <Home></Home>
          </div>
          <About></About>
          {/* Add more content, images, links, etc. */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
