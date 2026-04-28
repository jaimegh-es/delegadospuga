export interface Subject {
  code: string;
  name: string;
  teacher: string;
  room: string;
}

export interface SchedulePeriod {
  start: string;
  end: string;
  subjects: Subject[]; // Multiple for optativas
  isBreak?: boolean;
}

export const SUBJECT_NAMES: Record<string, string> = {
  EFi: "Educación Física",
  LCa: "Lengua Castellana",
  Filo: "Filosofía",
  Ingl: "Lengua Inglesa",
  LGa: "Lengua Gallega",
  FeQ: "Física y Química",
  HMCo: "Historia del Mundo Contemporáneo",
  Mat: "Matemáticas",
  Tec: "Tecnología",
  Lat: "Latín",
  Estudo: "Estudio",
  Rel: "Religión",
  DT: "Dibujo Técnico",
  TIC: "Tecnologías de la Inf. y Com. (TIC)",
  Fr: "Francés",
  TINT: "Tecnologías Inteligentes",
};

const TIMES = [
  { start: "08:45", end: "09:35" },
  { start: "09:35", end: "10:25" },
  { start: "10:25", end: "10:50", isBreak: true },
  { start: "10:50", end: "11:40" },
  { start: "11:40", end: "12:30" },
  { start: "12:30", end: "12:55", isBreak: true },
  { start: "12:55", end: "13:45" },
  { start: "13:45", end: "14:35" },
  { start: "16:00", end: "16:50" }, // Martes tarde
  { start: "16:50", end: "17:40" }, // Martes tarde
];

