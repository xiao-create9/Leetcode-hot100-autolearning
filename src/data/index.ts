import type { Problem } from '@/types/problem'

import p1 from './1.json'
import p2 from './2.json'
import p3 from './3.json'
import p4 from './4.json'
import p5 from './5.json'
import p6 from './6.json'
import p7 from './7.json'
import p8 from './8.json'
import p9 from './9.json'
import p10 from './10.json'
import p11 from './11.json'
import p12 from './12.json'
import p13 from './13.json'
import p14 from './14.json'
import p15 from './15.json'
import p16 from './16.json'
import p17 from './17.json'
import p18 from './18.json'
import p19 from './19.json'
import p20 from './20.json'
import p21 from './21.json'
import p22 from './22.json'
import p23 from './23.json'
import p24 from './24.json'
import p25 from './25.json'
import p26 from './26.json'
import p27 from './27.json'
import p28 from './28.json'
import p29 from './29.json'
import p30 from './30.json'
import p31 from './31.json'
import p32 from './32.json'
import p33 from './33.json'
import p34 from './34.json'
import p35 from './35.json'
import p36 from './36.json'
import p37 from './37.json'
import p38 from './38.json'
import p39 from './39.json'
import p40 from './40.json'
import p41 from './41.json'
import p42 from './42.json'
import p43 from './43.json'
import p44 from './44.json'
import p45 from './45.json'
import p46 from './46.json'
import p47 from './47.json'
import p48 from './48.json'
import p49 from './49.json'
import p50 from './50.json'
import p51 from './51.json'
import p52 from './52.json'
import p53 from './53.json'
import p54 from './54.json'
import p55 from './55.json'
import p56 from './56.json'
import p57 from './57.json'
import p58 from './58.json'
import p59 from './59.json'
import p60 from './60.json'
import p61 from './61.json'
import p62 from './62.json'
import p63 from './63.json'
import p64 from './64.json'
import p65 from './65.json'
import p66 from './66.json'
import p67 from './67.json'
import p68 from './68.json'
import p69 from './69.json'
import p70 from './70.json'
import p71 from './71.json'
import p72 from './72.json'
import p73 from './73.json'
import p74 from './74.json'
import p75 from './75.json'
import p76 from './76.json'
import p77 from './77.json'
import p78 from './78.json'
import p79 from './79.json'
import p80 from './80.json'
import p81 from './81.json'
import p82 from './82.json'
import p83 from './83.json'
import p84 from './84.json'
import p85 from './85.json'
import p86 from './86.json'
import p87 from './87.json'
import p88 from './88.json'
import p89 from './89.json'
import p90 from './90.json'
import p91 from './91.json'
import p92 from './92.json'
import p93 from './93.json'
import p94 from './94.json'
import p95 from './95.json'
import p96 from './96.json'
import p97 from './97.json'
import p98 from './98.json'

export const problems: Problem[] = [
  p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
  p11, p12, p13, p14, p15, p16, p17, p18, p19, p20,
  p21, p22, p23, p24, p25, p26, p27, p28, p29, p30,
  p31, p32, p33, p34, p35, p36, p37, p38, p39, p40,
  p41, p42, p43, p44, p45, p46, p47, p48, p49, p50,
  p51, p52, p53, p54, p55, p56, p57, p58, p59, p60,
  p61, p62, p63, p64, p65, p66, p67, p68, p69, p70,
  p71, p72, p73, p74, p75, p76, p77, p78, p79, p80,
  p81, p82, p83, p84, p85, p86, p87, p88, p89, p90,
  p91, p92, p93, p94, p95, p96, p97, p98,
] as Problem[]

export function getProblemById(id: number): Problem | undefined {
  return problems.find((p) => p.id === id)
}

export function getProblemsByTag(tag: string): Problem[] {
  return problems.filter((p) => p.tags.includes(tag as Problem['tags'][number]))
}

export function getProblemsByDifficulty(difficulty: Problem['difficulty']): Problem[] {
  return problems.filter((p) => p.difficulty === difficulty)
}
