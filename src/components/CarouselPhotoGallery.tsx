import React from 'react';
import { CustomTooltip } from './CustomTooltip';
import './CarouselPhotoGallery.css';

export type SvgContainerProps = {
    height?: string | number;
    width?: string | number;
    className?: string;
    color?: string;
    style?: React.CSSProperties;
}

const FullScreenIcon = ({height = '60px', width = '60px', className='', color = "#FFF", style={}} : SvgContainerProps) => {
    return (
        <div className={className} style={{height, width, display: 'inline-block', maxHeight: height, ...style }}>
            <svg fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.69233 18.2781L9.70711 20.2929C9.9931 20.5789 10.0787 21.009 9.92388 21.3827C9.7691 21.7564 9.40446 22 9 22H3C2.44772 22 2 21.5523 2 21V15C2 14.5955 2.24364 14.2309 2.61732 14.0761C2.99099 13.9213 3.42111 14.0069 3.70711 14.2929L5.571 16.1568L9.25289 12.4749C9.64342 12.0844 10.2766 12.0844 10.6671 12.4749L11.3742 13.182C11.7647 13.5725 11.7647 14.2057 11.3742 14.5962L7.69233 18.2781Z" />
                <path d="M16.3077 5.72187L14.2929 3.70711C14.0069 3.42111 13.9213 2.99099 14.0761 2.61732C14.2309 2.24364 14.5955 2 15 2H21C21.5523 2 22 2.44772 22 3V9C22 9.40446 21.7564 9.7691 21.3827 9.92388C21.009 10.0787 20.5789 9.9931 20.2929 9.70711L18.429 7.84319L14.7471 11.5251C14.3566 11.9156 13.7234 11.9156 13.3329 11.5251L12.6258 10.818C12.2352 10.4275 12.2352 9.7943 12.6258 9.40378L16.3077 5.72187Z" />
            </svg>
        </div>
    );
};

