import { useContext, useEffect, useState } from 'react';
import styles from './Adventurer.module.css';
import { GeneralContext } from '../../contexts/context';
import { Button } from '../Button/Button';
export const Adventurer = ({ title,
    gridArea
}) => {
    const [potions, setPotions] = useState(10);
    const [isShopAvailable, setIsShopAvailable] = useState(true);
    const { eventSystem } = useContext(GeneralContext)

    useEffect(() => {
        eventSystem.subscribe("outOfStock", makeShopUnavailable);
        eventSystem.subscribe("restocked", makeShopAvailable);

        return () => {
            eventSystem.unsubscribe("outOfStock", makeShopUnavailable);
            eventSystem.unsubscribe("restocked", makeShopAvailable);
        };
    }, [])
    const buyPotion = () => {
        setPotions(prevPotions => prevPotions + 1);
        eventSystem.postEvent("purchased");
    };
    const drinkPotion = () => {
        setPotions(prevPotions => prevPotions - 1);
    }

    const makeShopUnavailable = () => {
        setIsShopAvailable(false);
    };

    const makeShopAvailable = () => {
        setIsShopAvailable(true);
    }
    return (
        <section
            style={gridArea && {
                "gridArea": gridArea
            }}>
            <p className={styles.title}>{title}</p>
            <p className={styles.amount}>Potions amount: {potions >= 10 ? `${potions} (full)` : potions}</p>
            <div className={styles.textbox}>
                <Button label={'Buy potion'} fn={buyPotion} disabled={potions === 10 || isShopAvailable === false} btnStyles={{ fontSize: "12px", width: "100%" }} />
                <Button label={'Drink potion'} fn={drinkPotion} disabled={potions === 0} btnStyles={{ fontSize: "12px", width: "100%" }} />
            </div>
        </section>
    )
}