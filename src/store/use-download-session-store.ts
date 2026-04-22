import { combine } from 'zustand/middleware'

type DownloadSessionContent = {
  id: string
  name: string
  link: string
  progress: number
}

type DownloadSession = {
  id: string
  name: string
  contents: DownloadSessionContent[]
}

function demoContents(prefix: string, count: number): DownloadSessionContent[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    name: `File ${i + 1}.mp4`,
    link: `https://example.com/downloads/${prefix}/file-${i + 1}.mp4`,
    progress: Math.floor(Math.random() * 101),
  }))
}

const initialState = {
  sessions: [
    {
      id: 's1',
      name: 'Movie Collection 2024',
      contents: demoContents('mc', 12),
    },
    {
      id: 's2',
      name: 'Music Album - Greatest Hits',
      contents: demoContents('mh', 8),
    },
    { id: 's3', name: 'Software Suite Pro', contents: demoContents('ss', 5) },
    {
      id: 's4',
      name: 'Photography Tutorials',
      contents: demoContents('pt', 15),
    },
    { id: 's5', name: 'E-Books Bundle', contents: demoContents('eb', 20) },
    { id: 's6', name: 'Game Assets Pack', contents: demoContents('ga', 30) },
    {
      id: 's7',
      name: 'Video Editing Templates',
      contents: demoContents('vet', 10),
    },
    {
      id: 's8',
      name: 'Font Collection Premium',
      contents: demoContents('fc', 45),
    },
    { id: 's9', name: '3D Models Library', contents: demoContents('3d', 25) },
    {
      id: 's10',
      name: 'Sound Effects Library',
      contents: demoContents('se', 60),
    },
    { id: 's11', name: 'Stock Footage 4K', contents: demoContents('sf', 18) },
    {
      id: 's12',
      name: 'Icon Sets Mega Pack',
      contents: demoContents('is', 100),
    },
    { id: 's13', name: 'UI Kit Components', contents: demoContents('ui', 35) },
    {
      id: 's14',
      name: 'Podcast Episodes S03',
      contents: demoContents('pe', 24),
    },
    { id: 's15', name: 'Documentary Series', contents: demoContents('ds', 6) },
    {
      id: 's16',
      name: 'Audiobooks Classics',
      contents: demoContents('ac', 14),
    },
    {
      id: 's17',
      name: 'Code Snippets Archive',
      contents: demoContents('cs', 50),
    },
    {
      id: 's18',
      name: 'Design Resources 2025',
      contents: demoContents('dr', 40),
    },
    {
      id: 's19',
      name: 'Language Learning Packs',
      contents: demoContents('ll', 9),
    },
    { id: 's20', name: 'Fitness Videos HD', contents: demoContents('fv', 22) },
    {
      id: 's21',
      name: 'Cooking Recipes Video',
      contents: demoContents('cr', 16),
    },
    {
      id: 's22',
      name: 'Tech Conference Talks',
      contents: demoContents('tc', 28),
    },
    {
      id: 's23',
      name: 'Animation Frames Set',
      contents: demoContents('af', 55),
    },
    { id: 's24', name: 'Texture Pack PBR', contents: demoContents('tp', 33) },
    {
      id: 's25',
      name: 'Shader Collection GLSL',
      contents: demoContents('sh', 19),
    },
    { id: 's26', name: 'Plugin Bundle Adobe', contents: demoContents('pb', 7) },
    {
      id: 's27',
      name: 'LUTs Color Grading',
      contents: demoContents('lut', 42),
    },
    {
      id: 's28',
      name: 'Motion Graphics Pack',
      contents: demoContents('mg', 11),
    },
    {
      id: 's29',
      name: 'Sample Library WAV',
      contents: demoContents('samp', 80),
    },
    {
      id: 's30',
      name: 'MIDI Files Collection',
      contents: demoContents('midi', 65),
    },
    {
      id: 's31',
      name: 'Preset Packs Lightroom',
      contents: demoContents('lp', 38),
    },
    { id: 's32', name: 'Brushes Photoshop', contents: demoContents('br', 27) },
    {
      id: 's33',
      name: 'Mockup Templates PSD',
      contents: demoContents('mk', 13),
    },
    {
      id: 's34',
      name: 'Infographic Elements',
      contents: demoContents('inf', 48),
    },
    {
      id: 's35',
      name: 'Background Images HQ',
      contents: demoContents('bg', 75),
    },
    {
      id: 's36',
      name: 'Illustration Vectors',
      contents: demoContents('vec', 21),
    },
    {
      id: 's37',
      name: 'Logo Design Bundle',
      contents: demoContents('logo', 17),
    },
    {
      id: 's38',
      name: 'Storyboard Templates',
      contents: demoContents('sb', 4),
    },
    {
      id: 's39',
      name: 'Presentation Slides',
      contents: demoContents('ppt', 31),
    },
    {
      id: 's40',
      name: 'Spreadsheet Templates',
      contents: demoContents('xls', 26),
    },
  ] as DownloadSession[],
}

export const useDownloadSessionStore = combine(initialState, (set) => ({
  addSession: (session: DownloadSession) => {
    return set((state) => ({ sessions: [...state.sessions, session] }))
  },

  updateSession: (
    sessionId: string,
    updatedSession: Partial<DownloadSession>
  ) => {
    return set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === sessionId ? { ...session, ...updatedSession } : session
      ),
    }))
  },

  removeSession: (sessionId: string) => {
    return set((state) => ({
      sessions: state.sessions.filter((session) => session.id !== sessionId),
    }))
  },
}))
