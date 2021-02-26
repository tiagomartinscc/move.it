import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownProviderProps {
    children: ReactNode
}

interface CountdownContextData { 
    minutes: number
    seconds: number
    hasFinished: boolean
    isActive: boolean
    startContdown: () => void
    resetContdown: () => void
}

export const CountdownContext = createContext({} as CountdownContextData)
let countdownTimeout: NodeJS.Timeout;
const tempoInicial = 25 * 60;

export function CountdownProvider({ children }: CountdownProviderProps) {
    
    const { startNewChallenge } = useContext(ChallengesContext)

    const [time, setTime] = useState(tempoInicial);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startContdown() {
        setIsActive(true);
    }

    function resetContdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(tempoInicial);
        setHasFinished(false);
    }    

    useEffect(() => { 
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge();
        }
    }, [isActive, time])

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startContdown,
            resetContdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}