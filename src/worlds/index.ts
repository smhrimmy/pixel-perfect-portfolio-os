import React from 'react';

export const WORLDS = {
  heightfield: React.lazy(() => import('./heightfield')),
  hypercube: React.lazy(() => import('./hypercube')),
  workshop: React.lazy(() => import('./workshop')),
  observatory: React.lazy(() => import('./observatory')),
  'toy-chest': React.lazy(() => import('./toy-chest')),
  reservoir: React.lazy(() => import('./reservoir')),
  ledger: React.lazy(() => import('./ledger')),
  switchboard: React.lazy(() => import('./switchboard')),
  'print-shop': React.lazy(() => import('./print-shop')),
  'reading-room': React.lazy(() => import('./reading-room')),
  greenhouse: React.lazy(() => import('./greenhouse')),
  arcade: React.lazy(() => import('./arcade')),
  potter: React.lazy(() => import('./potter')),
  'trade-route': React.lazy(() => import('./trade-route')),
  herbarium: React.lazy(() => import('./herbarium')),
  'drafting-table': React.lazy(() => import('./drafting-table')),
  'gem-cutter': React.lazy(() => import('./gem-cutter')),
  'trophy-room': React.lazy(() => import('./trophy-room')),
  garage: React.lazy(() => import('./garage')),
  'architect-study': React.lazy(() => import('./architect-study')),
  'projection-room': React.lazy(() => import('./projection-room')),
  premium: React.lazy(() => import('./premium')),
};

export type WorldKey = keyof typeof WORLDS;
