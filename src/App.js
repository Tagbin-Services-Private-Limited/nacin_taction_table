import React, { useState, useEffect } from "react"
import { Box } from "@mui/material";
import Bg from "./assets/images/bg.png"
import Placeholder from "./assets/images/placeholder1.svg"
import TouchTable from "./components/TactionTable"

const radius = 100

const App = () => {
  const [xcoordinates, setXcoordinates] = useState([])
  const [ycoordinates, setYcoordinates] = useState([])

  useEffect(() => {
    if (window.require) {
      let timerId;
      const { ipcRenderer } = window.require("electron");
      ipcRenderer.on("socket-data", (event, data) => {
        setXcoordinates(data.x)
        setYcoordinates(data.y)
        clearTimeout(timerId);
        timerId = setTimeout(() => {
          ipcRenderer.send("event-clicked", { "event-clicked": "reset" });
          setXcoordinates([]);
          setYcoordinates([]);
        }, 5000);
      });
      return () => {
        ipcRenderer.removeAllListeners("socket-data");
      };
    }
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: 'url(' + Bg + ')',
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}>
      {xcoordinates.length === 0 ?
        <>
          <img src={Placeholder} alt="placeholder" />
          <h1
            style={{
              fontFamily: "'Red Rose', serif",
              fontSize: "22px",
              fontWeight: 700,
              marginLeft: '100px'
            }}>
            PLACE YOUR DISK ON THE PLACEHOLDER TO EXPLORE TOPICS
          </h1>
          {/* <Button
            variant="contained"
            onClick={() => {
              setXcoordinates([1])
              setYcoordinates([1])
            }}>
            Enter
          </Button> */}
        </> :
        <>
          {xcoordinates.map((o, index) => {
            return <TouchTable key={index} x={(o - (radius * 1.5)) < 0 ? 0 : (o - (radius * 1.5))} y={(window.innerHeight - (ycoordinates[index]) - radius) < 0 ? 0 : (window.innerHeight - (ycoordinates[index]) - radius)} />
          })}
        </>
      }
    </Box >
  );
}

export default App;
