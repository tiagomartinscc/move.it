import { useContext } from 'react';
import styles from '../styles/components/ExperienceBar.module.css';
import { ChallengesContext } from '../contexts/ChallengesContext';

export function ExperienceBar() {
    const {
        currentExperience,
        percentToNextLevel,
        experienceToNextLevel
    } = useContext(ChallengesContext);
    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }}></div>

                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%`}}>
                    { currentExperience } xp
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    );
}