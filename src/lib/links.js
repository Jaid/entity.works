import killers from "lib/killers"
import patches from "lib/patches"
import survivors from "lib/survivors"

export const patchesLink = `/patch/${patches[0].linkId}`
export const survivorsLink = `/survivor/${survivors[0].linkId}`
export const killersLink = `/killer/${killers[0].linkId}`
export const survivorPerksLink = "/perks/survivor"
export const killerPerksLink = "/perks/killer"
export const charactersLink = "/characters"