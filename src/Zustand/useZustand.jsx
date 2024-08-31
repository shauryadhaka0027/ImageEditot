
import { create } from 'zustand'

export const useZustand = create((set) => ({
    valid:false,
    setValid: (valid) => set({ valid }),
     
    imageData:{},
    setImageData:(imageData)=>set({imageData}),


}));
