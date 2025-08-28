import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Usás esto en lugar de useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch

// Usás esto en lugar de useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
