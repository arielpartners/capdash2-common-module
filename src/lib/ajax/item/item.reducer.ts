import { ItemActions } from './item.actions';
import { IPayloadAction } from '../payload-action.types';
import { IItem, ItemType, ITEM_TYPES } from './item.types';
import { LOGGED_OUT } from '../../core.type';

const INITIAL_STATE: IItem = {
  error: null,
  item: {},
  itemType: null,
  loading: false,
};

// A higher-order reducer: accepts an item type and returns a reducer
// that only responds to actions for that particular item type.
export function createItemReducer(itemType: ItemType) {
  return function itemReducer(state: IItem = INITIAL_STATE,
                              action: IPayloadAction<IItem, any>): IItem {

    if ((!action.meta || action.meta.itemType !== itemType) && !(action.type === LOGGED_OUT)) {
      return state;
    }

    switch (action.type) {
      case ItemActions.LOAD_STARTED:
        return {
          error: null,
          item: null,
          itemType: null,
          loading: true,
        };
      case ItemActions.LOAD_SUCCEEDED:
        return {
          error: null,
          item: action.payload,
          itemType: action.meta.itemType,
          loading: false,
        };
      case ItemActions.LOAD_FAILED:
        return {
          error: action.error,
          item: null,
          itemType: null,
          loading: false,
        };
      case LOGGED_OUT:
        return {
          error: null,
          item: null,
          itemType: null,
          loading: false,
        };
    }

    return state;
  };
}
