import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Placeholder from "../../assets/images/placeholder1.svg";
import BtnBackground from "../../assets/images/btnBg.png"
import BtnBackgroundActive from "../../assets/images/btnBgActive.png"
import audioFile from "../../assets/audio/audio.mp3"
import { useRef } from "react";
import arrowImage from "../../assets/images/arrow.svg"
import btn1Active from "../../assets/images/btn1Active.png"
import btn2Active from "../../assets/images/btn2Active.png"
import btn3Active from "../../assets/images/btn3Active.png"
import btn1Inactive from "../../assets/images/btn1Inactive.png"
import btn2Inactive from "../../assets/images/btn2Inactive.png"
import btn3Inactive from "../../assets/images/btn3Inactive.png"
import american_alligator from "../../assets/images/american_alligator.png"
import cape_stag_beetle from "../../assets/images/cape_stag_beetle.png"
import corals from "../../assets/images/corals.png"
import giant_panda from "../../assets/images/giant_panda.png"
import gorilla from "../../assets/images/gorilla.png"
import indian_star_tortoise from "../../assets/images/indian_star_tortoise.png"
import lion_african from "../../assets/images/lion-african.png"
import lion_indian from "../../assets/images/lion-indian.png"
import map_turtles from "../../assets/images/map_turtles.png"
import owl from "../../assets/images/owl.png"
import paddlefish from "../../assets/images/paddlefish.png"
import pangolin from "../../assets/images/pangolin.png"
import sea_turtle from "../../assets/images/sea_turtle.png"
import smooth_coated_otter from "../../assets/images/smooth_coated_otter.png"
import walrus from "../../assets/images/walrus.png"


const lineLength = 60;
const imageWidth = 282;
const cardHeight = 160;
const buttonHeight = 40;
const buttonWidth = 240;
const animationDuration = 2000;
const buttonAnimationDuration = 1000;
const threshold = 300

const btnCardsMap = {
    basel_convention: [
        'biomedical_and_healthcare_wastes',
        'used_oils',
        'used_lead_acid_batteries',
        'persistent_organic_pollutant_wastes',
        'polychlorinated_biphenyls',
        'electronic_and_electrical_waste',
        'plastic_waste',
        'ship_destined_for_dismantling',
        'mercury_and_asbestos_waste',
    ],
    montreal_protocol: [
        'chlorofluorocarbon',
        'hydrochlorofluorocarbon',
        'hydrofluorocarbon',
        'halons',
        'carbon_tetrachloride',
        'methyl_bromide',
    ],
    cites: {
        1: [
            'gorilla',
            'sea_turtle',
            'giant_panda',
            'lion-indian',
            'pangolin',
            'walrus',
            'smooth_coated_otter',
            'indian_star_tortoise',
        ],
        2: [
            'small_clawed_otter',
            'paddlefish',
            'lion-african',
            'owl',
            'american_alligator',
            'corals',
        ], 3: [
            'map_turtles',
            'cape_stag_beetle'
        ]
    }
}

const renderItem = {
    biomedical_and_healthcare_wastes: {
        value: "Biomedical & Healthcare Wastes",
    },
    polychlorinated_biphenyls: {
        value: "Polychlorinated Biphenyls (PCBs)",
    },
    electronic_and_electrical_waste: {
        value: "Electronic and Electrical Waste (E – Waste)",
    },
    mercury_and_asbestos_waste: {
        value: "Mercury & Asbestos Waste",
    },
    chlorofluorocarbon: {
        value: "Chlorofluoro-carbon (CFC)"
    },
    hydrochlorofluorocarbon: {
        value: "Hydrochloro-fluorocarbon (HCFC)"
    },
    hydrofluorocarbon: {
        value: "Hydrofluoro-carbon (HFC)"
    },
    carbon_tetrachloride: {
        value: "Carbon Tetrachloride (CTC)"
    },
    gorilla: {
        value: "Gorilla",
        image: gorilla
    },
    sea_turtle: {
        value: "Sea Turtle",
        image: sea_turtle
    },
    giant_panda: {
        value: "Giant Panda",
        image: giant_panda
    },
    smooth_coated_otter: {
        value: "Smooth Coated Otter",
        image: smooth_coated_otter
    },
    indian_star_tortoise: {
        value: "Indian Star Tortoise",
        image: indian_star_tortoise
    },
    "lion-indian": {
        value: "Lion-Indian",
        image: lion_indian
    },
    walrus: {
        value: "Walrus",
        image: walrus
    },
    pangolin: {
        value: "Pangolin",
        image: pangolin
    },
    small_clawed_otter: {
        value: "Small Clawed Otter",
        image: smooth_coated_otter
    },
    paddlefish: {
        value: "Paddlefish",
        image: paddlefish
    },
    "lion-african": {
        value: "Lion-African",
        image: lion_african
    },
    owl: {
        value: "Owl",
        image: owl
    },
    american_alligator: {
        value: "American Alligator",
        image: american_alligator
    },
    corals: {
        value: "Corals",
        image: corals
    },
    map_turtles: {
        value: "Map Turtles",
        image: map_turtles
    },
    cape_stag_beetle: {
        value: "Cape Stag Beetle",
        image: cape_stag_beetle
    },
}

