export type CuratedMatchup = {
  counters: string[]
  counteredBy: string[]
  synergies: string[]
  notes?: string[]
}

const empty = (): CuratedMatchup => ({
  counters: [],
  counteredBy: [],
  synergies: [],
  notes: [],
})

export const curatedMatchups: Record<string, CuratedMatchup> = {
  Aamon: {
    counters: ["Harley", "Kadita", "Gusion", "Saber", "Selena"],
    counteredBy: ["Kaja", "Franco", "Eudora", "Khufra", "Aurora"],
    synergies: ["Khufra", "Atlas", "Tigreal", "Mathilda", "Novaria"],
    notes: [
      "Aamon perde valor contra CC confiável e defesa mágica.",
      "Brilha quando o time cria pickoff e visão de mapa.",
    ],
  },

  Akai: {
    counters: ["Atlas", "Tigreal", "Khufra", "Ling", "Fanny"],
    counteredBy: ["Valir", "Karrie", "Lunox", "Diggie", "X-Borg"],
    synergies: ["Beatrix", "Brody", "Valentina", "Novaria", "Kadita"],
    notes: [
      "Akai é forte para zonear e quebrar engage inimigo.",
      "Ganha muito valor contra heróis móveis e comps de dive.",
    ],
  },

  Aldous: {
    counters: ["Novaria", "Xavier", "Cecilion", "Layla", "Lesley"],
    counteredBy: ["Khufra", "Franco", "Kaja", "Chou", "Ruby"],
    synergies: ["Angela", "Mathilda", "Diggie", "Estes", "Faramis"],
    notes: [
      "Aldous escala muito, mas precisa sobreviver ao early.",
      "Funciona melhor com comps que protegem e aceleram pickoff.",
    ],
  },

  Alice: {
    counters: ["Claude", "Melissa", "Baxia", "Fredrinn", "Hylos"],
    counteredBy: ["Karrie", "Lunox", "Valir", "X-Borg", "Dyrroth"],
    synergies: ["Angela", "Estes", "Floryn", "Faramis", "Mathilda"],
    notes: [
      "Alice cresce em lutas longas e com sustain.",
      "Sofre quando o inimigo tem anti-heal, shred e kite.",
    ],
  },

  Alpha: {
    counters: ["Fredrinn", "Barats", "Hylos", "Belerick", "Akai"],
    counteredBy: ["Valir", "Karrie", "Lunox", "X-Borg", "Dyrroth"],
    synergies: ["Angela", "Rafaela", "Mathilda", "Faramis", "Floryn"],
    notes: [
      "Alpha é forte em lutas front-to-back.",
      "Precisa de acesso consistente ao alvo para render bem.",
    ],
  },

  Alucard: {
    counters: ["Harley", "Gusion", "Aamon", "Selena", "Hanzo"],
    counteredBy: ["Kaja", "Franco", "Khufra", "Ruby", "Eudora"],
    synergies: ["Angela", "Mathilda", "Diggie", "Estes", "Rafaela"],
    notes: [
      "Alucard se beneficia de proteção e engages já iniciados.",
      "Perde valor contra burst, suppress e kite.",
    ],
  },

  Angela: {
    counters: ["Arlott", "Fredrinn", "Cici", "Alpha", "Roger"],
    counteredBy: ["Natalia", "Helcurt", "Saber", "Aamon", "Franco"],
    synergies: ["Aldous", "Roger", "Fredrinn", "Arlott", "Cici"],
    notes: [
      "Angela amplifica muito picks agressivos e prolongamento de luta.",
      "Fica frágil contra comps de backline pickoff.",
    ],
  },

  Argus: {
    counters: ["Aldous", "Yu Zhong", "Terizla", "Esmeralda", "Uranus"],
    counteredBy: ["Kaja", "Franco", "Khufra", "Valir", "Baxia"],
    synergies: ["Angela", "Rafaela", "Mathilda", "Estes", "Diggie"],
    notes: [
      "Argus quer tempo e espaço para escalar.",
      "CC confiável e kite reduzem muito seu valor.",
    ],
  },

  Arlott: {
    counters: ["Claude", "Beatrix", "Brody", "Valentina", "Novaria"],
    counteredBy: ["Valir", "Kaja", "Franco", "Khufra", "Chou"],
    synergies: ["Mathilda", "Faramis", "Angela", "Fredrinn", "Novaria"],
    notes: [
      "Arlott ganha muito valor com engage em cadeia.",
      "Sofre contra kite, suppress e peel consistente.",
    ],
  },

  Atlas: {
    counters: ["Beatrix", "Brody", "Pharsa", "Xavier", "Novaria"],
    counteredBy: ["Diggie", "Valir", "Akai", "Kaja", "Franco"],
    synergies: ["Kadita", "Beatrix", "Valentina", "Brody", "Lunox"],
    notes: [
      "Atlas é fortíssimo em comps de follow-up de teamfight.",
      "Perde muito valor quando o inimigo tem negação de engage.",
    ],
  },

  Aulus: {
    counters: ["Uranus", "Fredrinn", "Barats", "Akai", "Baxia"],
    counteredBy: ["Valir", "Karrie", "Lunox", "Khufra", "Franco"],
    synergies: ["Angela", "Mathilda", "Rafaela", "Estes", "Floryn"],
    notes: [
      "Aulus escala bem e gosta de comps com frontline.",
      "Sofre para entrar quando o inimigo tem muito kite.",
    ],
  },

  Aurora: {
    counters: ["Ling", "Fanny", "Hayabusa", "Aamon", "Joy"],
    counteredBy: ["Kadita", "Harley", "Gusion", "Chou", "Mathilda"],
    synergies: ["Franco", "Kaja", "Khufra", "Atlas", "Novaria"],
    notes: [
      "Aurora pune mobilidade e rotações previsíveis.",
      "Brilha com picks de pickoff e follow-up rápido.",
    ],
  },

  Badang: {
    counters: ["Claude", "Wanwan", "Harith", "Lancelot", "Hayabusa"],
    counteredBy: ["Valir", "Akai", "Chou", "Ruby", "Kaja"],
    synergies: ["Angela", "Mathilda", "Franco", "Khufra", "Atlas"],
    notes: [
      "Badang ganha valor quando consegue prender alvo.",
      "Sofre quando o inimigo tem muito reset e deslocamento.",
    ],
  },

  Balmond: {
    counters: ["Ling", "Fanny", "Hayabusa", "Aamon", "Helcurt"],
    counteredBy: ["Karrie", "Lunox", "Valir", "X-Borg", "Dyrroth"],
    synergies: ["Angela", "Mathilda", "Estes", "Faramis", "Valentina"],
    notes: [
      "Balmond funciona melhor em comps que prolongam lutas.",
      "Sofre mais contra shred e dano constante.",
    ],
  },

  Bane: {
    counters: ["Hylos", "Barats", "Fredrinn", "Belerick", "Akai"],
    counteredBy: ["Karrie", "Lunox", "Claude", "Valir", "Hayabusa"],
    synergies: ["Tigreal", "Atlas", "Mathilda", "Angela", "Rafaela"],
    notes: [
      "Bane oferece poke e objetivo muito fortes.",
      "Fica melhor com comps que abrem espaço para ult acertar.",
    ],
  },

  Barats: {
    counters: ["Aamon", "Karina", "Ling", "Hayabusa", "Helcurt"],
    counteredBy: ["Karrie", "Valir", "Lunox", "X-Borg", "Dyrroth"],
    synergies: ["Angela", "Mathilda", "Faramis", "Floryn", "Novaria"],
    notes: [
      "Barats gosta de comps com follow-up e proteção.",
      "Cai bastante contra shred e kite.",
    ],
  },

  Baxia: {
    counters: ["Esmeralda", "Alice", "Uranus", "Ruby", "Estes"],
    counteredBy: ["Karrie", "Lunox", "Claude", "Valir", "X-Borg"],
    synergies: ["Novaria", "Valentina", "Kadita", "Brody", "Beatrix"],
    notes: [
      "Baxia é ótimo contra sustain e comps lentas.",
      "Ganha valor com rotações rápidas e pressão de mapa.",
    ],
  },

  Beatrix: {
    counters: ["Edith", "Barats", "Fredrinn", "Hylos", "Tigreal"],
    counteredBy: ["Natalia", "Lolita", "Franco", "Helcurt", "Ling"],
    synergies: ["Mathilda", "Tigreal", "Atlas", "Angela", "Minotauro"],
    notes: [
      "Beatrix ama comps que criam espaço para poke e burst.",
      "Sofre contra dive e picks de backline access.",
    ],
  },

  Belerick: {
    counters: ["Claude", "Melissa", "Moskov", "Karrie", "Ixia"],
    counteredBy: ["Valir", "Lunox", "X-Borg", "Dyrroth", "Karrie"],
    synergies: ["Valir", "Estes", "Floryn", "Cecilion", "Xavier"],
    notes: [
      "Belerick cresce contra muito DPS básico.",
      "Perde eficiência quando não consegue ser batido de frente.",
    ],
  },

  Benedetta: {
    counters: ["Novaria", "Pharsa", "Xavier", "Cecilion", "Layla"],
    counteredBy: ["Khufra", "Chou", "Kaja", "Franco", "Ruby"],
    synergies: ["Mathilda", "Angela", "Faramis", "Novaria", "Kadita"],
    notes: [
      "Benedetta ganha muito valor contra comps lineares.",
      "CC pontual e suppress atrapalham bastante.",
    ],
  },

  Brody: {
    counters: ["Fredrinn", "Hylos", "Barats", "Belerick", "Akai"],
    counteredBy: ["Natalia", "Ling", "Hayabusa", "Chou", "Lolita"],
    synergies: ["Mathilda", "Khufra", "Tigreal", "Atlas", "Angela"],
    notes: [
      "Brody é excelente em pickoff e lutas curtas.",
      "Sofre quando o inimigo cola na backline com constância.",
    ],
  },

  Bruno: {
    counters: ["Fredrinn", "Barats", "Tigreal", "Akai", "Hylos"],
    counteredBy: ["Natalia", "Helcurt", "Ling", "Hayabusa", "Chou"],
    synergies: ["Lolita", "Mathilda", "Tigreal", "Angela", "Rafaela"],
    notes: [
      "Bruno rende melhor com peel e tempo para bater.",
      "Dive e pickoff tiram muito seu impacto.",
    ],
  },

  Carmilla: {
    counters: ["Claude", "Moskov", "Miya", "Melissa", "Brody"],
    counteredBy: ["Diggie", "Valir", "Akai", "Kagura", "Faramis"],
    synergies: ["Cecilion", "Odette", "Pharsa", "Valentina", "Atlas"],
    notes: [
      "Carmilla cresce muito em comps de AoE e combo.",
      "Perde eficiência contra kite e negação de engage.",
    ],
  },

  Cecilion: {
    counters: ["Fredrinn", "Barats", "Belerick", "Hylos", "Minotauro"],
    counteredBy: ["Natalia", "Hayabusa", "Harley", "Kadita", "Gusion"],
    synergies: ["Carmilla", "Diggie", "Lolita", "Estes", "Faramis"],
    notes: [
      "Cecilion gosta de comps de zona e escala muito bem.",
      "Sofre contra backline access e pickoff explosivo.",
    ],
  },

  "Chang'e": {
    counters: ["Belerick", "Uranus", "Fredrinn", "Barats", "Akai"],
    counteredBy: ["Hayabusa", "Natalia", "Ling", "Kadita", "Helcurt"],
    synergies: ["Lolita", "Diggie", "Hylos", "Belerick", "Estes"],
    notes: [
      "Chang'e pressiona muito objetivo e poke.",
      "Precisa de proteção para manter DPS constante.",
    ],
  },

  Chip: {
    counters: ["Novaria", "Xavier", "Pharsa", "Cecilion", "Layla"],
    counteredBy: ["Franco", "Kaja", "Valir", "Diggie", "Akai"],
    synergies: ["Beatrix", "Brody", "Kadita", "Arlott", "Fredrinn"],
    notes: [
      "Chip é forte para tempo de mapa e engages criativos.",
      "Com follow-up certo, aumenta muito a pressão global.",
    ],
  },

  Chou: {
    counters: ["Beatrix", "Brody", "Harley", "Aamon", "Gusion"],
    counteredBy: ["Diggie", "Valir", "Akai", "Ruby", "Khufra"],
    synergies: ["Kadita", "Novaria", "Pharsa", "Beatrix", "Brody"],
    notes: [
      "Chou ganha muito valor em pickoff e isolamento de alvo.",
      "Perde força contra comps muito peeladas.",
    ],
  },

  Claude: {
    counters: ["Belerick", "Hylos", "Fredrinn", "Barats", "Minotauro"],
    counteredBy: ["Khufra", "Franco", "Natalia", "Helcurt", "Lolita"],
    synergies: ["Tigreal", "Atlas", "Mathilda", "Angela", "Diggie"],
    notes: [
      "Claude brilha quando há frontline e espaço para ultar.",
      "Hard CC e burst rápido atrapalham bastante.",
    ],
  },

  Clint: {
    counters: ["Brody", "Beatrix", "Harith", "Lunox", "Valentina"],
    counteredBy: ["Ling", "Hayabusa", "Natalia", "Chou", "Helcurt"],
    synergies: ["Lolita", "Mathilda", "Tigreal", "Khufra", "Angela"],
    notes: [
      "Clint pressiona lane e pickoff com muita consistência.",
      "Perde valor quando o inimigo cola na backline.",
    ],
  },

  Cici: {
    counters: ["Gusion", "Fanny", "Lancelot", "Saber", "Pharsa"],
    counteredBy: ["Yu Zhong", "Terizla", "Arlott", "Ruby", "Khaleed"],
    synergies: ["Angela", "Mathilda", "Faramis", "Floryn", "Rafaela"],
    notes: [
      "Cici sofre contra burst e suppress/CC confiável.",
      "Ela fica melhor em comps com sustain e prolongamento de luta.",
    ],
  },

  Cyclops: {
    counters: ["Ling", "Fanny", "Hayabusa", "Aamon", "Harley"],
    counteredBy: ["Kaja", "Franco", "Kadita", "Chou", "Natalia"],
    synergies: ["Khufra", "Atlas", "Tigreal", "Novaria", "Franco"],
    notes: [
      "Cyclops pune alvos expostos e mobilidade curta.",
      "Backline access explosivo reduz muito sua margem.",
    ],
  },

  Diggie: {
    counters: ["Tigreal", "Atlas", "Khufra", "Franco", "Kaja"],
    counteredBy: ["Natalia", "Helcurt", "Saber", "Aamon", "Hayabusa"],
    synergies: ["Karrie", "Beatrix", "Xavier", "Pharsa", "Cecilion"],
    notes: [
      "Diggie sobe muito de valor contra engage e hard CC.",
      "Fica mais vulnerável quando o inimigo tem pickoff explosivo.",
    ],
  },

  Dyrroth: {
    counters: ["Uranus", "Barats", "Fredrinn", "Esmeralda", "Akai"],
    counteredBy: ["Valir", "Khufra", "Ruby", "Kaja", "Franco"],
    synergies: ["Angela", "Mathilda", "Kaja", "Franco", "Novaria"],
    notes: [
      "Dyrroth quebra bem frontliners e duelistas.",
      "Sofre quando não consegue acesso limpo ao alvo.",
    ],
  },

  Edith: {
    counters: ["Valir", "Karrie", "Roger", "Valentina", "Beatrix"],
    counteredBy: ["Tigreal", "Atlas", "Khufra", "Franco", "Lolita"],
    synergies: ["Angela", "Mathilda", "Faramis", "Valentina", "Novaria"],
    notes: [
      "Edith sofre contra kite, poke e dano de shred.",
      "Ela cresce quando recebe proteção e follow-up.",
    ],
  },

  Esmeralda: {
    counters: ["Angela", "Mathilda", "Floryn", "Estes", "Harith"],
    counteredBy: ["Baxia", "Dyrroth", "Karrie", "Lunox", "Valir"],
    synergies: ["Estes", "Floryn", "Rafaela", "Faramis", "Diggie"],
    notes: [
      "Esmeralda cresce muito em lutas demoradas e contra shield.",
      "Anti-heal, burst e kite reduzem seu valor.",
    ],
  },

  Estes: {
    counters: ["Balmond", "Alpha", "Cici", "Fredrinn", "Barats"],
    counteredBy: ["Baxia", "Luo Yi", "Atlas", "Tigreal", "Carmilla"],
    synergies: ["Barats", "Alice", "Fredrinn", "Alpha", "Roger"],
    notes: [
      "Estes fortalece comps front-to-back e sustain.",
      "Sofre contra burst em área e anti-heal pesado.",
    ],
  },

  Eudora: {
    counters: ["Ling", "Fanny", "Hayabusa", "Aamon", "Joy"],
    counteredBy: ["Diggie", "Valentina", "Lunox", "Harith", "Kagura"],
    synergies: ["Franco", "Kaja", "Khufra", "Atlas", "Tigreal"],
    notes: [
      "Eudora é ótima para punir entradas previsíveis.",
      "Precisa de pickoff ou visão boa para converter mais.",
    ],
  },

  Fanny: {
    counters: ["Xavier", "Pharsa", "Novaria", "Cecilion", "Layla"],
    counteredBy: ["Khufra", "Franco", "Kaja", "Eudora", "Aurora"],
    synergies: ["Mathilda", "Angela", "Diggie", "Novaria", "Faramis"],
    notes: [
      "Fanny destrói backlines sem resposta instantânea.",
      "CC confiável e suppress travam sua condição de jogo.",
    ],
  },

  Faramis: {
    counters: ["Atlas", "Tigreal", "Kadita", "Pharsa", "Odette"],
    counteredBy: ["Valir", "Diggie", "Kaja", "Franco", "Xavier"],
    synergies: ["Arlott", "Fredrinn", "Barats", "Cici", "Roger"],
    notes: [
      "Faramis reseta teamfights e aumenta o tempo de luta.",
      "Ganha muito valor em comps de engage frontal.",
    ],
  },

  Floryn: {
    counters: ["Novaria", "Pharsa", "Xavier", "Valir", "Lylia"],
    counteredBy: ["Natalia", "Helcurt", "Saber", "Kadita", "Hayabusa"],
    synergies: ["Fredrinn", "Barats", "Alice", "Roger", "Cici"],
    notes: [
      "Floryn aumenta muito a consistência de comps de sustain.",
      "Pickoff explosivo limita sua capacidade de resposta.",
    ],
  },

  Franco: {
    counters: ["Aamon", "Karina", "Fanny", "Ling", "Hayabusa"],
    counteredBy: ["Diggie", "Valir", "Lolita", "Mathilda", "Akai"],
    synergies: ["Beatrix", "Harley", "Kadita", "Gusion", "Novaria"],
    notes: [
      "Franco é excelente contra picks móveis e squishies.",
      "Perde valor quando o inimigo joga espalhado ou com muito peel.",
    ],
  },

  Fredrinn: {
    counters: ["Karrie", "Valir", "X-Borg", "Dyrroth", "Lunox"],
    counteredBy: ["Beatrix", "Claude", "Balmond", "Karrie", "Valir"],
    synergies: ["Faramis", "Mathilda", "Valentina", "Novaria", "Angela"],
    notes: [
      "Fredrinn sofre mais contra anti-heal, shred e DPS constante.",
      "Combina bem com suporte utilitário e follow-up de engage.",
    ],
  },

  Freya: {
    counters: ["Harley", "Gusion", "Aamon", "Hayabusa", "Hanzo"],
    counteredBy: ["Kaja", "Franco", "Valir", "Ruby", "Khufra"],
    synergies: ["Angela", "Mathilda", "Diggie", "Rafaela", "Faramis"],
    notes: [
      "Freya quer entrar forte e continuar batendo.",
      "Peel, kite e suppress diminuem bastante seu impacto.",
    ],
  },

  Gatotkaca: {
    counters: ["Claude", "Moskov", "Melissa", "Brody", "Ixia"],
    counteredBy: ["Valir", "Lunox", "Karrie", "X-Borg", "Diggie"],
    synergies: ["Pharsa", "Valentina", "Beatrix", "Brody", "Novaria"],
    notes: [
      "Gatotkaca é ótimo em engage e teamfight.",
      "Fica melhor com follow-up instantâneo de dano.",
    ],
  },

  Gloo: {
    counters: ["Hayabusa", "Ling", "Natalia", "Harley", "Gusion"],
    counteredBy: ["Karrie", "Lunox", "Valir", "X-Borg", "Faramis"],
    synergies: ["Valir", "Cecilion", "Xavier", "Estes", "Floryn"],
    notes: [
      "Gloo atrapalha bastante comps de mobilidade curta.",
      "Shred, kite e poke constante reduzem seu valor.",
    ],
  },

  Gord: {
    counters: ["Fredrinn", "Barats", "Belerick", "Hylos", "Minotauro"],
    counteredBy: ["Kadita", "Hayabusa", "Natalia", "Ling", "Helcurt"],
    synergies: ["Tigreal", "Atlas", "Khufra", "Valentina", "Diggie"],
    notes: [
      "Gord é forte em controle de zona e DPS contínuo.",
      "Precisa muito de proteção e posicionamento.",
    ],
  },

  Granger: {
    counters: ["Brody", "Beatrix", "Harith", "Lunox", "Valentina"],
    counteredBy: ["Ling", "Hayabusa", "Natalia", "Chou", "Khufra"],
    synergies: ["Mathilda", "Franco", "Kaja", "Tigreal", "Angela"],
    notes: [
      "Granger quer lutas curtas e pickoffs limpos.",
      "Dive consistente diminui muito seu espaço.",
    ],
  },

  Grock: {
    counters: ["Khufra", "Tigreal", "Atlas", "Franco", "Akai"],
    counteredBy: ["Karrie", "Lunox", "Valir", "X-Borg", "Dyrroth"],
    synergies: ["Novaria", "Beatrix", "Brody", "Pharsa", "Valentina"],
    notes: [
      "Grock é excelente em mapa, parede e pressão de objetivo.",
      "Perde muito valor se não converter pressão em pickoff.",
    ],
  },

  Guinevere: {
    counters: ["Beatrix", "Brody", "Novaria", "Xavier", "Pharsa"],
    counteredBy: ["Diggie", "Valir", "Akai", "Franco", "Kaja"],
    synergies: ["Atlas", "Tigreal", "Khufra", "Mathilda", "Angela"],
    notes: [
      "Guinevere cresce muito com setup aliado.",
      "Poke, reset e negação de engage atrapalham bastante.",
    ],
  },

  Gusion: {
    counters: ["Harley", "Kadita", "Selena", "Eudora", "Novaria"],
    counteredBy: ["Kaja", "Franco", "Khufra", "Ruby", "Aurora"],
    synergies: ["Franco", "Kaja", "Mathilda", "Khufra", "Novaria"],
    notes: [
      "Gusion quer pickoff e ritmo acelerado de mapa.",
      "CC pontual e comps peeladas reduzem seu teto.",
    ],
  },

  Hanabi: {
    counters: ["Tigreal", "Atlas", "Khufra", "Fredrinn", "Barats"],
    counteredBy: ["Natalia", "Ling", "Hayabusa", "Helcurt", "Chou"],
    synergies: ["Lolita", "Diggie", "Angela", "Estes", "Rafaela"],
    notes: [
      "Hanabi gosta de comps de proteção e front-to-back.",
      "Perde muito contra dive e pickoff constante.",
    ],
  },

  Hanzo: {
    counters: ["Layla", "Xavier", "Pharsa", "Cecilion", "Novaria"],
    counteredBy: ["Natalia", "Ling", "Fanny", "Chou", "Franco"],
    synergies: ["Mathilda", "Angela", "Diggie", "Novaria", "Kaja"],
    notes: [
      "Hanzo pune mal posicionamento e mapa escuro.",
      "Precisa de espaço e proteção para extrair valor.",
    ],
  },

  Harith: {
    counters: ["Claude", "Brody", "Bruno", "Clint", "Natan"],
    counteredBy: ["Khufra", "Kaja", "Franco", "Valir", "Eudora"],
    synergies: ["Angela", "Mathilda", "Diggie", "Lolita", "Rafaela"],
    notes: [
      "Harith cresce muito com proteção e mobilidade.",
      "Travadores de dash e burst limpo atrapalham bastante.",
    ],
  },

  Harley: {
    counters: ["Karina", "Aamon", "Ling", "Hayabusa", "Hanzo"],
    counteredBy: ["Kaja", "Franco", "Aurora", "Eudora", "Khufra"],
    synergies: ["Franco", "Kaja", "Mathilda", "Novaria", "Tigreal"],
    notes: [
      "Harley pune alvos frágeis e rotações mal feitas.",
      "Sofre quando o inimigo tem muito peel ou defesa mágica cedo.",
    ],
  },

  Hayabusa: {
    counters: ["Cecilion", "Xavier", "Pharsa", "Novaria", "Layla"],
    counteredBy: ["Khufra", "Kaja", "Franco", "Eudora", "Aurora"],
    synergies: ["Mathilda", "Angela", "Diggie", "Novaria", "Faramis"],
    notes: [
      "Hayabusa é excelente contra backlines paradas.",
      "Sofre quando o inimigo tem resposta instantânea e visão boa.",
    ],
  },

  Helcurt: {
    counters: ["Xavier", "Novaria", "Pharsa", "Cecilion", "Layla"],
    counteredBy: ["Khufra", "Franco", "Ruby", "Kaja", "Akai"],
    synergies: ["Novaria", "Mathilda", "Angela", "Franco", "Kaja"],
    notes: [
      "Helcurt pune muito comps frágeis e com pouca visão.",
      "Peel e frontline consistente atrapalham sua entrada.",
    ],
  },

  Hilda: {
    counters: ["Ling", "Fanny", "Hayabusa", "Harley", "Aamon"],
    counteredBy: ["Valir", "Karrie", "Lunox", "Ruby", "Kaja"],
    synergies: ["Novaria", "Franco", "Kaja", "Mathilda", "Angela"],
    notes: [
      "Hilda cresce em comps agressivas de early game.",
      "Shred e poke contínuo reduzem muito seu valor.",
    ],
  },

  Hylos: {
    counters: ["Ling", "Fanny", "Hayabusa", "Helcurt", "Harith"],
    counteredBy: ["Karrie", "Lunox", "Valir", "X-Borg", "Dyrroth"],
    synergies: ["Valir", "Cecilion", "Xavier", "Estes", "Floryn"],
    notes: [
      "Hylos é ótimo para marchar e controlar espaço.",
      "Perde valor contra shred, kite e anti-heal eficiente.",
    ],
  },

  Irithel: {
    counters: ["Hylos", "Barats", "Fredrinn", "Belerick", "Akai"],
    counteredBy: ["Natalia", "Ling", "Hayabusa", "Helcurt", "Franco"],
    synergies: ["Lolita", "Mathilda", "Angela", "Rafaela", "Diggie"],
    notes: [
      "Irithel precisa de espaço para bater em movimento.",
      "Dive rápido e hard CC travam bastante seu dano.",
    ],
  },

  Ixia: {
    counters: ["Hylos", "Belerick", "Barats", "Fredrinn", "Tigreal"],
    counteredBy: ["Natalia", "Ling", "Hayabusa", "Kadita", "Helcurt"],
    synergies: ["Diggie", "Lolita", "Angela", "Minotauro", "Mathilda"],
    notes: [
      "Ixia é forte em zona e teamfight controlada.",
      "Sofre contra acesso traseiro e interrupções rápidas.",
    ],
  },

  Jawhead: {
    counters: ["Harley", "Gusion", "Aamon", "Selena", "Beatrix"],
    counteredBy: ["Diggie", "Valir", "Akai", "Ruby", "Kaja"],
    synergies: ["Kadita", "Novaria", "Beatrix", "Brody", "Pharsa"],
    notes: [
      "Jawhead é muito forte em pickoff e criação de janela.",
      "Perde força quando o inimigo tem muito reset de engage.",
    ],
  },

  Johnson: {
    counters: ["Xavier", "Pharsa", "Cecilion", "Layla", "Novaria"],
    counteredBy: ["Diggie", "Valir", "Akai", "Lolita", "Kaja"],
    synergies: ["Kadita", "Odette", "Valentina", "Beatrix", "Brody"],
    notes: [
      "Johnson gera pickoff e ritmo de mapa muito forte.",
      "Se a comp não acompanha, parte do valor se perde.",
    ],
  },

  Joy: {
    counters: ["Xavier", "Pharsa", "Novaria", "Layla", "Cecilion"],
    counteredBy: ["Kaja", "Franco", "Khufra", "Aurora", "Eudora"],
    synergies: ["Mathilda", "Angela", "Diggie", "Faramis", "Novaria"],
    notes: [
      "Joy quer ritmo alto e comps sem resposta de CC.",
      "Qualquer controle pontual confiável reduz muito seu impacto.",
    ],
  },

  Julian: {
    counters: ["Harley", "Aamon", "Karina", "Ling", "Hayabusa"],
    counteredBy: ["Kaja", "Franco", "Ruby", "Khufra", "Aurora"],
    synergies: ["Mathilda", "Angela", "Faramis", "Novaria", "Valentina"],
    notes: [
      "Julian é versátil e encaixa em pickoff e skirmish.",
      "Brilha mais quando o time acompanha rápido.",
    ],
  },

  Kadita: {
    counters: ["Beatrix", "Brody", "Xavier", "Pharsa", "Novaria"],
    counteredBy: ["Diggie", "Valir", "Akai", "Kaja", "Franco"],
    synergies: ["Atlas", "Tigreal", "Khufra", "Mathilda", "Franco"],
    notes: [
      "Kadita converte engage em burst muito bem.",
      "Perde valor contra comps com reset e peel consistente.",
    ],
  },

  Kagura: {
    counters: ["Khufra", "Atlas", "Tigreal", "Fredrinn", "Barats"],
    counteredBy: ["Natalia", "Hayabusa", "Ling", "Helcurt", "Kaja"],
    synergies: ["Franco", "Kaja", "Mathilda", "Novaria", "Valentina"],
    notes: [
      "Kagura oferece poke, burst e reposicionamento.",
      "É ótima quando a comp quer pickoff e espaço.",
    ],
  },

  Kaja: {
    counters: ["Aamon", "Karina", "Joy", "Fanny", "Ling"],
    counteredBy: ["Valir", "Diggie", "Akai", "Lolita", "Franco"],
    synergies: ["Harley", "Gusion", "Beatrix", "Kadita", "Novaria"],
    notes: [
      "Kaja pune mobilidade e alvos expostos.",
      "Quanto melhor o follow-up, melhor o valor do pick.",
    ],
  },

  Kalea: {
    counters: ["Ling", "Fanny", "Hayabusa", "Harith", "Joy"],
    counteredBy: ["Valir", "Diggie", "Akai", "Kaja", "Franco"],
    synergies: ["Brody", "Beatrix", "Claude", "Mathilda", "Angela"],
    notes: [
      "Kalea combina engage e proteção muito bem.",
      "Ganha muito valor em comps que querem controlar ritmo da luta.",
    ],
  },

  Karina: {
    counters: ["Aurora", "Eudora", "Franco", "Khufra", "Hylos"],
    counteredBy: ["Harley", "Gusion", "Saber", "Aamon", "Helcurt"],
    synergies: ["Kaja", "Franco", "Mathilda", "Atlas", "Tigreal"],
    notes: [
      "Karina odeia controle de grupo e picks que travam reset.",
      "Funciona bem com times que isolam alvos.",
    ],
  },

  Karrie: {
    counters: ["Tigreal", "Fredrinn", "Barats", "Belerick", "Hylos"],
    counteredBy: ["Natalia", "Karina", "Moskov", "Chou", "Freya"],
    synergies: ["Lolita", "Tigreal", "Mathilda", "Angela", "Minotauro"],
    notes: [
      "Karrie é especialmente boa para derreter frontline.",
      "Precisa de espaço e peel para bater livre.",
    ],
  },

  Khaleed: {
    counters: ["Harley", "Gusion", "Aamon", "Hayabusa", "Natalia"],
    counteredBy: ["Valir", "Ruby", "Kaja", "Franco", "Dyrroth"],
    synergies: ["Angela", "Mathilda", "Rafaela", "Novaria", "Faramis"],
    notes: [
      "Khaleed pressiona early e rota muito bem.",
      "Sofre se o inimigo controla distância e entra melhor.",
    ],
  },

  Khufra: {
    counters: ["Wanwan", "Ling", "Fanny", "Aamon", "Lancelot"],
    counteredBy: ["Valir", "Diggie", "Akai", "Benedetta", "Chou"],
    synergies: ["Beatrix", "Kadita", "Gusion", "Valentina", "Brody"],
    notes: [
      "Khufra é muito forte contra mobilidade e engage previsível.",
      "Precisa de dano de follow-up para converter pickoff.",
    ],
  },

  Kimmy: {
    counters: ["Hylos", "Belerick", "Uranus", "Fredrinn", "Barats"],
    counteredBy: ["Natalia", "Hayabusa", "Ling", "Helcurt", "Chou"],
    synergies: ["Lolita", "Diggie", "Angela", "Mathilda", "Rafaela"],
    notes: [
      "Kimmy oferece poke e DPS móvel.",
      "Dive agressivo e flanco bem executado tiram muito seu espaço.",
    ],
  },

  Lancelot: {
    counters: ["Xavier", "Pharsa", "Novaria", "Cecilion", "Layla"],
    counteredBy: ["Khufra", "Kaja", "Franco", "Aurora", "Eudora"],
    synergies: ["Mathilda", "Angela", "Diggie", "Novaria", "Faramis"],
    notes: [
      "Lancelot quer janelas limpas para entrar e sair.",
      "CC pontual e comps peeladas limitam bastante seu teto.",
    ],
  },

  "Lapu-Lapu": {
    counters: ["Kadita", "Gusion", "Harley", "Aamon", "Brody"],
    counteredBy: ["Valir", "Karrie", "Lunox", "Ruby", "Kaja"],
    synergies: ["Angela", "Mathilda", "Faramis", "Rafaela", "Diggie"],
    notes: [
      "Lapu-Lapu entra muito bem em teamfights fechadas.",
      "Kite e burst antes da entrada podem punir bastante.",
    ],
  },

  Layla: {
    counters: ["Fredrinn", "Barats", "Hylos", "Belerick", "Uranus"],
    counteredBy: ["Natalia", "Ling", "Hayabusa", "Helcurt", "Chou"],
    synergies: ["Lolita", "Diggie", "Angela", "Rafaela", "Estes"],
    notes: [
      "Layla é fortíssima se ganha tempo e peel.",
      "Sofre muito quando o inimigo alcança a backline fácil.",
    ],
  },

  Leomord: {
    counters: ["Brody", "Clint", "Harley", "Aamon", "Gusion"],
    counteredBy: ["Valir", "Karrie", "Ruby", "Kaja", "Franco"],
    synergies: ["Angela", "Mathilda", "Faramis", "Rafaela", "Estes"],
    notes: [
      "Leomord gosta de fights com tempo para ativar forma montada.",
      "Reset e peel inimigo dificultam sua conversão.",
    ],
  },

  Lesley: {
    counters: ["Barats", "Fredrinn", "Hylos", "Akai", "Belerick"],
    counteredBy: ["Natalia", "Ling", "Hayabusa", "Helcurt", "Chou"],
    synergies: ["Lolita", "Mathilda", "Angela", "Diggie", "Rafaela"],
    notes: [
      "Lesley é muito boa em pickoff e range control.",
      "Perde muito quando a comp inimiga cola nela com frequência.",
    ],
  },

  Ling: {
    counters: ["Xavier", "Novaria", "Cecilion", "Layla", "Pharsa"],
    counteredBy: ["Khufra", "Kaja", "Franco", "Aurora", "Eudora"],
    synergies: ["Mathilda", "Angela", "Diggie", "Novaria", "Faramis"],
    notes: [
      "Ling destrói comps sem controle confiável.",
      "Qualquer resposta de suppress ou CC pontual muda muito o draft.",
    ],
  },

  Lolita: {
    counters: ["Chang'e", "Harith", "Kimmy", "Beatrix", "Xavier"],
    counteredBy: ["Valir", "Diggie", "Akai", "Kaja", "Franco"],
    synergies: ["Karrie", "Beatrix", "Layla", "Hanabi", "Bruno"],
    notes: [
      "Lolita é ótima contra projéteis e comps de poke.",
      "Perde parte do valor se o inimigo não depende de skillshots.",
    ],
  },

  Lukas: {
    counters: ["Harley", "Aamon", "Gusion", "Hayabusa", "Natalia"],
    counteredBy: ["Valir", "Ruby", "Kaja", "Franco", "Dyrroth"],
    synergies: ["Angela", "Mathilda", "Faramis", "Rafaela", "Novaria"],
    notes: [
      "Lukas funciona melhor em comps agressivas e de skirmish.",
      "CC confiável e kite podem cortar seu ritmo.",
    ],
  },

  Lunox: {
    counters: ["Fredrinn", "Barats", "Hylos", "Belerick", "Uranus"],
    counteredBy: ["Natalia", "Ling", "Hayabusa", "Helcurt", "Kaja"],
    synergies: ["Lolita", "Mathilda", "Tigreal", "Atlas", "Diggie"],
    notes: [
      "Lunox é excelente contra frontline e dano previsível.",
      "Acesso traseiro e pickoff explosivo são seus maiores riscos.",
    ],
  },

  "Luo Yi": {
    counters: ["Estes", "Floryn", "Diggie", "Rafaela", "Angela"],
    counteredBy: ["Hayabusa", "Natalia", "Kadita", "Lancelot", "Ling"],
    synergies: ["Atlas", "Tigreal", "Khufra", "Carmilla", "Valentina"],
    notes: [
      "Luo Yi brilha muito contra comps agrupadas.",
      "Se o inimigo espalha bem e flanqueia, perde parte do valor.",
    ],
  },

  Lylia: {
    counters: ["Fredrinn", "Barats", "Hylos", "Akai", "Belerick"],
    counteredBy: ["Hayabusa", "Natalia", "Kadita", "Kaja", "Franco"],
    synergies: ["Diggie", "Lolita", "Valir", "Hylos", "Belerick"],
    notes: [
      "Lylia controla muito bem espaço e luta longa.",
      "Pickoff traseiro e burst coordenado punem bastante.",
    ],
  },

  Marcel: {
    counters: ["Atlas", "Tigreal", "Khufra", "Franco", "Kaja"],
    counteredBy: ["Natalia", "Helcurt", "Saber", "Hayabusa", "Aamon"],
    synergies: ["Beatrix", "Brody", "Karrie", "Cecilion", "Xavier"],
    notes: [
      "Marcel ganha muito valor em comps de proteção e reset.",
      "Sofre quando o inimigo joga pickoff na backline.",
    ],
  },

  Martis: {
    counters: ["Ling", "Fanny", "Harley", "Aamon", "Hayabusa"],
    counteredBy: ["Valir", "Ruby", "Kaja", "Franco", "Khufra"],
    synergies: ["Mathilda", "Angela", "Novaria", "Faramis", "Rafaela"],
    notes: [
      "Martis é muito forte no early e contra comps móveis.",
      "Perde valor quando não consegue snowballar ritmo.",
    ],
  },

  Masha: {
    counters: ["Novaria", "Xavier", "Layla", "Lesley", "Cecilion"],
    counteredBy: ["Karrie", "Lunox", "Valir", "Dyrroth", "Khufra"],
    synergies: ["Angela", "Diggie", "Mathilda", "Rafaela", "Faramis"],
    notes: [
      "Masha pune muito comp frágil e macro aberto.",
      "Shred, kite e CC confiável baixam muito sua eficiência.",
    ],
  },

  Mathilda: {
    counters: ["Beatrix", "Brody", "Valentina", "Harley", "Gusion"],
    counteredBy: ["Kaja", "Khufra", "Phoveus", "Franco", "Aurora"],
    synergies: ["Fredrinn", "Arlott", "Kadita", "Brody", "Beatrix"],
    notes: [
      "Mathilda melhora muito comps de engage e pickoff.",
      "Ela perde valor quando o inimigo consegue travar dash.",
    ],
  },

  Melissa: {
    counters: ["Barats", "Fredrinn", "Hylos", "Akai", "Belerick"],
    counteredBy: ["Natalia", "Ling", "Hayabusa", "Chou", "Helcurt"],
    synergies: ["Lolita", "Diggie", "Angela", "Mathilda", "Rafaela"],
    notes: [
      "Melissa é excelente contra entradas lineares e curto alcance.",
      "Flancos e pickoff lateral ainda são perigosos.",
    ],
  },

  Minotauro: {
    counters: ["Claude", "Moskov", "Brody", "Beatrix", "Ixia"],
    counteredBy: ["Diggie", "Valir", "Akai", "Kaja", "Franco"],
    synergies: ["Beatrix", "Pharsa", "Valentina", "Brody", "Lunox"],
    notes: [
      "Minotauro é muito valioso em teamfight fechada.",
      "Quanto melhor o follow-up aliado, maior seu impacto.",
    ],
  },

  Miya: {
    counters: ["Fredrinn", "Barats", "Hylos", "Akai", "Belerick"],
    counteredBy: ["Natalia", "Helcurt", "Ling", "Hayabusa", "Chou"],
    synergies: ["Lolita", "Diggie", "Angela", "Rafaela", "Estes"],
    notes: [
      "Miya escala bem e quer comps de proteção.",
      "Dive e controle de visão são seus maiores problemas.",
    ],
  },

  Minsitthar: {
    counters: ["Ling", "Fanny", "Lancelot", "Joy", "Wanwan"],
    counteredBy: ["Valir", "Diggie", "Akai", "Kagura", "Novaria"],
    synergies: ["Beatrix", "Brody", "Pharsa", "Valentina", "Cecilion"],
    notes: [
      "Minsitthar é excelente contra comps que dependem de dash.",
      "Se o inimigo joga muito de longe, parte do valor some.",
    ],
  },

  Moskov: {
    counters: ["Hylos", "Belerick", "Barats", "Uranus", "Akai"],
    counteredBy: ["Natalia", "Ling", "Hayabusa", "Helcurt", "Chou"],
    synergies: ["Tigreal", "Atlas", "Lolita", "Angela", "Mathilda"],
    notes: [
      "Moskov cresce muito em corridor fights e frontliners lentos.",
      "Acesso rápido à backline é um problema real para ele.",
    ],
  },

  Nana: {
    counters: ["Ling", "Fanny", "Hayabusa", "Joy", "Lancelot"],
    counteredBy: ["Kadita", "Harley", "Natalia", "Helcurt", "Gusion"],
    synergies: ["Belerick", "Hylos", "Cecilion", "Xavier", "Estes"],
    notes: [
      "Nana oferece peel e punição ótima contra entradas erradas.",
      "Burst coordenado ainda consegue apagar seu valor rápido.",
    ],
  },

  Natalia: {
    counters: ["Cecilion", "Pharsa", "Xavier", "Layla", "Lesley"],
    counteredBy: ["Lolita", "Diggie", "Hylos", "Akai", "Belerick"],
    synergies: ["Novaria", "Franco", "Kaja", "Mathilda", "Saber"],
    notes: [
      "Natalia pune visão ruim e backlines frágeis.",
      "Frontline robusta e controle de mapa dificultam muito seu jogo.",
    ],
  },

  Natan: {
    counters: ["Fredrinn", "Barats", "Hylos", "Akai", "Belerick"],
    counteredBy: ["Natalia", "Hayabusa", "Ling", "Helcurt", "Chou"],
    synergies: ["Lolita", "Diggie", "Angela", "Mathilda", "Rafaela"],
    notes: [
      "Natan escala bem e gosta de comps que o protegem.",
      "Dive e pickoff lateral continuam sendo o principal risco.",
    ],
  },

  Nolan: {
    counters: ["Xavier", "Novaria", "Pharsa", "Cecilion", "Layla"],
    counteredBy: ["Kaja", "Franco", "Khufra", "Aurora", "Eudora"],
    synergies: ["Mathilda", "Angela", "Diggie", "Novaria", "Faramis"],
    notes: [
      "Nolan cresce em ritmo alto e execução rápida.",
      "CC pontual e comps muito peeladas baixam seu impacto.",
    ],
  },

  Novaria: {
    counters: ["Fanny", "Ling", "Hayabusa", "Harley", "Aamon"],
    counteredBy: ["Natalia", "Helcurt", "Ling", "Kadita", "Mathilda"],
    synergies: ["Franco", "Kaja", "Chou", "Mathilda", "Jawhead"],
    notes: [
      "Novaria melhora muito pickoff e leitura de mapa.",
      "Backline access rápido pode punir seu posicionamento.",
    ],
  },

  Obsidia: {
    counters: ["Fredrinn", "Barats", "Hylos", "Akai", "Belerick"],
    counteredBy: ["Natalia", "Ling", "Hayabusa", "Helcurt", "Chou"],
    synergies: ["Lolita", "Diggie", "Angela", "Rafaela", "Mathilda"],
    notes: [
      "Obsidia gosta de comps front-to-back e peel.",
      "Dive consistente diminui bastante seu valor.",
    ],
  },

  Odette: {
    counters: ["Tigreal", "Atlas", "Khufra", "Fredrinn", "Barats"],
    counteredBy: ["Diggie", "Valir", "Akai", "Franco", "Kaja"],
    synergies: ["Johnson", "Atlas", "Tigreal", "Khufra", "Mathilda"],
    notes: [
      "Odette explode comps agrupadas quando recebe setup.",
      "Reset e interrupção de engage reduzem muito seu teto.",
    ],
  },

  Paquito: {
    counters: ["Harley", "Gusion", "Aamon", "Hayabusa", "Natalia"],
    counteredBy: ["Valir", "Ruby", "Kaja", "Franco", "Khufra"],
    synergies: ["Mathilda", "Angela", "Faramis", "Rafaela", "Novaria"],
    notes: [
      "Paquito pressiona early e pickoff com muita força.",
      "Controle pontual e comps peeladas podem travar seu jogo.",
    ],
  },

  Pharsa: {
    counters: ["Fredrinn", "Barats", "Tigreal", "Atlas", "Hylos"],
    counteredBy: ["Natalia", "Hayabusa", "Mathilda", "Kadita", "Ling"],
    synergies: ["Tigreal", "Atlas", "Khufra", "Franco", "Kaja"],
    notes: [
      "Pharsa oferece poke e follow-up de engage absurdos.",
      "Flancos e pickoff traseiro são seu principal problema.",
    ],
  },

  Phoveus: {
    counters: ["Wanwan", "Mathilda", "Joy", "Benedetta", "Harith"],
    counteredBy: ["Valir", "Karrie", "Lunox", "Diggie", "Xavier"],
    synergies: ["Khufra", "Tigreal", "Atlas", "Minotauro", "Angela"],
    notes: [
      "Phoveus cresce demais contra comp de muito dash.",
      "Perde eficiência quando o inimigo joga mais estático e pokeado.",
    ],
  },

  "Popol and Kupa": {
    counters: ["Ling", "Fanny", "Hayabusa", "Natalia", "Helcurt"],
    counteredBy: ["Claude", "Melissa", "Valir", "Lylia", "Carmilla"],
    synergies: ["Mathilda", "Franco", "Kaja", "Jawhead", "Novaria"],
    notes: [
      "Popol oferece controle de mapa e pickoff excelentes.",
      "AoE e comps de colapso punem bem sua estrutura.",
    ],
  },

  Rafaela: {
    counters: ["Arlott", "Fredrinn", "Barats", "Cici", "Roger"],
    counteredBy: ["Natalia", "Helcurt", "Saber", "Kadita", "Hayabusa"],
    synergies: ["Karrie", "Bruno", "Roger", "Freya", "Aldous"],
    notes: [
      "Rafaela aumenta mobilidade, sustain e disengage da comp.",
      "Backline pickoff é o maior risco para o pick.",
    ],
  },

  Roger: {
    counters: ["Fredrinn", "Barats", "Belerick", "Hylos", "Akai"],
    counteredBy: ["Valir", "Khufra", "Kaja", "Franco", "Ruby"],
    synergies: ["Angela", "Mathilda", "Faramis", "Rafaela", "Diggie"],
    notes: [
      "Roger é muito bom em snowball e pressão de mapa.",
      "Controle confiável e comps peeladas travam suas janelas.",
    ],
  },

  Ruby: {
    counters: ["Aldous", "Freya", "Alucard", "Martis", "Paquito"],
    counteredBy: ["Valir", "Karrie", "Lunox", "Diggie", "Faramis"],
    synergies: ["Cecilion", "Xavier", "Valir", "Estes", "Angela"],
    notes: [
      "Ruby é excelente em sustain, peel e anti-dive.",
      "Shred e anti-heal pesado podem reduzir seu valor.",
    ],
  },

  Saber: {
    counters: ["Harley", "Gusion", "Aamon", "Ling", "Hayabusa"],
    counteredBy: ["Diggie", "Lolita", "Akai", "Franco", "Kaja"],
    synergies: ["Novaria", "Mathilda", "Franco", "Kaja", "Angela"],
    notes: [
      "Saber é um pickoff simples e direto contra carry exposto.",
      "Comps com muito peel e resgate dificultam bastante.",
    ],
  },

  Selena: {
    counters: ["Harley", "Gusion", "Aamon", "Hayabusa", "Ling"],
    counteredBy: ["Diggie", "Lolita", "Akai", "Kaja", "Franco"],
    synergies: ["Franco", "Kaja", "Mathilda", "Novaria", "Jawhead"],
    notes: [
      "Selena é muito forte em pickoff e visão avançada.",
      "Se a comp não capitaliza a pressão, ela perde bastante valor.",
    ],
  },

  Silvanna: {
    counters: ["Wanwan", "Lancelot", "Benedetta", "Harith", "Joy"],
    counteredBy: ["Valir", "Diggie", "Akai", "Kaja", "Franco"],
    synergies: ["Mathilda", "Angela", "Pharsa", "Valentina", "Novaria"],
    notes: [
      "Silvanna gosta de comps que colapsam rápido em alvo preso.",
      "Reset e peel inimigo atrapalham muito sua conversão.",
    ],
  },

  Sora: {
    counters: ["Harley", "Aamon", "Gusion", "Natalia", "Hayabusa"],
    counteredBy: ["Valir", "Ruby", "Khufra", "Kaja", "Franco"],
    synergies: ["Angela", "Mathilda", "Novaria", "Faramis", "Rafaela"],
    notes: [
      "Sora performa melhor em comps de ritmo alto.",
      "CC consistente e comps peeladas podem travar sua luta.",
    ],
  },

  Sun: {
    counters: ["Belerick", "Hylos", "Akai", "Barats", "Fredrinn"],
    counteredBy: ["Valir", "Claude", "Melissa", "Lunox", "X-Borg"],
    synergies: ["Angela", "Rafaela", "Estes", "Floryn", "Diggie"],
    notes: [
      "Sun cresce com tempo de side e luta longa.",
      "AoE, anti-summon e burst em área diminuem seu valor.",
    ],
  },

  Suyou: {
    counters: ["Harley", "Aamon", "Gusion", "Hayabusa", "Ling"],
    counteredBy: ["Khufra", "Kaja", "Franco", "Ruby", "Aurora"],
    synergies: ["Mathilda", "Angela", "Novaria", "Faramis", "Diggie"],
    notes: [
      "Suyou quer comps de skirmish e conversão rápida.",
      "Hard CC e comps estáveis de front-to-back limitam suas janelas.",
    ],
  },

  Terizla: {
    counters: ["Aldous", "Argus", "Freya", "Lapu-Lapu", "Paquito"],
    counteredBy: ["Valir", "Karrie", "Lunox", "Diggie", "Xavier"],
    synergies: ["Cecilion", "Xavier", "Valir", "Estes", "Angela"],
    notes: [
      "Terizla é ótimo em teamfight e controle de espaço.",
      "Kite e poke de longa distância reduzem sua presença.",
    ],
  },

  Thamuz: {
    counters: ["Fredrinn", "Akai", "Baxia", "Belerick", "Uranus"],
    counteredBy: ["Valir", "Karrie", "Lunox", "X-Borg", "Ruby"],
    synergies: ["Angela", "Estes", "Floryn", "Rafaela", "Faramis"],
    notes: [
      "Thamuz cresce muito em lutas frontais e demoradas.",
      "Kite e comps de burst limpo podem punir bem.",
    ],
  },

  Tigreal: {
    counters: ["Beatrix", "Xavier", "Pharsa", "Valentina", "Brody"],
    counteredBy: ["Diggie", "Valir", "Akai", "Lolita", "Martis"],
    synergies: ["Beatrix", "Pharsa", "Kadita", "Valentina", "Brody"],
    notes: [
      "Tigreal é excelente em comps de teamfight e follow-up.",
      "Precisa tomar cuidado com negação de engage.",
    ],
  },

  Uranus: {
    counters: ["Valir", "Xavier", "Cecilion", "Lylia", "Yve"],
    counteredBy: ["Dyrroth", "Karrie", "Lunox", "Baxia", "X-Borg"],
    synergies: ["Estes", "Floryn", "Rafaela", "Angela", "Diggie"],
    notes: [
      "Uranus ama comps de sustain e objetivo lento.",
      "Anti-heal e shred específico reduzem muito sua vantagem.",
    ],
  },

  Vale: {
    counters: ["Ling", "Fanny", "Hayabusa", "Harith", "Joy"],
    counteredBy: ["Kadita", "Natalia", "Hayabusa", "Kaja", "Franco"],
    synergies: ["Franco", "Kaja", "Khufra", "Atlas", "Tigreal"],
    notes: [
      "Vale é excelente para pickoff e follow-up de controle.",
      "Sofre quando a comp inimiga consegue colar rápido nele.",
    ],
  },

  Valentina: {
    counters: ["Tigreal", "Atlas", "Khufra", "Faramis", "Minotauro"],
    counteredBy: ["Natalia", "Helcurt", "Hayabusa", "Kaja", "Franco"],
    synergies: ["Fredrinn", "Barats", "Tigreal", "Khufra", "Mathilda"],
    notes: [
      "Valentina é muito flexível e cresce conforme os ultimates inimigos.",
      "Backline access e pickoff pontual continuam perigosos.",
    ],
  },

  Valir: {
    counters: ["Fredrinn", "Edith", "Barats", "Akai", "Khufra"],
    counteredBy: ["Kadita", "Lancelot", "Hayabusa", "Gusion", "Aamon"],
    synergies: ["Fredrinn", "Belerick", "Hylos", "Kaja", "Estes"],
    notes: [
      "Valir é forte para kitear engage frontal.",
      "Fica vulnerável contra burst e backline access.",
    ],
  },

  Vexana: {
    counters: ["Fredrinn", "Barats", "Hylos", "Tigreal", "Atlas"],
    counteredBy: ["Natalia", "Hayabusa", "Kadita", "Ling", "Helcurt"],
    synergies: ["Tigreal", "Atlas", "Khufra", "Valentina", "Diggie"],
    notes: [
      "Vexana cresce com comps de engage e controle em área.",
      "Pickoff lateral e pressão traseira punem seu posicionamento.",
    ],
  },

  Wanwan: {
    counters: ["Barats", "Fredrinn", "Hylos", "Belerick", "Akai"],
    counteredBy: ["Khufra", "Minsitthar", "Kaja", "Franco", "Aurora"],
    synergies: ["Lolita", "Diggie", "Angela", "Mathilda", "Rafaela"],
    notes: [
      "Wanwan é muito forte quando o inimigo não consegue travar mobilidade.",
      "Qualquer controle pontual confiável muda demais o matchup.",
    ],
  },

  "X-Borg": {
    counters: ["Alice", "Fredrinn", "Barats", "Uranus", "Belerick"],
    counteredBy: ["Karrie", "Claude", "Valentina", "Lunox", "Brody"],
    synergies: ["Angela", "Rafaela", "Diggie", "Hylos", "Valir"],
    notes: [
      "X-Borg é ótimo para derreter linha de frente e zona.",
      "Burst limpo e comps de range podem cortar seu tempo de luta.",
    ],
  },

  Xavier: {
    counters: ["Fredrinn", "Barats", "Hylos", "Belerick", "Tigreal"],
    counteredBy: ["Natalia", "Hayabusa", "Kadita", "Ling", "Helcurt"],
    synergies: ["Diggie", "Lolita", "Khufra", "Franco", "Kaja"],
    notes: [
      "Xavier escala muito e ama comps de proteção e pickoff.",
      "Acesso rápido à backline reduz bastante sua margem.",
    ],
  },

  "Yi Sun-shin": {
    counters: ["Novaria", "Pharsa", "Xavier", "Layla", "Lesley"],
    counteredBy: ["Khufra", "Kaja", "Franco", "Aurora", "Ruby"],
    synergies: ["Mathilda", "Angela", "Diggie", "Novaria", "Faramis"],
    notes: [
      "Yi Sun-shin combina visão global com burst e objetivo.",
      "Precisa de comp coesa para transformar informação em pickoff.",
    ],
  },

  Yin: {
    counters: ["Harley", "Aamon", "Gusion", "Hayabusa", "Ling"],
    counteredBy: ["Diggie", "Valir", "Akai", "Ruby", "Kaja"],
    synergies: ["Angela", "Mathilda", "Franco", "Kaja", "Novaria"],
    notes: [
      "Yin pune alvos frágeis e mal posicionados.",
      "Peel e comps muito agrupadas podem reduzir seu impacto.",
    ],
  },

  "Yu Zhong": {
    counters: ["Brody", "Beatrix", "Clint", "Harith", "Lunox"],
    counteredBy: ["Valir", "Karrie", "Lunox", "Diggie", "Baxia"],
    synergies: ["Angela", "Faramis", "Mathilda", "Rafaela", "Estes"],
    notes: [
      "Yu Zhong entra muito bem em fights médias e longas.",
      "Anti-heal e kite consistente baixam bastante seu valor.",
    ],
  },

  Yve: {
    counters: ["Fredrinn", "Barats", "Hylos", "Akai", "Belerick"],
    counteredBy: ["Natalia", "Hayabusa", "Ling", "Kadita", "Mathilda"],
    synergies: ["Tigreal", "Atlas", "Khufra", "Franco", "Diggie"],
    notes: [
      "Yve controla muito bem zonas de teamfight.",
      "Flanco rápido e acesso à backline tiram seu espaço.",
    ],
  },

  Zhask: {
    counters: ["Fredrinn", "Barats", "Hylos", "Uranus", "Akai"],
    counteredBy: ["Hayabusa", "Natalia", "Ling", "Kadita", "Helcurt"],
    synergies: ["Diggie", "Lolita", "Hylos", "Valir", "Belerick"],
    notes: [
      "Zhask cresce em controle de objetivo e zona.",
      "Sofre quando o inimigo consegue pular na backline rápido.",
    ],
  },

  Zhuxin: {
    counters: ["Ling", "Fanny", "Hayabusa", "Joy", "Lancelot"],
    counteredBy: ["Kadita", "Harley", "Natalia", "Helcurt", "Kaja"],
    synergies: ["Tigreal", "Atlas", "Khufra", "Valentina", "Diggie"],
    notes: [
      "Zhuxin oferece controle e setup interessantes para combo.",
      "Backline access e burst pontual são perigosos para o pick.",
    ],
  },

  Zetian: {
    counters: ["Brody", "Beatrix", "Harith", "Lunox", "Valentina"],
    counteredBy: ["Natalia", "Hayabusa", "Ling", "Kadita", "Helcurt"],
    synergies: ["Franco", "Kaja", "Mathilda", "Novaria", "Tigreal"],
    notes: [
      "Zetian funciona bem em comps de poke e pickoff.",
      "Se a comp inimiga colapsa rápido, ele perde espaço.",
    ],
  },

  Zilong: {
    counters: ["Layla", "Cecilion", "Xavier", "Pharsa", "Lesley"],
    counteredBy: ["Khufra", "Franco", "Kaja", "Ruby", "Valir"],
    synergies: ["Angela", "Mathilda", "Rafaela", "Diggie", "Faramis"],
    notes: [
      "Zilong puni muito alvo exposto e side aberta.",
      "Peel, kite e controle pontual diminuem muito sua efetividade.",
    ],
  },
}