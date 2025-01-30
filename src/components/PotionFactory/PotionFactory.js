import { useContext, useEffect, useState } from 'react';
import styles from './PotionFactory.module.css';
import { GeneralContext } from '../../contexts/context';

export const PotionFactory = ({
    gridArea
}) => {
    const [isRefilling, setIsRefilling] = useState(false);
    const { eventSystem } = useContext(GeneralContext);
    const [counter, setCounter] = useState(10);

    useEffect(() => {
        //Subscribe out of Stock event on component mount
        eventSystem.subscribe("outOfStock", handleRestock);
        return () => {
            eventSystem.unsubscribe("outOfStock", handleRestock);
        };
    }, []);


    const handleRestock = () => {
        setIsRefilling(true);
        // Simulate potion travel time from factory to shop
        const intervalId = setInterval(() => { setCounter(counter => counter - 1) }, 1000);
        setTimeout(() => {
            clearInterval(intervalId);
            setIsRefilling(false);
            setCounter(10);
            eventSystem.postEvent("restocked", 10); 
        }, 10000)
    };

    return (
        <section
            style={gridArea && {
                "gridArea": gridArea
            }}>
            <p className={styles.title}>Potion Factory</p>
            <p className={styles.amount}>Potions amount: Infinite</p>
            <div className={styles.textbox}>
                <p>Status: {isRefilling ? 
                    <span>Restocking potions in {isRefilling ? counter : 'Idle'}s</span> : <span>Idle</span>}</p>
            </div>
        </section>
    )
}