const TouchTable = (data) => {
    const isPaused = React.useRef(false);
    const audioRef = React.useRef(new Audio(audioFile));
    const [cordinates, setCordinates] = useState();
    const [selectedBtn, setSelectedBtn] = useState('');
    const [selectedCard, setSelectedCard] = useState('');
    const [isSpaceOnTop, setIsSpaceOnTop] = useState(false);
    const [isSpaceOnRight, setIsSpaceOnRight] = useState(false);
    const [isLogoAnimated, setIsLogoAnimated] = useState(false);
    const [animateOtherContent, setAnimateAnotherContent] = useState(false);
    const prevCoordinates = useRef({ x: undefined, y: undefined });
    const isInitialRender = useRef(true);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(5);
    const [appendix, setAppendix] = useState(1)

    useEffect(() => {
        const newCoordinates = { x: data.x, y: data.y };
        let x = newCoordinates.x;
        let y = newCoordinates.y;

        if (x > window.innerWidth - imageWidth) {
            x = window.innerWidth - imageWidth;
        }
        if (y > window.innerHeight - imageWidth) {
            y = window.innerHeight - imageWidth;
        }
        setIsSpaceOnRight(x + lineLength + buttonWidth + (cardHeight * 2) < window.innerWidth - imageWidth);
        setIsSpaceOnTop(y + lineLength + cardHeight + buttonHeight < window.innerHeight - imageWidth);
        setCordinates({ x, y });
        const playAudio = () => {
            setIsLogoAnimated(true);
            audioRef.current.play().catch(error => {
                console.error("Autoplay failed:", error);
            });

            audioRef.current.addEventListener('ended', () => {
                if (isPaused.current) {
                    return;
                }
                audioRef.current.play().catch(error => {
                    console.error("Autoplay failed:", error);
                });
            });

            setTimeout(() => {
                setAnimateAnotherContent(true);
                setTimeout(() => {
                    isPaused.current = true;
                    audioRef.current.pause();
                }, buttonAnimationDuration);
            }, animationDuration);
        };
        if (!isInitialRender.current && prevCoordinates.current && (
            Math.abs(prevCoordinates.current.x - newCoordinates.x) >= threshold ||
            Math.abs(prevCoordinates.current.y - newCoordinates.y) >= threshold
        )) {
            // prevCoordinates.current = newCoordinates;
            // audioRef.current.currentTime = 0
            // isPaused.current = false;
            // setIsLogoAnimated(false);
            // setAnimateAnotherContent(false);
            // setTimeout(playAudio, 2000);
        } else {
            if (isInitialRender.current) {
                isPaused.current = false;
                audioRef.current.currentTime = 0
                prevCoordinates.current = newCoordinates;
                setIsLogoAnimated(false);
                setAnimateAnotherContent(false);
                setTimeout(playAudio, 500);
            }
        }
        isInitialRender.current = false;
    }, [data]);

    const getRotation = () => {
        if (!isSpaceOnTop && isSpaceOnRight) {
            return '135deg'
        }
        if (isSpaceOnTop && !isSpaceOnRight) {
            return '-135deg'
        }
        if (!isSpaceOnTop && !isSpaceOnRight) {
            return '225deg'
        }
        if (isSpaceOnTop) {
            return '135deg'
        }
        if (isSpaceOnRight) {
            return '-90deg'
        }
    }

    const getThirdLineTop = () => {
        if (!isSpaceOnTop && !isSpaceOnRight) {
            return '25%'
        }
        if (isSpaceOnTop && !isSpaceOnRight) {
            return '20%'
        }
        if (!isSpaceOnTop && isSpaceOnRight) {
            return '20%'
        }
        if (isSpaceOnTop) {
            return '20%'
        }
        return 0
    }

    const getSecondLineTop = () => {
        if (!isSpaceOnTop && !isSpaceOnRight) {
            return '80%'
        }
        if (isSpaceOnTop && !isSpaceOnRight) {
            return '80%'
        }
        if (!isSpaceOnTop && isSpaceOnRight) {
            return '82%'
        }
        if (isSpaceOnTop) {
            return '85%'
        }
        return 0
    }

    const getSecondLineLeft = () => {
        if (!isSpaceOnTop && !isSpaceOnRight) {
            return '5%'
        }
        if (isSpaceOnTop && !isSpaceOnRight) {
            return '3%'
        }
        if (!isSpaceOnTop && isSpaceOnRight) {
            return '98%'
        }
        if (isSpaceOnRight) {
            return '98%'
        }
        return '2%'
    }

    const getSecondLineRotation = () => {
        if (!isSpaceOnTop && isSpaceOnRight) {
            return '60deg'
        }
        if (isSpaceOnTop && !isSpaceOnRight) {
            return '-45deg'
        }
        if (!isSpaceOnTop && !isSpaceOnRight) {
            return '-45deg'
        }
        if (isSpaceOnTop) {
            return '60deg'
        }
        if (isSpaceOnRight) {
            return '90deg'
        }
    }

    if (!cordinates) {
        return (
            <></>
        )
    }

    return (
        <Box sx={{ position: 'absolute', left: cordinates.x, bottom: cordinates.y }}>
            <Box sx={{ position: "relative" }}>
                {/* <Typography textAlign={"center"}>X:{parseInt(cordinates.x)} - Y:{parseInt(cordinates.y)} height: {window.innerHeight} width:{window.innerWidth} </Typography> */}
                <Box
                    component="img"
                    src={Placeholder}
                    sx={{
                        opacity: isLogoAnimated ? 1 : 0,
                        transition: `opacity ${animationDuration}ms ease-in-out`,
                    }}
                    onAnimationEnd={() => setIsLogoAnimated(true)}
                    alt="placeholder"
                />
                {/* <Typography textAlign={"center"}>X:{parseInt(cordinates.x)} - Y:{parseInt(cordinates.y)} height: {window.innerHeight} width:{window.innerWidth} </Typography> */}
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    height: '0.686px',
                    width: lineLength + 'px',
                    backgroundColor: '#19CCE7',
                    left: isSpaceOnRight && '100%',
                    right: isSpaceOnRight ? 'auto' : '100%',
                    bottom: '50%',
                    opacity: animateOtherContent ? 1 : 0,
                    transition: `opacity ${buttonAnimationDuration}ms ease-in-out`,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    left: isSpaceOnRight && `calc(100% + ${lineLength}px)`,
                    right: isSpaceOnRight ? 'auto' : `calc(100% + ${lineLength}px)`,
                    bottom: `calc(50% - ${buttonHeight / 2}px)`,
                    display: 'flex',
                    alignItems: "flex-end",
                    flexDirection: isSpaceOnRight ? 'row' : 'row-reverse',
                    opacity: animateOtherContent ? 1 : 0,
                    transition: `opacity ${buttonAnimationDuration}ms ease-in-out`,
                }}>
                <Button
                    sx={{
                        whiteSpace: 'nowrap',
                        backgroundImage: selectedBtn === 'montreal_protocol' ? `url(${BtnBackgroundActive})` : `url(${BtnBackground})`,
                        backgroundRepeat: 'no-repeat',
                        color: 'white',
                        minWidth: buttonWidth + 'px',
                        minHeight: buttonHeight + 'px',
                        fontFamily: "'Red Rose', serif",
                        zIndex: 9
                    }}
                    onClick={() => {
                        if (window.require) {
                            const { ipcRenderer } = window.require("electron");
                            ipcRenderer.send("event-clicked", { "event-clicked": "montreal_protocol" });
                        }
                        setSelectedBtn('montreal_protocol');
                        setSelectedCard(btnCardsMap['montreal_protocol'][0]);
                        setCarouselIndex(0);
                        setVisibleCards(5);
                    }}
                >
                    MONTREAL CONVENTION
                </Button>
                {selectedBtn === 'montreal_protocol' &&
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: "center",
                            height: cardHeight,
                            width: '100%',
                            borderRadius: '16px',
                            background: '#dbdbdb10',
                            marginX: '16px',
                        }}>
                        {btnCardsMap[selectedBtn].map((o, index) => {
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        border: selectedCard === o ? "1.387px solid #fff" : "1.387px solid #1DF6C2",
                                        background: selectedCard === o ? "linear-gradient(96deg, #00BAAF 1.2%, #006CA9 105.58%)" : "linear-gradient(96deg, rgba(25, 249, 235, 0.24) 1.2%, rgba(56, 183, 254, 0.12) 105.58%)",
                                        backdropFilter: "blur(4.61946439743042px)",
                                        width: '120px',
                                        height: '120px',
                                        margin: '0 10px',
                                        display: 'flex',
                                        borderRadius: '6px',
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textTransform: "uppercase",
                                        padding: '8px',
                                        textAlign: 'center',
                                        wordBreak: 'break-word'
                                    }}
                                    onClick={() => {
                                        if (window.require) {
                                            const { ipcRenderer } = window.require("electron");
                                            ipcRenderer.send("event-clicked", { "event-clicked": o });
                                        }
                                        setSelectedCard(o);
                                    }}
                                >
                                    <Typography variant="h4"
                                        sx={{
                                            fontSize: '0.875rem',
                                            fontWeight: '700',
                                            textShadow: '0px 2.335px 2.652px rgba(0, 81, 47, 0.25)',
                                            fontFamily: "'Red Rose', serif"
                                        }}>
                                        {renderItem[o] ? renderItem[o].value : o.replace(/_/g, " ")}
                                    </Typography>
                                </Box>
                            )
                        })}
                    </Box>
                }
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    width: '0.686px',
                    height: lineLength + 'px',
                    backgroundColor: '#19CCE7',
                    bottom: getSecondLineTop(),
                    left: getSecondLineLeft(),
                    transform: `rotate(${getSecondLineRotation()})`,
                    transformOrigin: 'bottom left',
                    opacity: animateOtherContent ? 1 : 0,
                    transition: `opacity ${buttonAnimationDuration}ms ease-in-out`,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: isSpaceOnRight ? `calc(${getSecondLineTop()} + 10px)` : `calc(${getSecondLineTop()} + ${buttonHeight / 2}px)`,
                    right: !isSpaceOnRight && selectedBtn === 'basel_convention' && 'calc(100% + 32px)',
                    left: isSpaceOnRight ? `calc(${getSecondLineLeft()} + ${lineLength - 8}px)` : selectedBtn !== 'basel_convention' && `calc(${getSecondLineLeft()} - ${buttonWidth + 40}px)`,
                    display: 'flex',
                    alignItems: "flex-end",
                    flexDirection: isSpaceOnRight ? 'row' : 'row-reverse',
                    opacity: animateOtherContent ? 1 : 0,
                    transition: `opacity ${buttonAnimationDuration}ms ease-in-out`,
                }}>
                <Button
                    sx={{
                        whiteSpace: 'nowrap',
                        backgroundImage: selectedBtn === 'basel_convention' ? `url(${BtnBackgroundActive})` : `url(${BtnBackground})`,
                        backgroundRepeat: 'no-repeat',
                        color: 'white',
                        minWidth: buttonWidth + 'px',
                        minHeight: buttonHeight + 'px',
                        zIndex: 9,
                        fontFamily: "'Red Rose', serif"
                    }}
                    onClick={() => {
                        if (window.require) {
                            const { ipcRenderer } = window.require("electron");
                            ipcRenderer.send("event-clicked", { "event-clicked": 'basel_convention' });
                        }
                        setSelectedBtn('basel_convention');
                        setSelectedCard(btnCardsMap['basel_convention'][0]);
                        setCarouselIndex(0);
                        setVisibleCards(5);
                    }}
                >
                    BASEL CONVENTION
                </Button>
                {selectedBtn === 'basel_convention' &&
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: "center",
                            height: cardHeight,
                            width: '100%',
                            borderRadius: '16px',
                            background: '#dbdbdb10',
                            marginX: '16px',
                            overflowX: 'hidden',
                        }}>
                        {carouselIndex > 0 &&
                            <Box
                                sx={{
                                    minWidth: '120px',
                                    minHeight: '120px',
                                    margin: '0 10px',
                                    display: 'flex',
                                    borderRadius: '6px',
                                    alignItems: "center",
                                    flexDirection: 'column',
                                    justifyContent: "center",
                                    textTransform: "uppercase",
                                    padding: '8px',
                                    textAlign: 'center',
                                    wordBreak: 'break-word'
                                }}
                                onClick={() => {
                                    const totalCards = btnCardsMap[selectedBtn].length;
                                    const newIndex = (carouselIndex - 1) % totalCards;
                                    if (newIndex === 0) {
                                        setVisibleCards(5)
                                    } else {
                                        setVisibleCards(4);
                                    }
                                    setCarouselIndex(newIndex);
                                }}
                            >
                                <img src={arrowImage} alt="arrow" style={{ transform: 'rotate(180deg)' }} />
                                <Typography variant="h4"
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontWeight: '700',
                                        marginTop: '20px',
                                        textShadow: '0px 2.335px 2.652px rgba(0, 81, 47, 0.25)',
                                        fontFamily: "'Red Rose', serif"
                                    }}>
                                    TAP FOR PREVIOUS TOPICS
                                </Typography>
                            </Box>
                        }
                        {btnCardsMap[selectedBtn].slice(carouselIndex, carouselIndex + visibleCards).map((o, index) => {
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        border: selectedCard === o ? "1.387px solid #fff" : "1.387px solid #1DF6C2",
                                        background: selectedCard === o ? "linear-gradient(96deg, #00BAAF 1.2%, #006CA9 105.58%)" : "linear-gradient(96deg, rgba(25, 249, 235, 0.24) 1.2%, rgba(56, 183, 254, 0.12) 105.58%)",
                                        backdropFilter: "blur(4.61946439743042px)",
                                        minWidth: '120px',
                                        minHeight: '120px',
                                        margin: '0 10px',
                                        display: 'flex',
                                        borderRadius: '6px',
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textTransform: "uppercase",
                                        padding: '8px',
                                        textAlign: 'center',
                                        wordBreak: 'break-word',

                                    }}
                                    onClick={() => {
                                        if (window.require) {
                                            const { ipcRenderer } = window.require("electron");
                                            ipcRenderer.send("event-clicked", { "event-clicked": o });
                                        }
                                        setSelectedCard(o);
                                    }}
                                >
                                    <Typography variant="h4"
                                        sx={{
                                            fontSize: '0.875rem',
                                            fontWeight: '700',
                                            textShadow: '0px 2.335px 2.652px rgba(0, 81, 47, 0.25)',
                                            fontFamily: "'Red Rose', serif"
                                        }}>
                                        {renderItem[o] ? renderItem[o].value : o.replace(/_/g, " ")}
                                    </Typography>
                                </Box>
                            )
                        })}
                        {carouselIndex < btnCardsMap[selectedBtn].length - 5 &&
                            <Box
                                sx={{
                                    minWidth: '120px',
                                    minHeight: '120px',
                                    margin: '0 10px',
                                    display: 'flex',
                                    borderRadius: '6px',
                                    alignItems: "center",
                                    flexDirection: 'column',
                                    justifyContent: "center",
                                    textTransform: "uppercase",
                                    padding: '8px',
                                    textAlign: 'center',
                                    wordBreak: 'break-word'
                                }}
                                onClick={() => {
                                    const totalCards = btnCardsMap[selectedBtn].length;
                                    const newIndex = (carouselIndex + 1) % totalCards;
                                    if (newIndex === btnCardsMap[selectedBtn].length - 5) {
                                        setVisibleCards(5)
                                    } else {
                                        setVisibleCards(4)
                                    }
                                    if (carouselIndex === 0) {
                                        setCarouselIndex(2)
                                    } else {
                                        setCarouselIndex(newIndex);
                                    }
                                }}
                            >
                                <img src={arrowImage} alt="arrow" />
                                <Typography variant="h4"
                                    sx={{
                                        fontSize: '0.875rem',
                                        marginTop: '20px',
                                        fontWeight: '700',
                                        textShadow: '0px 2.335px 2.652px rgba(0, 81, 47, 0.25)',
                                        fontFamily: "'Red Rose', serif"
                                    }}>
                                    TAP FOR MORE TOPICS
                                </Typography>
                            </Box>
                        }
                    </Box>
                }
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    width: '0.686px',
                    height: lineLength + 'px',
                    backgroundColor: '#19CCE7',
                    bottom: getThirdLineTop(),
                    left: getSecondLineLeft(),
                    transform: `rotate(${getRotation()})`,
                    transformOrigin: 'bottom left',
                    opacity: animateOtherContent ? 1 : 0,
                    transition: `opacity ${buttonAnimationDuration}ms ease-in-out`,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: `calc(${getThirdLineTop()} - ${lineLength + 5}px)`,
                    right: !isSpaceOnRight && selectedBtn === 'cites' && 'calc(100% + 40px)',
                    left: isSpaceOnRight ? `calc(${getSecondLineLeft()} + ${lineLength - 18}px)` : selectedBtn !== 'cites' && `calc(${getSecondLineLeft()} - ${buttonWidth + 40}px)`,
                    display: 'flex',
                    alignItems: "flex-end",
                    flexDirection: isSpaceOnRight ? 'row' : 'row-reverse',
                    opacity: animateOtherContent ? 1 : 0,
                    transition: `opacity ${buttonAnimationDuration}ms ease-in-out`,
                    fontFamily: "'Red Rose', serif",
                }}>
                <Button
                    sx={{
                        whiteSpace: 'nowrap',
                        backgroundImage: selectedBtn === 'cites' ? `url(${BtnBackgroundActive})` : `url(${BtnBackground})`,
                        backgroundRepeat: 'no-repeat',
                        color: 'white',
                        minWidth: buttonWidth + 'px',
                        zIndex: 9,
                        minHeight: buttonHeight + 'px',
                        fontFamily: "'Red Rose', serif"
                    }}
                    onClick={() => {
                        if (window.require) {
                            const { ipcRenderer } = window.require("electron");
                            ipcRenderer.send("event-clicked", { "event-clicked": 'cites' });
                        }
                        setSelectedBtn('cites');
                        setSelectedCard(btnCardsMap['cites'][0]);
                        setCarouselIndex(0);
                        setVisibleCards(5);
                    }}
                >
                    CITES CONVENTION
                </Button>
                {selectedBtn === 'cites' &&
                    <Box sx={{
                        display: 'flex',
                        height: cardHeight - 20,
                        flexDirection: 'column',
                        width: '100%',
                        marginX: '40px'
                    }}>
                        <Box
                            sx={{
                                display: 'flex',
                                width: 'fit-content',
                                borderRadius: '7px',
                                padding: '6px',
                                marginX: '20px',
                                background: '#dbdbdb10',
                                position: 'absolute',
                                bottom: 'calc(100%)',
                            }}>
                            <img
                                onClick={() => setAppendix(1)}
                                src={appendix === 1 ? btn1Active : btn1Inactive}
                                alt="btn1"
                                style={{ zIndex: appendix === 1 ? 3 : 1 }}
                            />
                            <img
                                onClick={() => setAppendix(2)}
                                src={appendix === 2 ? btn2Active : btn2Inactive}
                                alt="btn2"
                                style={{ marginLeft: '-110px', zIndex: appendix === 2 ? 3 : 2, transform: appendix === 3 ? 'rotate(180deg)' : 'rotate(0deg)' }}
                            />
                            <img
                                onClick={() => setAppendix(3)}
                                src={appendix === 3 ? btn3Active : btn3Inactive}
                                alt="btn3"
                                style={{ marginLeft: '-110px', zIndex: appendix === 3 ? 3 : 1 }}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: "center",
                                height: cardHeight - 20,
                                width: '100%',
                                borderRadius: '16px',
                                background: '#000',
                            }}>

                            {btnCardsMap[selectedBtn][appendix]?.map((o, index) => {
                                return (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: '100px',
                                            height: '100px',
                                            margin: '0 10px',
                                            display: 'flex',
                                            borderRadius: '6px',
                                            alignItems: "center",
                                            flexDirection: 'column',
                                            justifyContent: "center",
                                            textTransform: "uppercase",
                                            padding: '8px',
                                            textAlign: 'center',
                                            wordBreak: 'break-word'
                                        }}
                                        onClick={() => {
                                            if (window.require) {
                                                const { ipcRenderer } = window.require("electron");
                                                ipcRenderer.send("event-clicked", { "event-clicked": o });
                                            }
                                            setSelectedCard(o);
                                        }}
                                    >
                                        <img src={renderItem[o].image} alt={o} />
                                        <Typography variant="h4"
                                            sx={{
                                                fontSize: '0.875rem',
                                                fontWeight: '700',
                                                textShadow: '0px 2.335px 2.652px rgba(0, 81, 47, 0.25)',
                                                fontFamily: "'Red Rose', serif"
                                            }}>
                                            {renderItem[o].value}
                                        </Typography>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                }
            </Box>
        </Box >
    );
};

export default TouchTable;
