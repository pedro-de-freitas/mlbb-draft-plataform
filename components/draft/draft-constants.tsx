import { DraftStep } from "@/types/draft"
import { HeroRole } from "@/types/hero"

export const draftSteps: DraftStep[] = [
  { id: 1, side: "blue", type: "ban", label: "Blue Ban 1" },
  { id: 2, side: "red", type: "ban", label: "Red Ban 1" },
  { id: 3, side: "blue", type: "ban", label: "Blue Ban 2" },
  { id: 4, side: "red", type: "ban", label: "Red Ban 2" },
  { id: 5, side: "blue", type: "ban", label: "Blue Ban 3" },
  { id: 6, side: "red", type: "ban", label: "Red Ban 3" },

  { id: 7, side: "blue", type: "pick", label: "Blue Pick 1" },
  { id: 8, side: "red", type: "pick", label: "Red Pick 1" },
  { id: 9, side: "red", type: "pick", label: "Red Pick 2" },
  { id: 10, side: "blue", type: "pick", label: "Blue Pick 2" },
  { id: 11, side: "blue", type: "pick", label: "Blue Pick 3" },
  { id: 12, side: "red", type: "pick", label: "Red Pick 3" },

  { id: 13, side: "red", type: "ban", label: "Red Ban 4" },
  { id: 14, side: "blue", type: "ban", label: "Blue Ban 4" },
  { id: 15, side: "red", type: "ban", label: "Red Ban 5" },
  { id: 16, side: "blue", type: "ban", label: "Blue Ban 5" },

  { id: 17, side: "red", type: "pick", label: "Red Pick 4" },
  { id: 18, side: "blue", type: "pick", label: "Blue Pick 4" },
  { id: 19, side: "blue", type: "pick", label: "Blue Pick 5" },
  { id: 20, side: "red", type: "pick", label: "Red Pick 5" },
]

export const roleOrder: HeroRole[] = ["EXP", "Gold", "Mid", "Jungle", "Roam"]