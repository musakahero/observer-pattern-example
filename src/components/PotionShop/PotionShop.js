import { useContext, useEffect, useState } from 'react';
import styles from './PotionShop.module.css';
import { GeneralContext } from '../../contexts/context';
import { Button } from '../Button/Button';
export const PotionShop = ({
    gridArea
}) => {
    const [potions, setPotions] = useState(10);
    const [eventLog, setEventLog] = useState([]);
    const { eventSystem } = useContext(GeneralContext)


    //Subscribe restock event on component mount
    useEffect(() => {
        const handleRestock = (amount) => {
            setPotions(amount);
            setEventLog(current => [...current, 'The shop has been restocked.'])
        };
        eventSystem.subscribe("restocked", handleRestock);
        eventSystem.subscribe("purchased", sellPotion);

        return () => {
            eventSystem.unsubscribe("restocked", handleRestock);
            eventSystem.unsubscribe("purchased", sellPotion);
        };
    }, []);

    const sellPotion = () => {
        if (potions > 0) {
            setPotions(prevPotions => {
                const newPotions = prevPotions - 1;
                if (newPotions === 0) {
                    eventSystem.postEvent("outOfStock");
                    setEventLog(current => [...current, 'Potion sold.', 'The shop is out of stock.']);
                } else {
                    setEventLog(current => [...current, 'Potion sold.']);
                }
                return newPotions;
            });
        };
    };

    return (
        <section
            style={gridArea && {
                "gridArea": gridArea
            }}>
            <p className={styles.title}>Potion Shop</p>
            <p className={styles.amount}>Potions amount: {potions > 0 ? potions : "Out of stock, please wait."}</p>
            <div className={styles.textbox}>
                <Button label={'Sell potion'} fn={sellPotion} disabled={potions === 0} btnStyles={{ fontSize: "12px", width: "100%" }} />
                <div className={styles.eventLog}>
                    {eventLog && eventLog.length > 0 ? eventLog.join('\n') : 'No records.'}
                </div>
            </div>
        </section>
    )
}