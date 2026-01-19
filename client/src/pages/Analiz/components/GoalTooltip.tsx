import React from 'react';
import styles from './GoalTooltip.module.css';

interface GoalTooltipProps {
  goal: 'weight-loss' | 'muscle-gain' | 'recomposition';
  show: boolean;
}

const goalDescriptions = {
  'weight-loss': 'Снижение веса с сохранением мышечной массы через дефицит калорий и тренировки',
  'muscle-gain': 'Увеличение мышечной массы через профицит калорий и силовые тренировки',
  'recomposition': 'Одновременное снижение жира и набор мышц через сбалансированное питание'
};

export default function GoalTooltip({ goal, show }: GoalTooltipProps): React.JSX.Element | null {
  if (!show) return null;

  return (
    <div className={`${styles.tooltip} animate-fadeIn`}>
      <div className={styles.tooltipContent}>
        {goalDescriptions[goal]}
      </div>
    </div>
  );
}
