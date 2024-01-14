import React, { useState, useEffect, useRef } from "react"
import { Box } from "@mui/material";
import Bg from "./assets/images/bg.png"
import Placeholder from "./assets/images/placeholder.png"
import TouchTable from "./components/TactionTable"

const radius = 100

const App = () => {
  const initialRender = useRef(true);
  const [xcoordinates, setXcoordinates] = useState([])
  const [ycoordinates, setYcoordinates] = useState([])

  useEffect(() => {
    const handleDoubleClick = (event) => {
      const coordinates = { clientX: event.clientX, clientY: event.clientY };
      setXcoordinates([...xcoordinates, coordinates.clientX]);
      setYcoordinates([...ycoordinates, coordinates.clientY]);
      if (window.require) {
        if (initialRender.current) {
          const { ipcRenderer } = window.require("electron");
          ipcRenderer.send("event-clicked", { "event-clicked": "start" });
        }
        initialRender.current = false
      }
    };

    var clickCount = 0;

    const doubleClickWrapper = (event) => {
      event.preventDefault();
      event.stopPropagation();
      clickCount++;
      let clickTimer
      if (clickCount === 1) {
        clickTimer = setTimeout(() => {
          clickCount = 0;
        }, 300);
      } else if (clickCount === 2) {
        clearTimeout(clickTimer);
        clickCount = 0;
        handleDoubleClick(event);
      }

    }
    document.addEventListener('click', doubleClickWrapper, false);
    return () => {
      document.removeEventListener('click', doubleClickWrapper);
    };
  }, [xcoordinates, ycoordinates])

  const onTouchMove = (event, index) => {
    let existingXcoordinates = [...xcoordinates]
    let existingYcoordinates = [...ycoordinates]
    existingXcoordinates[index] = event.touches[0].clientX
    existingYcoordinates[index] = event.touches[0].clientY
    setXcoordinates(existingXcoordinates)
    setYcoordinates(existingYcoordinates)
  }

  const handleClose = (index) => {
    let existingXcoordinates = [...xcoordinates]
    let existingYcoordinates = [...ycoordinates]
    existingXcoordinates.splice(index, 1)
    existingYcoordinates.splice(index, 1)
    setXcoordinates(existingXcoordinates)
    setYcoordinates(existingYcoordinates)
    if (existingXcoordinates.length === 0 && existingYcoordinates.length === 0) {
      if (window.require) {
        const { ipcRenderer } = window.require("electron");
        ipcRenderer.send("event-clicked", { "event-clicked": "reset" });
      } else {
        console.log("end")
      }
    }
  }

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
        </> :
        <>
          {xcoordinates.map((o, index) => {
            return <TouchTable handleClose={handleClose} index={index} key={index} x={(o - (radius * 1.5)) < 0 ? 0 : (o - (radius * 1.5))} y={(window.innerHeight - (ycoordinates[index]) - radius) < 0 ? 0 : (window.innerHeight - (ycoordinates[index]) - radius)} onTouchMove={onTouchMove} />
          })}
        </>
      }
    </Box >
  );
}

export default App;
