import { NotifierOptions } from 'angular-notifier';

export const notifierConfig: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 15,
    },
  },
  behaviour: { autoHide: 3000, showDismissButton: false, onClick: 'hide' },
};
