import styles from './App.module.css';
import { Adventurer } from './components/Adventurer/Adventurer';
import { PotionFactory } from './components/PotionFactory/PotionFactory';
import { PotionShop } from './components/PotionShop/PotionShop';
import { GeneralContext } from './contexts/context';
import { useEventSystem } from './hooks/useEventSystem';

function App() {
  // Setup event emitter
  const eventSystem = useEventSystem();

  //Context obj
  const generalContextObj = {
    eventSystem,
  }

  return (
    <div className={styles.app}>
      <GeneralContext.Provider value={generalContextObj}>
        <h1 className={styles.title}>Observer Pattern Example</h1>
        <div className={styles.main}>
          <PotionFactory title={'Potion Factory'} gridArea={'factory'} />
          <PotionShop title={'Potion Shop'} gridArea={'shop'}  />
          <Adventurer title={'Kael Eagleeye'} />
          <Adventurer title={'Mara Jade'} />
          <Adventurer title={'George Washington'} />
        </div>
      </GeneralContext.Provider>
    </div>
  );
}

export default App;
