import { atom } from "jotai";

// 카테고리 레이어 on/off
export const categoryLayerAtom = atom(false);

// 카테고리 활성 인덱스
export const activeCategoryAtom = atom(0);

// 필터 레이어 on/off
export const filterLayerAtom = atom(false);
