'use client';
import { motion, stagger, useAnimate } from 'framer-motion';
import { useEffect } from 'react';

import cn from '@/lib/cn';

export const TextGenerateEffect = ({
  words,
  className,
  wordClassName,
}: {
  words: string;
  className?: string;
  wordClassName?: string;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(' ');

  useEffect(() => {
    animate(
      'span',
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="text-secondary opacity-0 dark:text-white"
            >
              {word}
              {' '}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn('font-bold', className)}>
      <div className="mt-4">
        <div
          className={cn(
            'text-2xl leading-snug tracking-wide text-black dark:text-white',
            wordClassName,
          )}
        >
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
