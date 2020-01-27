import Killer from "lib/Killer"
import patches from "lib/patches"
import Survivor from "lib/Survivor"

export const patchesLink = `/patch/${patches[0].linkId}`
export const survivorsLink = `/survivor/${Survivor.allVisible[0].linkId}`
export const killersLink = `/killer/${Killer.allVisible[0].linkId}`
export const survivorPerksLink = "/perks/survivor"
export const killerPerksLink = "/perks/killer"
export const charactersLink = "/characters"