import React, { useState, useEffect, useRef } from "react"
import { Box } from "@mui/material";
import Bg from "./assets/images/bg.png"
import Placeholder from "./assets/images/placeholder.svg"
import TouchTable from "./components/TactionTable"

const radius = 100

const App = () => {
  const initialRender = useRef(true);
  const [xcoordinates, setXcoordinates] = useState([])
  const [ycoordinates, setYcoordinates] = useState([])

  // useEffect(() => {
  //   if (window.require) {
  //     let timerId;
  //     const { ipcRenderer } = window.require("electron");
  //     ipcRenderer.on("socket-data", (event, data) => {
  //       setXcoordinates(data.x)
  //       setYcoordinates(data.y)
  //       if (initialRender.current) {
  //         ipcRenderer.send("event-clicked", { "event-clicked": "start" });
  //       }
  //       clearTimeout(timerId);
  //       initialRender.current = false
  //       timerId = setTimeout(() => {
  //         ipcRenderer.send("event-clicked", { "event-clicked": "reset" });
  //         setXcoordinates([]);
  //         setYcoordinates([]);
  //         initialRender.current = true
  //       }, 3000);
  //     });
  //     return () => {
  //       ipcRenderer.removeAllListeners("socket-data");
  //     };
  //   }
  // }, []);

  function calculateDistance(point1, point2) {
    return Math.sqrt(Math.pow(point1.clientX - point2.clientX, 2) + Math.pow(point1.clientY - point2.clientY, 2));
  }

  function isTriangle(entity) {
    const points = [
      { clientX: entity[0].clientX, clientY: entity[0].clientY },
      { clientX: entity[1].clientX, clientY: entity[1].clientY },
      { clientX: entity[2].clientX, clientY: entity[2].clientY }
    ];
    const distances = [
      calculateDistance(points[0], points[1]),
      calculateDistance(points[1], points[2]),
      calculateDistance(points[2], points[0])
    ];
    const threshold = 150;
    return distances.every((distance, index, array) => Math.abs(distance - array[(index + 1) % 3]) < threshold);
  }

  useEffect(() => {
    const handleTouchMove = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const touches = event.touches;
      if (touches.length % 3 === 0) {
        const touchCoordinates = [];
        for (let i = 0; i < touches.length; i++) {
          touchCoordinates.push({ clientX: touches[i].clientX, clientY: touches[i].clientY })
        }
        const noOfTriangles = event.touches.length / 3;
        for (let j = 0; j < noOfTriangles; j++) {
          let newTouches = touchCoordinates.splice(j, ((j + 1) * 3))
          if (newTouches.length === 3) {
            const triangle = isTriangle(newTouches);
            if (triangle) {
              function calculateCenter(coordinates) {
                const totalPoints = coordinates.length;
                const sumX = coordinates.reduce((acc, point) => acc + point.clientX, 0);
                const sumY = coordinates.reduce((acc, point) => acc + point.clientY, 0);
                const centerX = sumX / totalPoints;
                const centerY = sumY / totalPoints;
                setXcoordinates([...xcoordinates, centerX])
                setYcoordinates([...ycoordinates, centerY])
                if (window.require) {
                  let timerId;
                  const { ipcRenderer } = window.require("electron");
                  if (initialRender.current) {
                    ipcRenderer.send("event-clicked", { "event-clicked": "start" });
                  }
                  clearTimeout(timerId);
                  initialRender.current = false
                  timerId = setTimeout(() => {
                    ipcRenderer.send("event-clicked", { "event-clicked": "reset" });
                    const endedTouchIds = Array.from(event.changedTouches).map(touch => touch.identifier);
                    const remainingX = xcoordinates.filter((_, index) => !endedTouchIds.includes(index));
                    const remainingY = ycoordinates.filter((_, index) => !endedTouchIds.includes(index));
                    setXcoordinates(remainingX);
                    setYcoordinates(remainingY);
                    initialRender.current = true
                  }, 3000);
                } else {
                  let timerId;
                  clearTimeout(timerId);
                  initialRender.current = false
                  timerId = setTimeout(() => {
                    const endedTouchIds = Array.from(event.changedTouches).map(touch => touch.identifier);
                    const remainingX = xcoordinates.filter((_, index) => !endedTouchIds.includes(index));
                    const remainingY = ycoordinates.filter((_, index) => !endedTouchIds.includes(index));
                    setXcoordinates(remainingX);
                    setYcoordinates(remainingY);
                    initialRender.current = true
                  }, 3000);
                }
                return { centerX, centerY };
              }
              const coordinates = []
              for (let i = 0; i < newTouches.length; i++) {
                coordinates.push({ clientX: newTouches[i].clientX, clientY: newTouches[i].clientY })
              }
              calculateCenter(coordinates);
            }
          }
        }
      }
    }
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };
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
