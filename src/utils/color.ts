import { userInfoStore } from '@/stores'

export function initColorTheme() {
  const useStore = userInfoStore()
  const el = document.documentElement
  el.style.setProperty(`--bg-color`, useStore.isDark ? '#171719' : '#f7f7f7')
  el.style.setProperty(`--card-color`, useStore.isDark ? '#232325' : '#ffffff')
  el.style.setProperty(`--text-color`, useStore.isDark ? '#858487' : '#333333')
  el.style.setProperty(`--title-color`, useStore.isDark ? '#fefeff' : 'black')
  el.style.setProperty(`--active-nav-color`, useStore.isDark ? '#222124' : '#ededed')
  el.style.setProperty(`--el-fill-color-blank`, useStore.isDark ? '#232325' : '#ffffff')
  el.style.setProperty(`--el-bg-color`, useStore.isDark ? '#232325' : '#ffffff')
}
