import { useRef } from "react";

// Custom hook
export const useEventSystem = () => {
    // Keeping events state in useRef to not trigger unnecessary re-renders and re-subscriptions
    const events = useRef({});

    const eventTypes = {
        'type1': 'type1',
        'type2': 'type2'
    };

    const subscribe = (event, callback) => {
        if (!events.current[event]) {
            events.current[event] = [];
        }
        events.current[event].push(callback);
    };

    const unsubscribe = (event, callback) => {
        if (events.current[event]) {
            events.current[event] = events.current[event].filter(cb => cb !== callback);
        }
    }

    const postEvent = (event, data) => {
        if (events.current[event]) {
            events.current[event].forEach(callback => callback(data));
        }
    };

    return { subscribe, postEvent, unsubscribe, eventTypes };
}