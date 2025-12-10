/* eslint-disable */
// @ts-ignore
import * as API from './types';

export function displayPaymentMethodEnum(field: API.PaymentMethodEnum) {
  return { ALIPAY: 'ALIPAY', WECHAT: 'WECHAT', BALANCE: 'BALANCE' }[field];
}

export function displayPlanEnum(field: API.PlanEnum) {
  return {
    '1m': '1m',
    '3m': '3m',
    '6m': '6m',
    '12m': '12m',
    lifetime: 'lifetime',
  }[field];
}

export function displayReactionTypeEnum(field: API.ReactionTypeEnum) {
  return {
    like: 'like',
    love: 'love',
    haha: 'haha',
    wow: 'wow',
    sad: 'sad',
    angry: 'angry',
    dislike: 'dislike',
  }[field];
}

export function displayStatusEnum(field: API.StatusEnum) {
  return { DRAFT: 'DRAFT', PUBLISHED: 'PUBLISHED' }[field];
}

export function displayStatusEnum2(field: API.StatusEnum2) {
  return { DRAFT: 'DRAFT', PUBLISHED: 'PUBLISHED' }[field];
}

export function displayTypeEnum(field: API.TypeEnum) {
  return { image: 'image', mixed: 'mixed' }[field];
}

export function displayTypeEnum2(field: API.TypeEnum2) {
  return { image: 'image', mixed: 'mixed' }[field];
}

export function displayTypeEnum3(field: API.TypeEnum3) {
  return {
    article: 'article',
    membership: 'membership',
    product: 'product',
    service: 'service',
  }[field];
}

export function displayTypeEnum4(field: API.TypeEnum4) {
  return { GENERAL: 'GENERAL', VIP: 'VIP' }[field];
}

export function displayTypeEnum5(field: API.TypeEnum5) {
  return { verification: 'verification', reset_password: 'reset_password' }[
    field
  ];
}
