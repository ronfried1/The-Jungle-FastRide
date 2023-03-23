import { useCallback, useEffect } from "react";

//handle the scrolling behavior of a button element based on the position of another element on the page
const useBtnScroller = (appContainerRef, cardAreaRef, buttonRef, clearOnCondition) => {

    const handleScroll = useCallback(() => {
        if (window.innerWidth >= 600) return;

        const { top } = cardAreaRef.current.getBoundingClientRect();
        const bottomOfViewport = window.innerHeight - 150;

        const buttonBottom = parseInt(
            getComputedStyle(buttonRef.current).bottom,
            10
        );
        const newBottom =
            top <= bottomOfViewport
                ? Math.min(0, buttonBottom + 10)
                : Math.max(-80, buttonBottom - 30);

        if (newBottom !== buttonBottom) {
            buttonRef.current.style.bottom = newBottom + "px";
        }
    }, [cardAreaRef, buttonRef]);

    useEffect(() => {
        if (window.innerWidth >= 600) return;
        if (clearOnCondition) {
            appContainerRef.current.removeEventListener("scroll", handleScroll);
            return
        }
        appContainerRef.current.addEventListener("scroll", handleScroll);
        return () => {
            appContainerRef.current.removeEventListener("scroll", handleScroll);
        };
    }, [appContainerRef, handleScroll]);
};

export default useBtnScroller;