export const SCHEDULE: Record<number, SchedulePeriod[]> = {
  1: [ // Lunes
    { ...TIMES[0], subjects: [{ code: "FeQ", name: SUBJECT_NAMES.FeQ, teacher: "ACVP", room: "B1B" }] },
    { ...TIMES[1], subjects: [
        { code: "Rel", name: SUBJECT_NAMES.Rel, teacher: "AGP", room: "A214" },
        { code: "Estudo", name: SUBJECT_NAMES.Estudo, teacher: "SVB", room: "B1B" }
    ] },
    { ...TIMES[2], subjects: [], isBreak: true },
    { ...TIMES[3], subjects: [
        { code: "Tec", name: SUBJECT_NAMES.Tec, teacher: "IRS", room: "Tec" },
        { code: "Lat", name: SUBJECT_NAMES.Lat, teacher: "ABL", room: "A214" }
    ] },
    { ...TIMES[4], subjects: [
        { code: "HMCo", name: SUBJECT_NAMES.HMCo, teacher: "ARP", room: "B1C" },
        { code: "Mat", name: SUBJECT_NAMES.Mat, teacher: "YGV", room: "B1B" }
    ] },
    { ...TIMES[5], subjects: [], isBreak: true },
    { ...TIMES[6], subjects: [{ code: "EFi", name: SUBJECT_NAMES.EFi, teacher: "NBD", room: "Pav" }] },
    { ...TIMES[7], subjects: [{ code: "Ingl", name: SUBJECT_NAMES.Ingl, teacher: "PMdC", room: "B1B" }] },
  ],
  2: [ // Martes
    { ...TIMES[0], subjects: [{ code: "LGa", name: SUBJECT_NAMES.LGa, teacher: "LDG", room: "B1B" }] },
    { ...TIMES[1], subjects: [
        { code: "HMCo", name: SUBJECT_NAMES.HMCo, teacher: "ARP", room: "B1C" },
        { code: "Mat", name: SUBJECT_NAMES.Mat, teacher: "YGV", room: "B1B" }
    ] },
    { ...TIMES[2], subjects: [], isBreak: true },
    { ...TIMES[3], subjects: [
        { code: "Tec", name: SUBJECT_NAMES.Tec, teacher: "IRS", room: "Tec" },
        { code: "Lat", name: SUBJECT_NAMES.Lat, teacher: "ABL", room: "A214" }
    ] },
    { ...TIMES[4], subjects: [
        { code: "DT", name: SUBJECT_NAMES.DT, teacher: "JGF", room: "Dbx" },
        { code: "TINT", name: SUBJECT_NAMES.TINT, teacher: "PNT", room: "Inf" },
        { code: "Fr", name: SUBJECT_NAMES.Fr, teacher: "CTB", room: "B1A" },
        { code: "TIC", name: SUBJECT_NAMES.TIC, teacher: "IRS", room: "A Est" }
    ] },
    { ...TIMES[5], subjects: [], isBreak: true },
    { ...TIMES[6], subjects: [{ code: "Ingl", name: SUBJECT_NAMES.Ingl, teacher: "PMdC", room: "B1B" }] },
    { ...TIMES[7], subjects: [{ code: "FeQ", name: SUBJECT_NAMES.FeQ, teacher: "ACVP", room: "B1B" }] },
    { ...TIMES[8], subjects: [{ code: "EFi", name: SUBJECT_NAMES.EFi, teacher: "NBD", room: "Pav" }] },
    { ...TIMES[9], subjects: [{ code: "LCa", name: SUBJECT_NAMES.LCa, teacher: "RMG", room: "B1B" }] },
  ],
  3: [ // Miércoles
    { ...TIMES[0], subjects: [{ code: "Filo", name: SUBJECT_NAMES.Filo, teacher: "MGL", room: "B1B" }] },
    { ...TIMES[1], subjects: [
        { code: "HMCo", name: SUBJECT_NAMES.HMCo, teacher: "ARP", room: "B1C" },
        { code: "Mat", name: SUBJECT_NAMES.Mat, teacher: "YGV", room: "B1B" }
    ] },
    { ...TIMES[2], subjects: [], isBreak: true },
    { ...TIMES[3], subjects: [
        { code: "DT", name: SUBJECT_NAMES.DT, teacher: "JGF", room: "Dbx" },
        { code: "TINT", name: SUBJECT_NAMES.TINT, teacher: "PNT", room: "Inf" },
        { code: "Fr", name: SUBJECT_NAMES.Fr, teacher: "CTB", room: "B1A" },
        { code: "TIC", name: SUBJECT_NAMES.TIC, teacher: "IRS", room: "A Est" }
    ] },
    { ...TIMES[4], subjects: [
        { code: "Tec", name: SUBJECT_NAMES.Tec, teacher: "IRS", room: "Inf" },
        { code: "Lat", name: SUBJECT_NAMES.Lat, teacher: "ABL", room: "A214" }
    ] },
    { ...TIMES[5], subjects: [], isBreak: true },
    { ...TIMES[6], subjects: [{ code: "FeQ", name: SUBJECT_NAMES.FeQ, teacher: "ACVP", room: "B1B" }] },
    { ...TIMES[7], subjects: [{ code: "LCa", name: SUBJECT_NAMES.LCa, teacher: "RMG", room: "B1B" }] },
  ],
  4: [ // Jueves
    { ...TIMES[0], subjects: [{ code: "LCa", name: SUBJECT_NAMES.LCa, teacher: "RMG", room: "B1B" }] },
    { ...TIMES[1], subjects: [{ code: "Filo", name: SUBJECT_NAMES.Filo, teacher: "MGL", room: "B1B" }] },
    { ...TIMES[2], subjects: [], isBreak: true },
    { ...TIMES[3], subjects: [
        { code: "Tec", name: SUBJECT_NAMES.Tec, teacher: "IRS", room: "Tec" },
        { code: "Lat", name: SUBJECT_NAMES.Lat, teacher: "ABL", room: "A214" }
    ] },
    { ...TIMES[4], subjects: [{ code: "EFi", name: SUBJECT_NAMES.EFi, teacher: "NBD", room: "Pav" }] },
    { ...TIMES[5], subjects: [], isBreak: true },
    { ...TIMES[6], subjects: [
        { code: "DT", name: SUBJECT_NAMES.DT, teacher: "JGF", room: "Dbx" },
        { code: "TINT", name: SUBJECT_NAMES.TINT, teacher: "PNT", room: "Inf" },
        { code: "Fr", name: SUBJECT_NAMES.Fr, teacher: "CTB", room: "B1A" },
        { code: "TIC", name: SUBJECT_NAMES.TIC, teacher: "IRS", room: "Tec" }
    ] },
    { ...TIMES[7], subjects: [{ code: "LGa", name: SUBJECT_NAMES.LGa, teacher: "LDG", room: "B1B" }] },
  ],
  5: [ // Viernes
    { ...TIMES[0], subjects: [{ code: "Filo", name: SUBJECT_NAMES.Filo, teacher: "MGL", room: "B1B" }] },
    { ...TIMES[1], subjects: [
        { code: "HMCo", name: SUBJECT_NAMES.HMCo, teacher: "ARP", room: "B1C" },
        { code: "Mat", name: SUBJECT_NAMES.Mat, teacher: "YGV", room: "B1B" }
    ] },
    { ...TIMES[2], subjects: [], isBreak: true },
    { ...TIMES[3], subjects: [{ code: "FeQ", name: SUBJECT_NAMES.FeQ, teacher: "ACVP", room: "B1B" }] },
    { ...TIMES[4], subjects: [{ code: "LGa", name: SUBJECT_NAMES.LGa, teacher: "LDG", room: "B1B" }] },
    { ...TIMES[5], subjects: [], isBreak: true },
    { ...TIMES[6], subjects: [
        { code: "DT", name: SUBJECT_NAMES.DT, teacher: "JGF", room: "Dbx" },
        { code: "TINT", name: SUBJECT_NAMES.TINT, teacher: "PNT", room: "Inf" },
        { code: "Fr", name: SUBJECT_NAMES.Fr, teacher: "CTB", room: "B1A" },
        { code: "TIC", name: SUBJECT_NAMES.TIC, teacher: "IRS", room: "Tec" }
    ] },
    { ...TIMES[7], subjects: [{ code: "Ingl", name: SUBJECT_NAMES.Ingl, teacher: "PMdC", room: "B1B" }] },
  ]
};
