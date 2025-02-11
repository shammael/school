import { Module } from 'src/commons/enums/module.enum';
import { BindingActions } from 'src/configs/binding_actions.config';

export type RoleBindingAction = {
  [k in Module]: Record<BindingActions, boolean>;
};