const FullScreenExitIcon = ({height = '60px', width = '60px', className='', color = "#FFF", style={}} : SvgContainerProps) => {
    return (
        <div className={className} style={{height, width, display: 'inline-block', maxHeight: height, ...style }}>
            <svg fill={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.04 10.1109L18.0252 8.09612L21.7071 4.41421C22.0976 4.02369 22.0976 3.39052 21.7071 3L21 2.29289C20.6095 1.90237 19.9763 1.90237 19.5858 2.29289L15.9039 5.9748L14.04 4.11089C13.754 3.82489 13.3239 3.73933 12.9502 3.89411C12.5765 4.04889 12.3329 4.41353 12.3329 4.81799V10.818C12.3329 11.3703 12.7806 11.818 13.3329 11.818H19.3329C19.7373 11.818 20.102 11.5744 20.2568 11.2007C20.4115 10.827 20.326 10.3969 20.04 10.1109Z" />
                <path d="M3.96 13.8891L5.97478 15.9039L2.29289 19.5858C1.90237 19.9763 1.90237 20.6095 2.29289 21L3 21.7071C3.39052 22.0976 4.02369 22.0976 4.41421 21.7071L8.0961 18.0252L9.96 19.8891C10.246 20.1751 10.6761 20.2607 11.0498 20.1059C11.4235 19.9511 11.6671 19.5865 11.6671 19.182V13.182C11.6671 12.6297 11.2194 12.182 10.6671 12.182H4.66711C4.26265 12.182 3.89801 12.4256 3.74323 12.7993C3.58845 13.173 3.674 13.6031 3.96 13.8891Z" />
            </svg>
        </div>
    );
};

type CarouselPhotoGalleryProps = {
    children: React.ReactNode[];
    slideDelay?: number;
    startIndex?: number;
    width?: string;
    displayThumbs?: boolean;
    thumbs?: React.ReactNode[];
    nextButton?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    prevButton?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    fullScreenButtonIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    fullScreenExitButtonIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

const CarouselPhotoGallery = ({
    children,
    slideDelay = 5000,
    startIndex = 0,
    width = "900px",
    displayThumbs = false,
    thumbs = [],
    nextButton = <span>⟩</span>,
    prevButton = <span>⟨</span>,
    fullScreenButtonIcon = <FullScreenIcon width='20px' height='16px' color='var(--accent-color)' />,
    fullScreenExitButtonIcon = <FullScreenExitIcon width='20px' height='16px' color='var(--accent-color)' />
}: CarouselPhotoGalleryProps) => {
    const [activeIndex, setActiveIndex] = React.useState(startIndex | 0);
    const [nextIndex, setNextIndex] = React.useState(((startIndex | 0) + 1) % children.length);
    const [prevIndex, setPrevIndex] = React.useState(((startIndex | 0) - 1 + children.length) % children.length);
    const [maximized, setMaximized] = React.useState<boolean>(false);
    const [fullscreenMode, setFullscreenMode] = React.useState<boolean>(false);
    const CarouselPhotoGalleryWindowContainer = React.useRef<HTMLDivElement | null>(null);
    const intervalHandler = React.useRef<NodeJS.Timeout | null>(null);
    const pauseSlideShow = React.useRef<boolean>(false);

    React.useEffect(() => {
        const handleFullscreenChange = () => {
            if (document.fullscreenElement === null) {
                setFullscreenMode(false);
            }
        };

        intervalHandler.current = setInterval(() => { slideNextAuto(); }, slideDelay);
        window.addEventListener('keydown', handleKeyDown);
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            if (intervalHandler.current) {
                clearInterval(intervalHandler.current);
            }
        }
    }, []);

    React.useEffect(() => {
        if (fullscreenMode) {
            CarouselPhotoGalleryWindowContainer.current?.requestFullscreen();
        } else if (document.fullscreenElement !== null && document.fullscreenElement === CarouselPhotoGalleryWindowContainer.current) {
            document.exitFullscreen();
        }
    }, [fullscreenMode]);

    const stopSliderTimer = () => {
        if (intervalHandler.current) {
            clearInterval(intervalHandler.current);
        }
    };

    const startSliderTimer = () => {
        intervalHandler.current = setInterval(() => { slideNextAuto(); }, slideDelay);
    };

    const resetSliderTimer = () => {
        stopSliderTimer();
        startSliderTimer();
    };

    const slideNextAuto = () => {
        if (!pauseSlideShow.current) {
            slideNext();
        }
    };

    const slideNext = (reset = false) => {
        if (reset) {
            resetSliderTimer();
        }
        setActiveIndex((val) => {
            setPrevIndex((val) % children.length);
            setNextIndex((val + 2) % children.length);
            return (val + 1) % children.length;
        });
    };

    const slidePrev = (reset = false) => {
        if (reset) {
            resetSliderTimer();
        }
        setActiveIndex((val) => {
            setPrevIndex((val - 2 + children.length) % children.length);
            setNextIndex((val + 1) % children.length);
            return (val - 1 + children.length) % children.length;
        });
    };

    const handleKeyDown = (event: { key: string; }) => {
        if (event.key === 'ArrowLeft') {
            slidePrev(true);
        } else if (event.key === 'ArrowRight') {
            slideNext(true);
        } else if (event.key === 'Escape') {
            setMaximized(false);
        }
    };

    const toggleMaximized = () => {
        setMaximized((maximized) => {
            if (!maximized) {
                pauseSlideShow.current = false;
            }
            return !maximized;
        });
    }


    return (
        <div className={`rcpg-content-wrapper ${maximized ? ' carouselMaximizedCover' : ''}`} style={{ width: !maximized && width ? `${width}px` : '100%' }} ref={CarouselPhotoGalleryWindowContainer}>
            <span className={`closeButton ${maximized ? '' : 'hidden'}`} onClick={() => { if (fullscreenMode) setFullscreenMode(false); else setMaximized(false); }}>X</span>
            {maximized &&
                <button className='fullscreenModeButton' onClick={() => setFullscreenMode((fullscreenMode) => !fullscreenMode)}
                    title={fullscreenMode ? 'Exit Fullscreen' : 'Enter Fullscreen'}>
                    {!fullscreenMode && fullScreenButtonIcon}
                    {fullscreenMode && fullScreenExitButtonIcon}
                </button>
            }
            <div className={`carouselContainerMaster ${maximized ? ' maximized' : ''} ${displayThumbs ? 'displayThumbs' : ''} ${fullscreenMode ? 'fullscreen' : ''}`} >
                <div
                    className={`carouselContainer ${maximized ? 'maximized' : ''} ${fullscreenMode ? 'fullscreen' : ''}`}
                    onMouseEnter={() => { if (!maximized) pauseSlideShow.current = true; }}
                    onMouseLeave={() => { if (!maximized) pauseSlideShow.current = false; }}
                    style={{ '--slider-active-index': activeIndex } as React.CSSProperties}
                >
                    {children.map((item, index) => {
                        return (
                            <div className={`carouselItem`} key={index} onClick={toggleMaximized}>
                                {item}
                            </div>
                        );
                    })}

                    <div className={`carouselLinksContainer ${displayThumbs ? 'displayThumbs' : ''}`}>
                        {children.map((item, index) => {
                            return (
                                <button
                                    key={index}
                                    className={`carouselBottomLinks ${activeIndex === index ? 'active' : ''} ${displayThumbs ? 'displayThumbs' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        resetSliderTimer();
                                        setPrevIndex((index - 1 + children.length) % children.length);
                                        setNextIndex((index + 1) % children.length);
                                        setActiveIndex(index);
                                    }}
                                >
                                    {displayThumbs && thumbs.length > 0 && thumbs[index] && (
                                        <CustomTooltip title={<>{thumbs[index]}</>}
                                        >
                                            <span>{thumbs[index]}</span>
                                        </CustomTooltip>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <button className='carouselButtonPrev'
                        onClick={(e) => { e.preventDefault(); slidePrev(true); }}
                    >
                        {displayThumbs && thumbs.length > 0 && thumbs[prevIndex] && (
                            <CustomTooltip title={<>{thumbs[prevIndex]}</>}
                            >
                                {prevButton ? prevButton : <span>⟨</span>}
                            </CustomTooltip>
                        )}
                        {!(displayThumbs) && <>{prevButton ? prevButton : <span>⟨</span>}</>}
                    </button>

                    <button className='carouselButtonNext'
                        onClick={(e) => { e.preventDefault(); slideNext(true); }}
                    >
                        {displayThumbs && thumbs.length > 0 && thumbs[nextIndex] && (
                            <CustomTooltip title={<>{thumbs[nextIndex]}</>}
                            >
                                {nextButton ? nextButton : <span>⟩</span>}
                            </CustomTooltip>
                        )}
                        {!(displayThumbs && thumbs.length > 0 && thumbs[nextIndex]) && <>{nextButton ? nextButton : <span>⟩</span>}</>}
                    </button>
                </div>
            </div>
        </div>
    );
}


export default CarouselPhotoGallery;
