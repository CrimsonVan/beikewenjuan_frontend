import { userInfoStore } from '@/stores'

export function initColorTheme() {
  const useStore = userInfoStore()
  const el = document.documentElement
  const html = document.documentElement
  el.style.setProperty(`--bg-color`, useStore.isDark ? '#141414' : '#f7f7f7')
  el.style.setProperty(`--card-color`, useStore.isDark ? '#303030' : '#ffffff')
  el.style.setProperty(`--text-color`, useStore.isDark ? '#CFD3DC' : '#333333')
  el.style.setProperty(`--title-color`, useStore.isDark ? '#fefeff' : 'black')
  el.style.setProperty(`--active-nav-color`, useStore.isDark ? '#222124' : '#ededed')
  if (useStore.isDark) {
    html.className = 'dark'
  } else {
    html.className = ''
  }
}
